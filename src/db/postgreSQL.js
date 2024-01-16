import { Students } from "./studentsModel.js";
import colors from 'colors';

//CREATE
export const insertOneChara = async (chara) => {


  try {

    await Students.create({
      charaname: chara.charaName,
      name: chara.name,
      lastname: chara.lastName,
      school: chara.school,
      role: chara.role,
      combatclass: chara.combatClass,
      weapontype: chara.weaponType,
      age: chara.age,
      birthday: chara.birthday,
      height: chara.height,
      hobbies: chara.hobbies,
      designer: chara.designer,
      illustrator: chara.illustrator,
      voice: chara.voice,
      releasedate: chara.releaseDate,
      skinset: chara.skinSet,
      pageurl: chara.pageUrl,
      pageimageprofileurl: chara.pageImageProfileUrl,
      pageimagefullurl: chara.pageImageFullUrl,
      audiourl: chara.audioUrl,
      localimageprofilesrc: chara.localImageProfileSrc,
      localimagefullsrc: chara.localImageFullSrc,
      localaudiosrc: chara.localAudioSrc
    })

    console.log(`\n💚 ${chara.charaName} 💚\n`.green);

  } catch (error) {
    console.error(`\n Error al INSERTAR insertar a: "${chara.charaName}" \n`.bgRed, error)
  }


}


//READ
export async function getOneStudent(charaname) {

  if (charaname) {


    try {

      const Student = await Students.findOne({ where: { charaname } })
      return {
        charaName: Student.dataValues.charaname,
        name: Student.dataValues.name,
        lastName: Student.dataValues.lastname,
        school: Student.dataValues.school,
        role: Student.dataValues.role,
        combatClass: Student.dataValues.combatclass,
        weaponType: Student.dataValues.weapontype,
        age: Student.dataValues.age,
        birthday: Student.dataValues.birthday,
        hieght: Student.dataValues.height,
        hobbies: Student.dataValues.hobbies,
        designer: Student.dataValues.designer,
        illustrator: Student.dataValues.illustrator,
        voice: Student.dataValues.voice,
        releaseDate: Student.dataValues.releasedate,
        skinSet: chara.skinset,
        pageUrl: Student.dataValues.pageurl,
        pageImageProfileUrl: Student.dataValues.pageimageprofileurl,
        pageImageFullUrl: Student.dataValues.pageimagefullurl,
        audioUrl: Student.dataValues.audiourl,
        localImageProfileSrc: Student.dataValues.localimageprofilesrc,
        localImageFullSrc: Student.dataValues.localimagefullsrc,
        localAudioSrc: Student.dataValues.localaudiosrc,
        files: Student.dataValues.files,
        createdAt: Student.dataValues.createdAt
      }
    } catch (error) {
      console.error(`\n Error al intentar OBTENER los datos de "${charaname}" desde la tabla "students" \n`.bgRed, error)
    }

  }

}

export async function getAllStudents() {

  try {
    const allStudents = await Students.findAll({ order: [['charaname', 'ASC']] })

    return allStudents.map((chara) => ({

      charaName: chara.dataValues.charaname,
      name: chara.dataValues.name,
      lastName: chara.dataValues.lastname,
      school: chara.dataValues.school,
      role: chara.dataValues.role,
      combatClass: chara.dataValues.combatclass,
      weaponType: chara.dataValues.weapontype,
      age: chara.dataValues.age,
      birthday: chara.dataValues.birthday,
      hieght: chara.dataValues.height,
      hobbies: chara.dataValues.hobbies,
      designer: chara.dataValues.designer,
      illustrator: chara.dataValues.illustrator,
      voice: chara.dataValues.voice,
      releaseDate: chara.dataValues.releasedate,
      skinSet: chara.skinset,
      pageUrl: chara.dataValues.pageurl,
      pageImageProfileUrl: chara.dataValues.pageimageprofileurl,
      pageImageFullUrl: chara.dataValues.pageimagefullurl,
      audioUrl: chara.dataValues.audiourl,
      localImageProfileSrc: chara.dataValues.localimageprofilesrc,
      localImageFullSrc: chara.dataValues.localimagefullsrc,
      localAudioSrc: chara.dataValues.localaudiosrc,
      files: chara.dataValues.files,
      createdAt: chara.dataValues.createdAt

    }))

  } catch (error) {
    console.error('\n Error al intentar OBTENER todos los personajes de la tabla "students" \n'.bgRed, error)
  }

}

