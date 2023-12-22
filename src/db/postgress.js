const rutaActual = dirname(fileURLToPath(import.meta.url));
dotenv.config({path:`${rutaActual}/.env`});
let client

try {
  
  const localOptions = {
    host: process.env.PG_LOCAL_HOST,
    user: process.env.PG_LOCAL_USER,
    password: process.env.PG_LOCAL_PASS,
    port: process.env.PG_LOCAL_PORT,
    database: process.env.PG_LOCAL_DATABASE
    }



  client = new pg.Client(localOptions)

  await client.connect()


  } catch (error) {
    
      console.error('Error al intentar Conectarse a PostgressSQL',error)

}




export const insertIntoPostgreSQL = async( chara ) => {


  try {
    const query = `
      INSERT INTO students (
        charaName, name, lastName, school, role, combatClass,
        weaponType, age, birthday, height, hobbies, designer,
        illustrator, voice, releaseDate, url, files
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
    `;

    const values = [
      chara.charaName,
      chara.name == null ? null : chara.name,
      chara.lastName === null ? null : chara.lastName,
      chara.school === null ? null : chara.school,
      chara.role === null ? null : chara.role,
      chara.combatClass === null ? null : chara.combatClass,
      chara.weaponType === null ? null : chara.weaponType,
      chara.age === null ? null : chara.age,
      chara.birthday === null ? null : chara.birthday,
      chara.height === null ? null : chara.height,
      chara.hobbies === null ? null : chara.hobbies,
      chara.designer === null ? null : chara.designer,
      chara.illustrator === null ? null : chara.illustrator,
      chara.voice === null ? null : chara.voice,
      chara.releaseDate === null ? null : chara.releaseDate,
      chara.url === null ? null : chara.url,
      chara.files
    ];

    await client.query(query, values);
    console.log(`\n💚 ${chara.charaName} 💚\n`);
  } catch (error) {
    console.error('Error al insertar datos en PostgreSQL:', chara.charaName ,error);
  }
  
  
} 


export const getAllCharasPostgreSQL = async() => {

  const result = await client.query('SELECT * FROM students ORDER BY charaname');
  
  
  return result.rows

}


export const desconectarPostgreSQL = async() => await client.end()

import  pg  from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname  } from 'path';