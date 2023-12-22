userPrompt();



async function Mostrar_Personajes_Pagina() {
  const charaList = await scanCharaList()
  console.log('\nListando todos los personajes de la Pagina:\n')
  charaList.forEach((chara, i) => console.log(`💗 ${i + 1} ${chara} 💗`))

}

async function Buscar_Actualizaciones(opcion) {

  try {

    const Actualizar = await searchUpdates()

    if (opcion === 'FULL') {

      //Insert in SQLITE
      for (const charaName of Actualizar) await insertCharaSqlite(await scanCharaInfo(charaName))

      //From Sqlite to PostgreSQL
      await actualizarPostgresSqldesdeSqlite()

      //From Sqlite to MongoDB
      await actualizarMongoDBdesdeSqlite()

    }

  }


  catch (error) {
    console.error('Se ha producido un error en la funcion Buscar_Actualizaciones en main.js')
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
        case '4': runPuppeteer("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"); return;
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
import { insertCharaSqlite } from "./db/sqlite.js";
import { actualizarPostgresSqldesdeSqlite, actualizarMongoDBdesdeSqlite } from "./db/sincronizarDB.js";
import runPuppeteer from "./func/puppeteer.js"
import readline from 'readline';