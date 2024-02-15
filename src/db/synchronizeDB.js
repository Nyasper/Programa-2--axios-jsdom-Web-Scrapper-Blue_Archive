const separador =
	'\n---------------------------------------------------------------------------------------------------------------------------\n';

export async function actualizarMongoDB(option) {

	try {
		const allCharasPostgreSQL = await getAllStudents(); //get Charas of PostgreSQL

		if (option === 'FORCE') {
			await deleteAllCharasMongoDB();
			await saveManyCharasMongoDB(allCharasPostgreSQL);
		}
		else {
			const allCharasMongoDB = await getAllCharasMongoDB(); //get Charas of MongoDB

			const missingCharas = allCharasPostgreSQL.filter((charaPostgreSql) => !allCharasMongoDB.some(charaMongoDB => charaMongoDB.charaName === charaPostgreSql.charaName))

			if (missingCharas.length > 0) {
				console.log(separador);

				console.log('\n\nActualizando MongoDB desde PostgreSQL...\n\n');

				missingCharas.forEach((p) =>
					console.log(`💙 ${p.charaName} 💙 ${p.pageUrl}\n`.blue),
				);

				console.log(
					`\n\n ${missingCharas.length} Personajes de PostgreSQL que no existen en MongoDB: \n`.bgMagenta,
				);

				console.log('\nInsertando nuevos Personajes en MongoDB...\n'.blue);

				await saveManyCharasMongoDB(missingCharas);

				console.log('\n💜 MongoDB Actualizado exitosamente 💜\n'.magenta);
			} else console.log('\n💜 MongoDB ya esta actualizado. 💜\n'.magenta);
		}
	} catch (error) {
		console.error(
			'\nError al intentar actualizar MongoDB desde PostgreSQL:\n',
			error,
		);
	} finally {
		disconnect();
	}
}

import { getAllStudents } from './postgreSQL.js';
import {
	deleteAllCharasMongoDB,
	saveManyCharasMongoDB,
	getAllCharasMongoDB,
} from './mongoDB.js';
import { disconnect } from 'mongoose';
