import axios from 'axios';

import { success } from './lib/log';
import {
  serverInitialState,
  clientOneServerChanged,
  clientTwoServerChanged,
  serverLeave,
  serverRun,
  serverMessage,
  sendPlayers,
} from './serverEvents';

/**
 *
 *  Client emissions (server listeners)
 *
 *  more on socket emissions:
 *  @url {https://socket.io/docs/emit-cheatsheet/}
 *
 *  @param room is an ES6 Map, containing { id, state }
 *  @url {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map}
 *
 */
const clientReady = ({ io, client, room }, payload) => {
  success('client ready heard');
  serverInitialState({ io, client, room }, payload);
};

const clientGetUser = ({ io, client, room }, payload) => {
  const { userId } = payload;
  success('client user heard. user ID', userId);
  sendPlayers({ io, room, userId });
}

const clientOneUpdate = ({ io, client, room }, payload) => {
  const { text, player } = payload;
  success('client update heard. payload.text = ', payload);
  room.set('playerOne.text', text);
  clientOneServerChanged({
    io, client, room, player,
  });
};

const clientTwoUpdate = ({ io, client, room }, payload) => {
  const { text, player } = payload;
  success('client update heard. payload.text = ', payload);
  room.set('playerTwo.text', text);
  clientTwoServerChanged({
    io, client, room, player,
  });
};

const clientDisconnect = ({ io, room }) => {
  success('client disconnected');
  serverLeave({ io, room });
};

const clientRun = async ({ io, room }, payload) => {
  success('running code from client. room.get("text") = ', room.get('text'));
  const { text, player, challenge } = payload;
  const url = process.env.CODERUNNER_SERVICE_URL;

  try {
    const { data } = await axios.post(`${url}/submit-code`, { code: text });
    const challOutput = JSON.parse(challenge);

    const stdout = data;
    const gettingRidOfSPacesFromTestOutput = challOutput.output.replace(/\s/g, '');
    const gettingRidOfSingleQuotes = gettingRidOfSPacesFromTestOutput.replace(/\'/g, "");
    const gettingRidOfSPacesFromUsers = stdout.result.replace(/\s/g, '');
    const gettingRidOfSingleQuotesUserResult = gettingRidOfSPacesFromUsers.replace(/\'/g, "");

    const comparableTestOutput = JSON.stringify(gettingRidOfSingleQuotes);
    const comparableUsersOutput = JSON.stringify(gettingRidOfSingleQuotesUserResult);
    let winner = false;

    if (comparableTestOutput === comparableUsersOutput) {
      winner = true;
    }

    serverRun({ io, room }, { stdout, player, winner });
  } catch (e) {
    success('error posting to coderunner service from socket server. e = ', e);
  }
};

const clientMessage = async ({ io, room }, payload) => {
  success('client message heard');
  const url = process.env.REST_SERVER_URL;
  try {
    // const { data } = await axios.post(`${url}/messages/`, payload);
    serverMessage({ io, room }, payload);
  } catch (e) {
    success('error saving message to the database. e = ', e);
  }
};

const clientEmitters = {
  'client.ready': clientReady,
  'clientOne.update': clientOneUpdate,
  'clientTwo.update': clientTwoUpdate,
  'client.disconnect': clientDisconnect,
  'client.run': clientRun,
  'client.message': clientMessage,
  'client.getUser': clientGetUser,
};

export default clientEmitters;
