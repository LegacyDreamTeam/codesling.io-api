import express from 'express';

import {
  challengeController,
} from './challengeControllers';

import { 
  findRoom,
} from '../challenges/challengeTracker'; 

const router = express.Router();

router.route('/')
  .get(challengeController);

router.route('/addChallenge')
  .post(challengeController);

router.route('/leavingPage')
  .post(challengeController);

router.route('/challengeTracker')
  .get(findRoom); 

export default router;
