export default async function searchFilesUpdates() {
  try {

    console.log('\nBuscando Actualizaciones de Archivos...\n')

    const allCharasWithoutFiles = await getAllCharasWithoutFiles()

    if (allCharasWithoutFiles.length > 0) console.log(`\n💙 ${allCharasWithoutFiles.length} Archivos de Personajes para guardar 💙\n`)

    else console.log('\n💜 NO existen archivos disponibles para desacrgar 💜\n\n')

    return allCharasWithoutFiles
  } catch (error) {
    console.error('\nSe ha producido un Error en la funcion searchFilesUpdates\n', error)
  }
}


import { getAllCharasWithoutFiles } from "../db/postgreSQL.js"