import Student from './studentEntity';
import Connect from './connection';
import { scanCharaInfo } from '../func/scanCharaInfo';
import type { ICharaFile } from './studentEntity';

//CREATE
async function insertOneStudent(chara: Partial<Student>): Promise<void> {
	try {
		const student = Student.create(chara);
		await student.save();

		console.log(`\n💚 ${chara.charaName} 💚\n`);
	} catch (error) {
		throw new Error(`\n Error al INSERTAR insertar a: "${chara.charaName}" \n`);
	}
}

export async function insertManyStudents(
	students: Partial<Student>[],
): Promise<void> {
	try {
		await Student.createQueryBuilder().insert().values(students).execute();
		console.log(`\n💚 todos los personajes INSERTADOS 💚\n`);
	} catch (error) {
		throw new Error(`\n Error al INSERTAR INSERTAR MUCHOS STUDENTS \n`);
	}
}

//READ
export async function getAllStudents(): Promise<Student[]> {
	try {
		return await Student.find();
	} catch (error) {
		console.error(error);
		throw new Error(
			'\n Error al intentar OBTENER todos los personajes de la tabla "students" \n',
		);
	}
}

export async function getAllStudentsCharaNames(): Promise<string[]> {
	try {
		const students = await Student.find({
			select: { charaName: true },
			order: { charaName: 'ASC' },
		});
		const charaNames: string[] = students.map((student) => student.charaName);
		return charaNames;
	} catch (error) {
		throw new Error(
			'\nError al Intentar OBTENER todos los "charaNames" de la tabla students\n',
		);
	}
}

export async function getAllStudentsWithoutFiles(): Promise<ICharaFile[]> {
	try {
		const students = await Student.find({
			select: {
				charaName: true,
				name: true,
				school: true,
				pageImageProfileUrl: true,
				pageImageFullUrl: true,
				audioUrl: true,
				files: true,
			},
			where: { files: false },
			order: { charaName: 'ASC' },
		});

		const studentsWithoutFiles: ICharaFile[] = students.map((student) => {
			return {
				charaName: student.charaName,
				name: student.name,
				school: student.school,
				pageImageProfileUrl: student.pageImageProfileUrl,
				pageImageFullUrl: student.pageImageFullUrl,
				audioUrl: student.audioUrl,
				files: student.files,
			};
		});

		return studentsWithoutFiles;
	} catch (error) {
		throw new Error(
			'\n ERROR al intentar OBTENER TODOS LOS PERSONAJES SIN ARCHIVOS \n',
		);
	}
}

//UPDATE
export async function studentFilesDownloaded(charaName: string) {
	try {
		await Student.update({ charaName }, { files: true });
		console.log(` ❤️  ${charaName} files downloaded ❤️\n`);
	} catch (error) {
		throw error;
	}
}

//DELETE
async function deleteOneStudent(
	charaName: string,
	password: string,
): Promise<void> {
	if (charaName && password === process.env.PASSWORD) {
		try {
			const response = await Student.delete({ charaName });
			if (response.affected) {
				console.log(` 🖤 ${charaName} 🖤 `);
			} else {
				console.log('Ningun Personaje Eliminado');
			}
		} catch (error) {
			throw new Error(
				`\n Error al intentar ELIMINAR ${charaName} de la tabla "students" \n`,
			);
		}
	}
}

async function deleteAllStudents(password: string): Promise<void> {
	if (password && password === process.env.PASSWORD) {
		try {
			const res = await Student.createQueryBuilder().delete().execute();

			console.log(
				`\n🖤 SE BORRRARON TODOS (${res.affected}) LOS REGISTROS DE LA TABLA "students" DE PostgreSQL 🖤\n`,
			);
		} catch (error) {
			throw new Error(
				'\n Error al intentar ELIMINAR TODOS los registros de la tabla "students" \n',
			);
		}
	}
}
