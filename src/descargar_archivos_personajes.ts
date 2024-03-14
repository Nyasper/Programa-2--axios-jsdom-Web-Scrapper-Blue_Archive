import downloadFiles from './func/downloadFiles';
import searchFilesUpdates from './func/searchFilesUpdates';
// import { charaFilesDownloaded } from './db/postgreSQL';
import { ICharaFiles } from './db/studentEntity';

export default async function descargar_archivos_personajes() {
	try {
		const charaFilesToDownload: ICharaFiles[] = await searchFilesUpdates();

		// const answer = await updateMenu();
		let answer = 1;

		switch (answer) {
			case 1:
				for (const chara of charaFilesToDownload) {
					await downloadFiles(chara);
					// await charaFilesDownloaded(chara);
				}
				console.log(
					`\n 💚 ${charaFilesToDownload.length * 3} Archivos Descargados en Total 💚 \n`,
				);
				break;

			case 2:
				process.exit(0);
		}
		process.exit(0);
	} catch (error) {
		console.error(
			'\nERROR al intentar DESCARGAR ARCHIVOS de los personajes en main.js\n',
			error,
		);
	}
}

(async () => {
	await descargar_archivos_personajes();
})();
