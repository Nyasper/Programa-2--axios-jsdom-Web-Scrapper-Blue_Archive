import { getAllCharasWithoutFiles } from '../db/postgreSQL';

export default async function searchFilesUpdates() {
	try {
		console.log('\n Buscando Actualizaciones de Archivos... \n');

		const allCharasWithoutFiles = await getAllCharasWithoutFiles();

		if (allCharasWithoutFiles.length > 0) {
			allCharasWithoutFiles.forEach((chara) => {
				console.log(`\n💙 ${chara.charaName} 💙`);
			});
			console.log(
				`\n💙 ${allCharasWithoutFiles.length} personajes sin archivos 💙\n💙 En total ${allCharasWithoutFiles.length * 3} archivos para descargar 💙\n`,
			);
		} else {
			console.log(
				'\n 💜 NO existen archivos disponibles para desacrgar 💜 \n\n',
			);
			process.exit(0);
		}

		return allCharasWithoutFiles;
	} catch (error) {
		throw new Error(
			'\nSe ha producido un Error en la funcion searchFilesUpdates\n',
		);
	}
}
