export default async function downloadFiles(chara) {
  //url, charaName, schoolName, format parametro antiguos
  //format: .png(foto de perfil) o _full.png (imagen full) o .ogg(audio)
  const format = {
    imgProfile: '.png',
    imgFull: '_full.png',
    audio: '.ogg'
  }

  const rutaActual = path.dirname(fileURLToPath(import.meta.url));
  const dirMedia = path.join(rutaActual, '..', '..', 'media'); // carpeta /media en la ruta raiz '/' del proyecto
  const dirSchool = path.join(dirMedia, chara.school) // carpeta /${schoolName} dentro de /media, SE UTILIZA PARA CREAR LOS DIRECTORIOS SI NO EXISTEN

  const carpDest = path.join(dirMedia, chara.school, chara.charaName) // ruta completa del destino del archivo: /media/${schoolName}/${charaName} + ${format}
  // Si no existe, crea la carpeta
  try {
    if (!fs.existsSync(dirMedia)) fs.mkdirSync(dirMedia, { recursive: true }); // recursive: true crea carpetas anidadas si es necesario}
    if (!fs.existsSync(dirSchool)) fs.mkdirSync(dirSchool, { recursive: true });
  }

  catch (error) {
    console.error('Error al crear la carpeta /media:', error);
  }

  // DOWNLOAD PROFILE IMAGE
  try {

    const writer = fs.createWriteStream(carpDest + format.imgProfile)
    const downloadData = await getArchivesStream(chara.pageImageProfileUrl)

    await downloadData.data.pipe(writer)
    console.log(`\n💚 DESACRGADO IMG_PROFILE de "${chara.charaName}" 💚 en la ruta: ${carpDest + format.imgProfile}`)

  } catch (error) {
    console.error(`\nError al intentar DESCARGAR la imagen de Perfil de "${chara.charaName}", url: ${chara.pageImageProfileUrl}\n`, error);
  }

  // DOWNLOAD FULL IMAGE
  try {

    const writer = fs.createWriteStream(carpDest + format.imgFull)
    const downloadData = await getArchivesStream(chara.pageImageFullUrl)

    await downloadData.data.pipe(writer)
    console.log(`\n💚 DESACRGADO IMG_FULL de "${chara.charaName}" en la ruta: ${carpDest + format.imgFull} 💚`)

  } catch (error) {
    console.error(`\nError al intentar DESCARGAR la imagen full de "${chara.charaName}", url: ${chara.pageImageFullUrl}\n`, error);
  }

  // DOWNLOAD AUDIO
  try {

    const writer = fs.createWriteStream(carpDest + format.audio)
    const downloadData = await getArchivesStream(chara.audioUrl)

    await downloadData.data.pipe(writer)
    console.log(`\n💚 DESACRGADO AUDIO de "${chara.charaName}" en la ruta: ${carpDest + format.audio} 💚`)

  } catch (error) {
    console.error(`\nError al intentar DESCARGAR el AUDIO de "${chara.charaName}", url: ${chara.audioUrl}\n`, error);
  }

}

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { getArchivesStream } from './axiosRequests.js';