import { globalQueryHelper } from '../../lib/components/';
import {
  addUserChallengeHelper,
  fetchAllUserChallengesHelper
} from './usersChallengesSQLHelpers';

import {
  addChallenge
} from '../challenges/challengeTracker';

export const userChallengeQuery = async (payload, url) => {
  if (url === '/') {
    addChallenge(payload.challenge_id);
    return await globalQueryHelper(payload, addUserChallengeHelper, 'addUserChallengeQuery', ['user_id', 'challenge_id', 'type']);
  } else {
    return await globalQueryHelper(payload, fetchAllUserChallengesHelper, 'fetchAllUserChallengesQuery', ['user_id']);
  }
};
