userPrompt();



async function Mostrar_Personajes_Pagina() {
  const charaList = await scanCharaList()
  console.log('\nListando todos los personajes de la Pagina:\n')
  charaList.forEach((chara, i) => console.log(`💗 ${i + 1} ${chara.charaName} 💗`))

}

async function Buscar_Actualizaciones(opcion) {

  try {

    const Actualizar = await searchUpdates()

    if (opcion === 'FULL') {

      //Insert in PostgreSQL
      for (const charaName of Actualizar) {

        await insertOneChara(await scanCharaInfo(charaName))

      }

    }


  }


  catch (error) {
    console.error('\nSe ha producido un error en la funcion Buscar_Actualizaciones en main.js\n', error)
  }

}


async function Descargar_Archivos_Personajes() {

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


function userPrompt() {
  const separador = '\n-----------------------------------------------------------------------------------------------------------------------------------\n'
  console.log(separador)
  console.log('Opciones:\n\n')
  console.log('1: Listar todos los Personajes de la Página\n')
  console.log('2: Buscar si hay Actualizaciones Disponibles\n')
  console.log('3: Buscar si hay Actualizaciones Disponibles y Actualizar la Base de Datos\n')
  console.log('4: Descargar los Archivos faltantes')
  console.log(separador)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function askQuestion() {
    return new Promise((resolve) => {
      rl.question('Ingresar una Opción: ', (respuesta) => {
        resolve(respuesta);
      });
    });
  }

  async function handleUserInput() {
    let respuesta;
    while (true) {
      respuesta = await askQuestion();
      switch (respuesta) {
        case '1': Mostrar_Personajes_Pagina(); return;
        case '2': Buscar_Actualizaciones(); return;
        case '3': Buscar_Actualizaciones('FULL'); return;
        case '4': Descargar_Archivos_Personajes(); return;
        default:
          console.log('Opción no válida');
          break;
      }
    }
  }

  handleUserInput()
    .then(() => rl.close())
    .catch((error) => {
      console.error('Error:', error);
      rl.close();
    });
}


import scanCharaList from "./func/scanCharaList.js";
import searchUpdates from "./func/searchUpdates.js";
import scanCharaInfo from "./func/scanCharaInfo.js"
import downloadFiles from "./func/downloadFiles.js";
import searchFilesUpdates from "./func/searchFilesUpdates.js";
import { insertOneChara, charaFilesDownloaded } from "./db/postgreSQL.js";
import readline from 'readline';