const rutaActual = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: `${rutaActual}/.env` });
import colors from 'colors';

//Student Schema
const studentSchema = new Schema(
	{
		charaName: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
		},
		school: {
			type: String,
			required: true,
		},
		role: {
			type: String,
		},
		combatClass: {
			type: String,
		},
		weaponType: {
			type: String,
		},
		age: {
			type: Number,
			default: null,
		},
		birthday: {
			type: String,
		},
		height: {
			type: Number,
			default: null,
		},
		hobbies: {
			type: String,
		},
		designer: {
			type: String,
		},
		illustrator: {
			type: String,
		},
		voice: {
			type: String,
		},
		releaseDate: {
			type: String,
		},
		skinSet: {
			type: String,
		},
		pageUrl: {
			type: String,
		},
		pageImageProfileUrl: {
			type: String,
		},
		pageImageFullUrl: {
			type: String,
		},
		audioUrl: {
			type: String,
		},
		files: {
			type: Boolean,
			default: false,
		},
	},
	{
		versionKey: false,
	},
);

const Student = model('students', studentSchema);

//Conectar
try {
	await connect(process.env.MONGODB_URI);
} catch (error) {
	console.log('\n Error al intentar conectar a MongoDB \n'.bgRed, error);
}

//CREATE
export const saveOneCharaMongoDB = async (chara) => {
	try {
		await new Student(chara).save();
		console.log(`\n💚 ${chara.charaName} 💚\n`.green);
	} catch (error) {
		console.error(
			`\nError al intentar INSERTAR "${chara.charaName} en MongoDB"\n`,
			error,
		);
	}
};

export const saveManyCharasMongoDB = async (charas) => {
	try {
		const saveAllStudents = await Student.insertMany(charas);
		console.log(
			`\n💚 INSERTADO ${saveAllStudents.length} Personajes en la Coleccion "students" en MongoDB💚\n`
				.green,
		);
	} catch (error) {
		console.error(
			'\n Error al intentar INSERTAR todos los personajes en la coleccion "students" en MongoDB \n'
				.bgRed,
			error,
		);
	}
};

//READ
export const getOneCharaMongoDB = async (charaName) => {
	try {
		return await Student.findOne({ charaName });
	} catch (error) {
		console.error(
			`\n ERROR al intentar OBTENER "${charaName}" desde MongoDB \n`.bgRed,
			error,
		);
	}
};

export const getAllCharasMongoDB = async () => {
	try {
		return await Student.find({}).sort('charaName');
	} catch (error) {
		console.error(
			'\n ERROR al intentar OBTENER TODOS los personajes desde MongoDB \n'
				.bgRed,
			error,
		);
	}
};

//UPDATE
export const updateOneCharaMongoDB = async (chara) => {
	try {
		await Student.updateOne({ charaName: chara.charaName }, chara); //PARA ELIMINAR FILES EN TODA LA COLECCION
		console.log(`\n ❤️  ${chara.charaName} Actualizada ❤️ \n`.bgGreen);
	} catch (error) {
		console.error(
			`\n ERROR al intentar ACTUALiZAR TODOS los personajes desde MongoDB \n`
				.bgRed,
			error,
		);
	}
};

//DELETE
export const deleteAllCharasMongoDB = async () => {
	try {
		await Student.deleteMany({});
		console.log(
			'\n 🖤 SE BORRO TODA LA COLECCION "students" DE MongoDB 🖤 \n'.black,
		);
	} catch (error) {
		console.error(
			'\n Error al intentar ELIMINAR la collecion "students" de MongoDB \n'
				.bgRed,
			error,
		);
	}
};

import { connect, Schema, model } from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
