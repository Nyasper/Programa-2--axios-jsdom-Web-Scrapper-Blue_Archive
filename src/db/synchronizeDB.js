const separador = '\n---------------------------------------------------------------------------------------------------------------------------\n'



export async function actualizarMongoDB(option) {

  const Actualizaciones = [];

  try {

    const allCharasPostgreSQL = await getAllStudents() //get Charas of Sqlite

    if (option === 'FORCE') {

      await deleteAllCharasMongoDB()

      await saveManyCharasMongoDB(allCharasPostgreSQL)



    }

    else {

      const allCharasMongoDB = await getAllCharasMongoDB()//get Charas of MongoDB

      for (const charasPostgreSQL of allCharasPostgreSQL) {

        if (!(allCharasMongoDB.some(mongoDB => mongoDB.charaName === charasPostgreSQL.charaName))) {
          Actualizaciones.push(charasPostgreSQL)
        }

      }

      if (Actualizaciones.length > 0) {

        console.log(separador)

        console.log('\n\nActualizando MongoDB desde PostgreSQL...\n\n')


        Actualizaciones.forEach(act => console.log(`💙 ${act.charaName} 💙 ${act.pageUrl}\n`))

        console.log(`\n\n${Actualizaciones.length} Personajes de PostgreSQL que no existen en MongoDB:\n`)



        console.log('\nInsertando nuevos Personajes en MongoDB...\n')

        await saveManyCharasMongoDB(Actualizaciones)

        console.log('\n💜 MongoDB Actualizado exitosamente 💜\n')


      } else console.log('\n💜 MongoDB ya esta actualizado. 💜\n')
    }

  } catch (error) {
    console.error('\nError al intentar actualizar MongoDB desde Sqlite:\n', error)
  } finally {
    disconnect()
  }

}

import { getAllStudents } from "./postgreSQL.js"
import { deleteAllCharasMongoDB, saveManyCharasMongoDB, getAllCharasMongoDB } from "./mongoDB.js";
import { disconnect } from "mongoose";