import downloadFiles from "./func/downloadFiles.js";
import searchFilesUpdates from "./func/searchFilesUpdates.js";
import { charaFilesDownloaded } from "./db/postgreSQL.js";


export default async function descargar_archivos_personajes() {

  try {

    const charaFilesToDownload = await searchFilesUpdates()

    if (charaFilesToDownload.length > 0) {

      for (const chara of charaFilesToDownload) {

        await downloadFiles(chara)
        await charaFilesDownloaded(chara)

      }

      console.log(`\n💜 ${charaFilesToDownload.length} Archivos Descargados en Total 💜\n`)

    } else console.log('\nNO Hay Archivos disponibles para descargar\n')

  } catch (error) {
    console.error('\nERROR al intentar DESCARGAR ARCHIVOS de los personajes en main.js\n', error)
  }

}