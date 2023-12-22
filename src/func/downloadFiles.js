export default async function downloadFiles( url , charaName , schoolName , format){

  //format: .png(foto de perfil) o _full.png (imagen full) o .ogg(audio) o .json(archivo json)


  const rutaActual = path.dirname(fileURLToPath(import.meta.url));
  const rutaMedia = path.join(rutaActual, '..', '..', 'media'); // rutaMedia local donde se guardará la imagen descargada
  const rutaSchool = path.join(rutaMedia,schoolName)

  const carpDest = path.join(rutaMedia,schoolName,charaName)+format

  // Si no existe, crea la carpeta
  try {
  if (!fs.existsSync(rutaMedia) ) fs.mkdirSync(rutaMedia, { recursive: true }); // recursive: true crea carpetas anidadas si es necesario}
  if (!fs.existsSync(rutaSchool) ) fs.mkdirSync(rutaSchool, { recursive: true });
  }
  
  catch (error) {
  console.error('Error al crear la carpeta /media:', error);
}
  
  try {
    // Creamos un flujo de escritura para guardar la imagen descargada

    
    const writer = fs.createWriteStream(carpDest) 
    const downloadData = await getArchivesStream(url)

    // Pipe (conectar) el flujo de lectura de Axios con el flujo de escritura
    await downloadData.data.pipe(writer)

    
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve); // Resuelve la promesa cuando la escritura ha finalizado
      writer.on('error', reject); // Rechaza la promesa si hay un error al escribir
    });

  } catch (error) {
   console.error('Error al descargar y guardar la imagen:', error);
  }

}

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { getArchivesStream } from './axiosRequests.js';

