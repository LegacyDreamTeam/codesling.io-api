import { globalController } from '../../lib/components/';
import { challengeQuery } from './challengeQueries';

export const challengeController = globalController(challengeQuery, 'challengeQuery');

