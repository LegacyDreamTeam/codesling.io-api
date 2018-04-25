export const addUserChallengeHelper = `
  INSERT INTO
    usersChallenges (user_id, challenge_id, type)
  VALUES
    ($1, $2, $3)
  RETURNING
    id, user_id, challenge_id, type
`;

export const fetchAllUserChallengesHelper = `
  SELECT
    uc.id, uc.challenge_id, uc.user_id, uc.type, ch.title, ch.content, ch.difficulty, ch.rating
  FROM
    usersChallenges AS uc
  INNER JOIN
    challenges AS ch
  ON
    (uc.challenge_id=ch.id)
  WHERE
    uc.user_id=$1
`;
