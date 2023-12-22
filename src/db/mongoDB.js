//Usuario y Contraseña
dotenv.config({ path: ".env" });


//Student Schema
const StudentSchema = new Schema({
  charaName:String,
  name:String,
  lastName:String,
  school:String,
  role:String,
  combatClass:String,
  weaponType:String,
  age:Number,
  birthday:String,
  height:Number,
  hobbies:String,
  designer:String,
  illustrator:String,
  voice:String,
  releaseDate:String,
  url:String,
  files:Boolean
},{
  versionKey:false
})

export const Student = model('Student',StudentSchema)

//Conectar
export async function conectarMongoDB() {
  try {
    await connect(
      process.env.URI
    );
  } catch (error) {
    console.log('\nError al intentar conectar a MongoDB\n',error);
  }
}

//Querys / Consultas
export const guardarMongoDB = async(chara) => {
  await new Student(chara).save()
  console.log(`\n💚 ${chara.charaName} 💚\n`) //Guardar en MongoDB
}


export const guardarMuchosMongoDB = async(chara) => {
  await Student.insertMany(chara)
  .then((result) => {
    result.forEach(chara=>console.log(`\n💚 ${chara.charaName} 💚\n`))
  })
  .catch((error) => {
    console.error('Error al insertar documentos:', error);
  })
}


export const getAllCharasMongoDB =  async() => await Student.find({}).sort('charaName')

export const buscarMongoDB =  async(charaName) => await Student.findOne({charaName}) //Bucar en mongoDB por 'charaName'

export const buscarArchivosMongoDB = async(boolean) => await Student.find({files:boolean})

//Se usa cuando se Sube a MongoDB por primera vez(false) o cuando se terminan de descargar los archivos(true)
export const archivosDescargados = async(charaName) => {
  await Student.updateOne({charaName},{$set:{files:true}})
  console.log(`💚 ${charaName} Archivos Guardados en MongoDB 💚`)
}



export const modificarTodosLosArchivos = async(boolean) => {
  await Student.updateMany({}, { $set: { files:boolean } }) //PARA ELIMINAR FILES EN TODA LA COLECCION
  console.log(`La propiedad Files ha sido cambiada a: ${boolean}`)
}



//Borra un personaje, solo acepta el objeto entero del personaje por parametro.
export const borrarPersonaje = async(chara) => { 
  await Student.deleteOne(chara)
  console.log(`\n🖤${chara}🖤`)
}


// CAUTION / CUIDADO BORRA TODA LA COLECCION 'STUDENTS' DE MONGODB
const borrarCollectionStudents = async(password) => {
  if (password === process.env.PASSWORD){
    conectarMongoDB()
    const charas = await Student.find({})
    for (const chara of charas) {
      console.log(`🖤 ${chara.charaName} 🖤`)
      await borrarPersonaje(chara)
    }
    console.log('\n🖤 SE BORRO TODA LA COLECCION "Students" DE MONGODB 🖤\n') 
    desconectarMongoDB()
  }
}



//Desconectar
export const desconectarMongoDB = () => disconnect()

import { connect , disconnect , Schema, model } from "mongoose";
import dotenv from "dotenv";