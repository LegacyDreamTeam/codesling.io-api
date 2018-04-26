export const addTestCaseHelper = `
  INSERT INTO 
    testCases (content, challenge_id, output)
  VALUES 
    ($1, $2, $3)
  RETURNING
    id, content, challenge_id, output
`;

// throw this shit into the challenge fetfch
export const fetchAllTestCasesHelper = ({ challenge_id }) => {
  return `
    SELECT
      id, content, challenge_id
    FROM
      testCases
    WHERE
      challenge_id=${challenge_id}
  `;
};

///////////////// GET OUTPUT FROM TESTCASES TABLE 
export const compareOutput = ({ challenge_id }) => {
  return `
  SELECT 
    output
  FROM 
    testCases
  WHERE 
    challenge_id=${challenge_id} 
  `;
}


