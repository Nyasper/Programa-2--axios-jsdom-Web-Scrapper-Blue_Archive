import { connect, Schema, model } from 'mongoose';
import dotenv from 'dotenv';

// const rutaActual = dirname(fileURLToPath(import.meta.url));
const rutaActual = __dirname;

dotenv.config({ path: `${rutaActual}/.env` });
import { IStudent } from './studentsModel';

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

(async () => {
	try {
		if (process.env.MONGODB_URI) await connect(process.env.MONGODB_URI);
		else throw new Error('MongoDB URI no Existe');
	} catch (error) {
		console.error('\n Error al intentar conectar a MongoDB \n', error);
	}
})();
//Conectar

//CREATE
export const saveOneCharaMongoDB = async (chara: IStudent): Promise<void> => {
	try {
		await new Student(chara).save();
		console.log(`\n💚 ${chara.charaName} 💚\n`);
	} catch (error) {
		throw new Error(
			`\nError al intentar INSERTAR "${chara.charaName || 'undefined'}" en MongoDB en funcion saveOneCharaMongoDB"\n`,
		);
	}
};

export const saveManyCharasMongoDB = async (
	charas: IStudent[],
): Promise<void> => {
	try {
		const saveAllStudents = await Student.insertMany(charas);
		console.log(
			`\n💚 INSERTADO ${saveAllStudents.length} Personajes en la Coleccion "students" en MongoDB💚\n`,
		);
	} catch (error) {
		throw new Error(
			'\n Error al intentar INSERTAR todos los personajes en la coleccion "students" en MongoDB en la funcion "saveManyCharasMongoDB" \n',
		);
	}
};

//READ
export const getOneCharaMongoDB = async (
	charaName: string,
): Promise<IStudent> => {
	try {
		const chara: IStudent = (await Student.findOne({ charaName })) as IStudent;

		return chara;
	} catch (error) {
		throw new Error(
			`\n ERROR al intentar OBTENER "${charaName}" desde MongoDB en funcion "getOneCharaMongoDB" \n`,
		);
	}
};

export const getAllCharasMongoDB = async (): Promise<any[]> => {
	try {
		const chara = await Student.find({}).sort('charaName');
		return chara;
	} catch (error) {
		throw new Error(
			'\n ERROR al intentar OBTENER TODOS los personajes desde MongoDB en funcion getAllCharasMongoDB\n',
		);
	}
};

//UPDATE
export const updateOneCharaMongoDB = async (chara: IStudent): Promise<void> => {
	try {
		await Student.updateOne({ charaName: chara.charaName }, chara); //PARA ELIMINAR FILES EN TODA LA COLECCION
		console.log(`\n ❤️  ${chara.charaName} Actualizada ❤️ \n`);
	} catch (error) {
		throw new Error(
			`\n ERROR al intentar ACTUALiZAR TODOS los personajes desde MongoDB en funcion updateOneChharaMongoDB\n`,
		);
	}
};

//DELETE
export const deleteAllCharasMongoDB = async (): Promise<void> => {
	try {
		await Student.deleteMany({});
		console.log('\n 🖤 SE BORRO TODA LA COLECCION "students" DE MongoDB 🖤 \n');
	} catch (error) {
		throw new Error(
			'\n Error al intentar ELIMINAR la collecion "students" de MongoDB en funcion "deleteAllCharasMongoDB" \n',
		);
	}
};
