import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { getArchivesStream } from './axiosRequests.js';

const format = {
	imgProfile: '.png',
	imgFull: '_full.png',
	audio: '.ogg',
};

const rutaActual = path.dirname(fileURLToPath(import.meta.url));
const dirMedia = path.join(rutaActual, '..', '..', 'media'); // carpeta /media en la ruta raiz '/' del proyecto

export default async function downloadFiles(chara) {

	const dirSchool = path.join(dirMedia, chara.school); // carpeta /${schoolName} dentro de /media, SE UTILIZA PARA CREAR LOS DIRECTORIOS SI NO EXISTEN

	await createMediaFolder(dirMedia, dirSchool);
	await downloadImageProfile(chara);
	await downloadImageFull(chara);
	await downloadAudio(chara);
}

async function createMediaFolder(dirMedia, dirSchool) {
	try {
		if (!fs.existsSync(dirMedia)) {
			// Si no existe la carpeta /media, crea la carpeta
			fs.mkdirSync(dirMedia, { recursive: true }); //recursive: true crea carpetas anidadas si es necesario}
		}
		if (!fs.existsSync(dirSchool)) {
			// Si no existe la carpeta /media/schoolName, crea la carpeta
			fs.mkdirSync(dirSchool, { recursive: true });
		}
	} catch (error) {
		console.error('\n Error al crear la carpeta /media: \n'.bgRed, error);
	}
}

async function downloadImageProfile(chara) {
	const carpDest = path.join(dirMedia, chara.school, chara.charaName); // ruta completa del destino del archivo: /media/${schoolName}/${charaName} + ${format}
	try {
		const writer = fs.createWriteStream(carpDest + format.imgProfile);
		const downloadData = await getArchivesStream(chara.pageImageProfileUrl);

		await downloadData.data.pipe(writer);
		console.log(
			`\nDESACRGADO IMG_PROFILE de "${chara.charaName}" 💚 ${carpDest + format.imgProfile}`
				.green,
		);
	} catch (error) {
		console.error(
			`\n Error al intentar DESCARGAR la imagen de Perfil de "${chara.charaName}", url: ${chara.pageImageProfileUrl} \n`
				.bgRed,
			error,
		);
	}
}

async function downloadImageFull(chara) {
	const carpDest = path.join(dirMedia, chara.school, chara.charaName);
	try {
		const writer = fs.createWriteStream(carpDest + format.imgFull);
		const downloadData = await getArchivesStream(chara.pageImageFullUrl);

		await downloadData.data.pipe(writer);
		console.log(
			`\nDESACRGADO IMG_FULL de "${chara.charaName}" 💚 ${carpDest + format.imgFull}`
				.green,
		);
	} catch (error) {
		console.error(
			`\n Error al intentar DESCARGAR la imagen full de "${chara.charaName}", url: ${chara.pageImageFullUrl} \n`
				.bgRed,
			error,
		);
	}
}

async function downloadAudio(chara) {
	const carpDest = path.join(dirMedia, chara.school, chara.charaName);
	try {
		const writer = fs.createWriteStream(carpDest + format.audio);
		const downloadData = await getArchivesStream(chara.audioUrl);

		await downloadData.data.pipe(writer);
		console.log(
			`\nDESACRGADO AUDIO de "${chara.charaName}" 💚 ${carpDest + format.audio}`
				.green,
		);
	} catch (error) {
		console.error(
			`\n Error al intentar DESCARGAR el AUDIO de "${chara.charaName}", url: ${chara.audioUrl} \n`
				.bgRed,
			error,
		);
	}
}