export async function getAllCharasName() {

  try {

    const charaNames = await Students.findAll({
      attributes: ['charaname'],
      order: [['charaname', 'ASC']]
    })

    return charaNames.map((charaname) => ({ charaName: charaname.dataValues.charaname }))

  } catch (error) {
    console.error('\nError al Intentar OBTENER todos los "charaNames" de la tabla students\n', error)
  }

}

export async function getAllCharasWithoutFiles() {

  try {

    const students = await Students.findAll({
      attributes: ['charaname', 'name', 'school', 'pageimageprofileurl', 'pageimagefullurl', 'audiourl', 'files'],
      where: { files: false },
      order: [['charaname', 'ASC']]
    })

    return students.map((chara) => ({

      charaName: chara.dataValues.charaname,
      name: chara.dataValues.name,
      school: chara.dataValues.school,
      pageImageProfileUrl: chara.dataValues.pageimageprofileurl,
      pageImageFullUrl: chara.dataValues.pageimagefullurl,
      audioUrl: chara.dataValues.audiourl,
      files: chara.dataValues.files,

    }))

  } catch (error) {
    console.error('\n ERROR al intentar OBTENER TODOS LOS PERSONAJES SIN ARCHIVOS \n'.bgRed, error)
  }

}

//UPDATE
export async function updateOneChara(chara) {

  try {

    await Students.update({

      charaname: chara.charaName,
      name: chara.name,
      lastname: chara.lastName,
      school: chara.school,
      role: chara.role,
      combatclass: chara.combatClass,
      weapontype: chara.weaponType,
      age: chara.age,
      birthday: chara.birthday,
      height: chara.height,
      hobbies: chara.hobbies,
      designer: chara.designer,
      illustrator: chara.illustrator,
      voice: chara.voice,
      releasedate: chara.releaseDate,
      skinset: chara.skinSet,
      pageurl: chara.pageUrl,
      pageimageprofileurl: chara.pageImageProfileUrl,
      pageimagefullurl: chara.pageImageFullUrl,
      audiourl: chara.audioUrl,
      localimageprofilesrc: chara.localImageProfileSrc,
      localimagefullsrc: chara.localImageFullSrc,
      localaudiosrc: chara.localAudioSrc

    }, { where: { charaname: chara.charaName } })
    console.log(`\n❤️  ${chara.charaName} Actualizada ❤️\n`.bgGreen)

  } catch (error) {
    console.error(`\nError al intentar ACTUALIZAR "${chara.charaName}" en postgreSQL"\n`, error)
  }

}

export async function charaFilesDownloaded(chara) {

  try {

    await Students.update({ files: true }, { where: { charaname: chara.charaName, files: false } })
    console.log(`\n 💚 DESCARGADO TODOS LOS ARCHIVOS de "${chara.charaName}" 💚`.bgGreen + '\n')

  } catch (error) {
    console.error(`\n Error al intentar ACTUALIZAR FILES a TRUE de "${chara.charaName}" en postgreSQL" \n`.bgRed, error)
  }

}

//DELETE
async function deleteOneChara(charaName, password) {

  if (charaName && password === process.env.PASSWORD) {

    try {
      await Students.destroy({ where: { charaname: charaName } })
      console.log(` 🖤 ${charaName} 🖤 `.bgBlack)
    } catch (error) {
      console.error(`\n Error al intentar ELIMINAR ${charaName} de la tabla "students" \n`.bgRed, error)
    }

  }

}

async function deleteAllCharas(password) {

  if (password === process.env.PASSWORD) {

    try {

      await Students.destroy({ truncate: true });
      console.log('\n🖤 SE BORRRARON TODOS LOS REGISTROS DE LA TABLA "students" DE PostgreSQL 🖤\n'.bgBlack)

    } catch (error) {
      console.error('\n Error al intentar ELIMINAR TODOS los registros de la tabla "students" \n'.bgRed)
    }

  }
}
