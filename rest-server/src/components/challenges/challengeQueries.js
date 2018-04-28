import { globalQueryHelper } from '../../lib/components/';
import {
  addChallengeHelper,
  fetchChallengeHelper,
  fillChallengeTracker 
} from './challengeSQLHelpers';
import { leavePage, idStore } from '../challenges/challengeTracker'


export const challengeQuery = async (payload, url) => {
  if (url === '/addChallenge') {
    return await globalQueryHelper(payload, addChallengeHelper, 'addChallengeHelper', ['title', 'content', 'difficulty']);
  } else if (url === '/leavingPage') {
    leavePage(payload.id, payload.challengeId);
    return { rows: '' };
  } else {
    var waitlist = idStore;
    console.log(waitlist)
    var challenges = await globalQueryHelper(payload, fetchChallengeHelper, 'fetchChallengeHelper');
    var retObj = {
      waitlist: waitlist,
      allChallenges: challenges,
    }
    return { rows: retObj };
    // instead of returning the above, set it equal to an object key and then attach 
    // our waiting room to the return object too
  }
};




// try {
//   const query = {
//     text: queryString,
//     values: queryPayloadOrganizer(payload, columns),
//     // rowMode: 'array'
//   };
//   await db.query('BEGIN');
//   const data = await db.query(query);
//   const moreData = await db.query(userChallengeQuery)
//   await db.query('COMMIT');

// } catch (err) {
//   error(`${name} - error= ', ${err}`);
//   throw new Error(err);
// }