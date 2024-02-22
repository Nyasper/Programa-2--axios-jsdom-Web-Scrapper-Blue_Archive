import { getAllCharas } from './postgreSQL';
import { searchDifferences } from '../func/utils';
import {
	deleteAllCharasMongoDB,
	saveManyCharasMongoDB,
	getAllCharasMongoDB,
} from './mongoDB';
import { disconnect } from 'mongoose';
const separador =
	'\n---------------------------------------------------------------------------------------------------------------------------\n';

export async function actualizarMongoDB(option?: 'FORCE'): Promise<void> {
	try {
		const allCharasPostgreSQL = await getAllCharas(); //get Charas of PostgreSQL

		if (option === 'FORCE') {
			await deleteAllCharasMongoDB();
			await saveManyCharasMongoDB(allCharasPostgreSQL);
		} else {
			const allCharasMongoDB = await getAllCharasMongoDB(); //get Charas of MongoDB

			const missingCharas = searchDifferences(
				allCharasPostgreSQL,
				allCharasMongoDB,
			);

			if (missingCharas.length > 0) {
				console.log(separador);

				console.log('\n\nActualizando MongoDB desde PostgreSQL...\n\n');

				missingCharas.forEach((p) =>
					console.log(`💙 ${p.charaName} 💙 ${p.pageUrl}\n`),
				);

				console.log(
					`\n\n ${missingCharas.length} Personajes de PostgreSQL que no existen en MongoDB: \n`,
				);

				console.log('\nInsertando nuevos Personajes en MongoDB...\n');

				await saveManyCharasMongoDB(missingCharas);

				console.log('\n💜 MongoDB Actualizado exitosamente 💜\n');
			} else console.log('\n💜 MongoDB ya esta actualizado. 💜\n');
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
