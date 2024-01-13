import searchUpdates from "./func/searchUpdates.js";
import scanCharaInfo from "./func/scanCharaInfo.js"
import { insertOneChara } from "./db/postgreSQL.js";


export default async function buscar_actualizaciones(option) {

  try {

    const Actualizar = await searchUpdates()

    if (option === 'FULL') {

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