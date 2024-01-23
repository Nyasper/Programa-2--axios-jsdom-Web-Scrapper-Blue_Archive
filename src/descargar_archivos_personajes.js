import downloadFiles from './func/downloadFiles.js';
import searchFilesUpdates from './func/searchFilesUpdates.js';
import { charaFilesDownloaded } from './db/postgreSQL.js';
import { updateMenu } from './func/inquirer.js';

export default async function descargar_archivos_personajes() {
	try {
		const charaFilesToDownload = await searchFilesUpdates();

		const answer = await updateMenu();

		switch (answer) {
			case 1:
				for (const chara of charaFilesToDownload) {
					await downloadFiles(chara);
					await charaFilesDownloaded(chara);
				}
				console.log(
					`\n 💚 ${charaFilesToDownload.length * 3} Archivos Descargados en Total 💚 \n`
						.green,
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
