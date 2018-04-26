import db from '../../config/database';
import bodyParser from 'body-parser'; 

const idStore = {}; 

export const challengeTracker = async () => {
  try {
    const data = await db.query(`SELECT id FROM challenges`); 
    data.rows.forEach(element => {
      idStore[element.id] = '';
    });
    console.log(idStore)  
  } catch (err) {
    console.log('error ', err);
  }
}

export const findRoom = async (req, res) => {
  try {
    console.log('From findRoom idStore', idStore)
    
      if (idStore[req.query.challengeId] === '') {
        idStore[req.query.challengeId] = req.query.slingId; 
        console.log('From findRoom IF BLANK', idStore)  
        res.status(200).send(req.query.slingId); 
      } else {
        let temp = idStore[req.query.challengeId]; 
        idStore[req.query.challengeId] = ''; 
        console.log('From findRoom IF SOMEONE', idStore)
        res.status(200).send(temp); 

      }
      console.log('HELLO FROM OUTSIDE')
  } catch (err) {
    console.log('Error finding room', err); 
  }
}


  
