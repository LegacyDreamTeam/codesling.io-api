import db from '../../config/database';
import bodyParser from 'body-parser'; 

export const idStore = {};
// this will need to be improved to remove the room id if a client leaves before a game starts
// right now it will leave their id in there and when someone else joins they would join an empty
// room with no way for anyone to join them

export const challengeTracker = async () => {
  try {
    const data = await db.query(`SELECT id FROM challenges`); 
    data.rows.forEach(element => {
      idStore[element.id] = '';
    });
  } catch (err) {
    console.log('error ', err);
  }
}

export const leavePage = (roomId, chId) => {
  if (roomId && chId) {
    if(idStore[chId] === roomId) {
      idStore[chId] = '';
    }
  }
}

export const addChallenge = (id) => {
  idStore[id] = '';
}

export const findRoom = async (req, res) => {
  try {
      if (idStore[req.query.challengeId] === '') {
        idStore[req.query.challengeId] = req.query.slingId; 
        res.status(200).send(req.query.slingId); 
      } else {
        let temp = idStore[req.query.challengeId]; 
        idStore[req.query.challengeId] = ''; 
        res.status(200).send(temp); 
      }
  } catch (err) {
    console.log('Error finding room', err); 
  }
}


  
