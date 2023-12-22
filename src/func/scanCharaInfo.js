export default async function scanCharaInfo(charaNameParameter) {

  const mainsSchools = [
    'Abydos',
    'Arius',
    'Gehenna',
    'Hyakkiyako',
    'Millennium',
    'Red Winter',
    'SRT',
    'Shanhaijing',
    'Trinity',
    'Valkyrie'
  ];

  try {
    //JSDOM
    const dom = new JSDOM(await getDATACharaInfo(`https://bluearchive.wiki/wiki/${charaNameParameter}`), { resources: 'usable' });
    const $selectText = async (selector) => await dom.window.document.querySelector(selector).textContent.trim();

    //Data Extraction
    let charaName = await $selectText("#firstHeading > span")
    charaName = charaName.replaceAll(' ', '_')

    let name = await $selectText("#firstHeading > span")
    if (name == "-") name = null
    name = name.split(' ')[0].trim()

    let lastName = await $selectText("#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(11) > td")
    if (lastName == "-") lastName = null
    lastName = lastName.split(' ')[0].trim()

    let school = await $selectText("#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(4) > td:nth-child(1)")
    if (!mainsSchools.includes(school)) school = 'other';

    let role = await $selectText("#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(4) > td:nth-child(2)")
    if (role == "-") role = null
    role = role.replace('/', '_')

    let combatClass = await $selectText("#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(7) > td")
    if (combatClass == '-') combatClass = null

    let weaponType = await $selectText("#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(9) > td > table > tbody > tr > td.weapon > div.weapon-text")
    if (weaponType == '-') weaponType = null

    let age = await $selectText("#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(12) > td")

    if (!isNaN(parseInt(age))) {
      age = parseInt(age)
    } else {
      age = null
    }

    let birthday = await $selectText("#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(13) > td")
    if (birthday == "-") birthday = null

    let height = await $selectText("#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(14) > td")
    height = height.split('cm')[0]
    if (!isNaN(parseInt(height))) {  //si el parametro de parseInt() no es un entero devuelve isNaN y por lo tanto la variable se queda vacia
      height = parseInt(height)
    } else {
      height = null
    }

    let hobbies = await $selectText("#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(15) > td")
    if (hobbies == '-') hobbies = null
    if (hobbies.includes("'")) hobbies = hobbies.replaceAll("'", "")

    let designer = await $selectText("#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(16) > td")
    if (designer == '-') designer = null

    let illustrator = await $selectText("#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(17) > td")
    if (illustrator == '-') illustrator = null

    let voice = await $selectText("#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(18) > td")
    if (voice == '-') voice = null

    let releaseDate = await $selectText("#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(19) > td")
    if (releaseDate == '-') releaseDate = null

    let url = `https://bluearchive.wiki/wiki/${charaNameParameter}`

    let files = false  //Se cambia a TRUE si descague las 2 imagenes y el audio del personaje

    return {
      charaName,
      name,
      lastName,
      school,
      role,
      combatClass,
      weaponType,
      age,
      birthday,
      height,
      hobbies,
      designer,
      illustrator,
      voice,
      releaseDate,
      url,
      files
    }
  } catch (error) {
    console.error('\n\nSe ha producido un error al escanear la informacion del personaje\n\n', error)
    throw error
  }
}

import { getDATACharaInfo } from "./axiosRequests.js";
import { JSDOM } from "jsdom";