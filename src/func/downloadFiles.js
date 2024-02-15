import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { getArchivesStream } from './axiosRequests.js';

const rutaActual = path.dirname(fileURLToPath(import.meta.url));
const dirMedia = path.join(rutaActual, '..', '..', 'media'); // carpeta /media en la ruta raiz '/' del proyecto

export default async function downloadFiles(chara) {
	const dirSchool = path.join(dirMedia, chara.school); // carpeta /${schoolName} dentro de /media, SE UTILIZA PARA CREAR LOS DIRECTORIOS SI NO EXISTEN
	const carpDest = path.join(dirMedia, chara.school, chara.charaName); // ruta completa del destino del archivo: /media/${schoolName}/${charaName} + ${format}

	await createMediaFolder(dirMedia, dirSchool);
	await downloadImageProfile(chara, carpDest);
	await downloadImageFull(chara, carpDest);
	await downloadAudio(chara, carpDest);
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

const downloadImageProfile = async (chara, carpDest) => await download(chara, carpDest, '.png')


const downloadImageFull = async (chara, carpDest) => await download(chara, carpDest, '_full.png')


const downloadAudio = async (chara, carpDest) => await download(chara, carpDest, '.ogg')

async function download(chara, carpDest, format) {
	let fileUrl;

	if (format === '.png') {
		fileUrl = chara.pageImageProfileUrl
	}
	else if (format === '_full.png') {
		fileUrl = chara.pageImageFullUrl
	}
	else if (format === '.ogg') {
		fileUrl = chara.audioUrl
	}
	try {
		const writer = fs.createWriteStream(carpDest + format);

		const downloadData = await getArchivesStream(fileUrl);

		await new Promise((resolve, reject) => {
			downloadData.pipe(writer);
			writer.on('finish', () => {
				console.log(`\n💚 "${chara.charaName}${format}" en  ${carpDest + format}\npageURL:${fileUrl} 💚`.green);
				resolve();
			});
			writer.on('error', reject);
		});

	} catch (error) {
		console.error(
			`\n Error al intentar descargar.\n personaje: "${chara.charaName}"\n, url del archivo: ${fileUrl}  \n`
				.bgRed,
			error,
		);
	}
}