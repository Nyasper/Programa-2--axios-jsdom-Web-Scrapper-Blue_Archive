const rutaActual = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: `${rutaActual}/.env` });

//Student Schema
const studentSchema = new Schema({
  charaName: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  school: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  combatClass: {
    type: String
  },
  weaponType: {
    type: String
  },
  age: {
    type: Number,
    default: null
  },
  birthday: {
    type: String
  },
  height: {
    type: Number,
    default: null
  },
  hobbies: {
    type: String
  },
  designer: {
    type: String
  },
  illustrator: {
    type: String
  },
  voice: {
    type: String
  },
  releaseDate: {
    type: String
  },
  pageUrl: {
    type: String
  },
  pageImageProfileUrl: {
    type: String
  },
  pageImageFullUrl: {
    type: String
  },
  audioUrl: {
    type: String
  },
  localImageProfileSrc: {
    type: String
  },
  localImageFullSrc: {
    type: String
  },
  localAudioSrc: {
    type: String
  },
  files: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false
});

const Student = model('students', studentSchema);

//Conectar
try {
  await connect(process.env.MONGODB_URI);
} catch (error) {
  console.log('\nError al intentar conectar a MongoDB\n', error);
}


//CREATE
export const saveOneCharaMongoDB = async (chara) => {

  try {

    await new Student(chara).save()
    console.log(`\n💚 ${chara.charaName} 💚\n`) //Guardar en MongoDB

  } catch (error) {
    console.error(`\nError al intentar INSERTAR "${chara.charaName} en MongoDB"\n`, error)
  }

}

export const saveManyCharasMongoDB = async (charas) => {

  try {

    const saveAllStudents = await Student.insertMany(charas)
    console.log(`\n💚 INSERTADO ${saveAllStudents.length} Personajes en la Coleccion "students" en MongoDB💚\n`)

  } catch (error) {
    console.error('\nError al intentar INSERTAR todos los personajes en la coleccion "students" en MongoDB\n', error)
  }

}




//READ
export const getOneCharaMongoDB = async (charaName) => {

  try {
    return await Student.findOne({ charaName })
  } catch (error) {
    console.error(`\nERROR al intentar OBTENER "${charaName}" desde MongoDB\n`, error)
  }
}

export const getAllCharasMongoDB = async () => {

  try {
    return await Student.find({}).sort('charaName')
  } catch (error) {
    console.error('\nERROR al intentar OBTENER TODOS los personajes desde MongoDB\n', error)
  }

}




//UPDATE
export const updateOneCharaMongoDB = async (chara) => {

  try {
    await Student.updateOne({ charaName: chara.charaName }, chara) //PARA ELIMINAR FILES EN TODA LA COLECCION
    console.log(`\n❤️  ${chara.charaName} Actualizada ❤️\n`)
  } catch (error) {
    console.error(`\nERROR al intentar ACTUALiZAR TODOS los personajes desde MongoDB \n`, error)
  }

}




//DELETE
export const deleteAllCharasMongoDB = async () => {

  try {

    await Student.deleteMany({})
    console.log('\n🖤 SE BORRO TODA LA COLECCION "students" DE MongoDB🖤\n')

  } catch (error) {
    console.error('\nError al intentar ELIMINAR la collecion "students" de MongoDB\n', error)
  }

}



import { connect, Schema, model } from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';