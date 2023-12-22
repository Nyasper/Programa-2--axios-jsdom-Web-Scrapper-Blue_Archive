const separador = '\n---------------------------------------------------------------------------------------------------------------------------\n'
export async function actualizarPostgresSqldesdeSqlite() {


  const Actualizaciones = []

  try {

    const allCharasSqlite = await getAllCharasSqlite() //get Charas of Sqlite

    const allCharasPostgreSql = await getAllCharasPostgreSQL() //get Charas of MongoDB



    for (const charasSqlite of allCharasSqlite) {

      if (!(allCharasPostgreSql.some(postgreDB => postgreDB.charaname == charasSqlite.charaName))) Actualizaciones.push(charasSqlite)

    }


    if (Actualizaciones.length) {

      console.log(separador)

      console.log('\nActualizando PostgreSQL desde SQLite...\n\n')

      Actualizaciones.forEach(act => console.log(`💙 ${act.charaName} 💙 ${act.url}\n`))

      console.log(`\n${Actualizaciones.length} Personajes de Sqlite que no existen en PostgreSQL:\n`)


      console.log('\nInsertando nuevos Personajes en PostgreSQL...\n')


      for (const charaPostgre of Actualizaciones) await insertIntoPostgreSQL(charaPostgre)

      console.log('\n💜 PostgreSQL Actualizado 💜\n')

    } else console.log('\n💜 PostgreSQL Actualizado.💜\n')

  } catch (error) {
    console.error('\nError al intentar actualizar PostgreSQL desde Sqlite:\n', error)
  }
  await desconectarPostgreSQL()

  return Actualizaciones

}




export async function actualizarMongoDBdesdeSqlite() {

  const Actualizaciones = []

  try {

    const allCharasSqlite = await getAllCharasSqlite() //get Charas of Sqlite

    await conectarMongoDB()
    const allCharasMongoDB = await getAllCharasMongoDB() //get Charas of MongoDB


    for (const charasSqlite of allCharasSqlite) {

      if (!(allCharasMongoDB.some(mongoDB => mongoDB.charaName == charasSqlite.charaName))) Actualizaciones.push(charasSqlite)

    }

    if (Actualizaciones.length) {

      console.log(separador)

      console.log('\n\nActualizando MongoDB desde SQLite...\n\n')


      Actualizaciones.forEach(act => console.log(`💙 ${act.charaName} 💙 ${act.url}\n`))

      console.log(`\n\n${Actualizaciones.length} Personajes de Sqlite que no existen en MongoDB:\n`)



      console.log('\nInsertando nuevos Personajes en MongoDB...\n')

      await guardarMuchosMongoDB(Actualizaciones)

      console.log('\n💜 MongoDB Actualizado 💜\n')


    } else console.log('\n💜 MongoDB Actualizado. 💜\n')


  } catch (error) {
    console.error('\nError al intentar actualizar MongoDB desde Sqlite:\n', error)
  } finally {
    await desconectarMongoDB()
  }
  return Actualizaciones
}


import { conectarMongoDB, desconectarMongoDB, getAllCharasMongoDB, guardarMuchosMongoDB } from "./mongoDB.js";
import { getAllCharasSqlite, insertCharaSqlite } from "./sqlite.js"
import { desconectarPostgreSQL, getAllCharasPostgreSQL, insertIntoPostgreSQL } from "./postgress.js"