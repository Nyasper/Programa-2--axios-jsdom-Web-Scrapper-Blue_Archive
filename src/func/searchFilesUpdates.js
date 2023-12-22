export default async function searchFilesUpdates() {
  try {

    console.log('\nBuscando Actualizaciones de Archivos...\n')

    const filesUpdates = await getFilesUpdatesSqlite()

    if (filesUpdates.length) console.log(`\n💙 ${filesUpdates.length} Archivos de Personajes para guardar 💙\n`)

    else console.log('\n💜 Todos los archivos ya descargados 💜\n\n')

    return filesUpdates

  } catch (error) {
    console.error('Se ha producido un Error en la funcion searchFilesUpdates')
  }
}

import { getFilesUpdatesSqlite } from "../db/sqlite.js"