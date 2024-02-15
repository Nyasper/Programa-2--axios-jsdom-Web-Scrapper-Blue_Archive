import { JSDOM } from 'jsdom';
import { getHtmlFromUrl } from './axiosRequests.js';

export const getCharaName = (charaName) => charaName
export const getName = (name) => name.split(' ')[0].trim();
export const getLastName = (lastName) => lastName.split(' ')[0].trim()
export const getSchool = (school) => {
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
    'Valkyrie',
  ];
  if (!mainsSchools.includes(school)) return 'other';
  return school
}

export const getRole = (role) => role.replace('/', '_');

export const getCombatClass = (combatClass) => combatClass

export const getWeaponType = (weaponType) => weaponType

export const getAge = (age) => {
  if (!isNaN(parseInt(age))) {
    return parseInt(age);
  }
  return null;
}

export const getBirthday = (birthday) => {
  if (birthday === '-') {
    return null
  }
  return birthday
}

export const getHeight = (height) => {
  if (height.includes('cm')) {
    let newHeight = height.split('cm')[0];
    if (!isNaN(parseInt(newHeight))) {
      return parseInt(newHeight);
    }
    return null;
  }
  return null
}

export const getHobbies = (hobbies) => {
  if (hobbies.includes("'")) {
    return hobbies.replaceAll("'", '');
  }
  return hobbies
}

export const getDesigner = (designer) => {
  if (designer === '-') {
    return null
  }
  return designer.replaceAll(' ', '_').trim()
}

export const getIllustrator = (illustrator) => {
  if (illustrator === '-') {
    return null
  }
  return illustrator.replaceAll(' ', '_').trim()
}

export const getVoice = (voice) => voice.replaceAll(' ', '_').trim()

export const getReleaseDate = (releaseDate) => releaseDate.replaceAll('/', '-');

export const getSkinSet = (charaName) => {
  try {
    if (charaName.includes('_(') && charaName.endsWith(')')) {
      return charaName
        .split('(')[1]
        .split(')')[0]
        .trim()
        .toLowerCase();
    }
  } catch (error) {
    console.error(`\nERROR al intentar obtener "skinSet" de "${charaName}"\n`)
  }

  return 'original';
}

export const getPageImageProfileUrl = (dom, charaName) => {
  try {
    const images = Array.from(dom.window.document.querySelectorAll('img'));
    const pageImageProfile = images.find((img) => img.alt === charaName.replaceAll('_', ' '))

    if (!pageImageProfile) throw new Error(`\nError al intentar obtener "pageImageProfile" de "${charaName}"\n`)
    return 'https:' + pageImageProfile.src
  } catch (error) {
    console.error(`\nError en la funcion "getPageImageProfileUrl" de: "${charaName}"\n`, error)
    return null
  }

}


export const getPageImageFullUrl = async (dom, charaName, skinSet) => {

  try {

    const images = Array.from(dom.window.document.querySelectorAll('img'));

    const imgFullTiny = images.find((img) => img.alt.toLowerCase() === charaName.toLowerCase() && img.src.includes('_full') || img.alt.toLowerCase().replaceAll(' ', '_') === skinSet.toLowerCase() && img.src.includes('_00.png') || charaName.toLowerCase() && img.src.endsWith('_00.png'))

    if (!imgFullTiny) throw new Error(`\nERROR al obtener "imgFullTiny" de "${charaName}"\n`);
    const newPageImgFull = 'https://bluearchive.wiki' + imgFullTiny.parentElement.href

    const newPageDom = new JSDOM(await getHtmlFromUrl(newPageImgFull), { resources: 'usable' });

    const anchors = Array.from(newPageDom.window.document.querySelectorAll('a'));

    const pageImageFullUrl = anchors.find((a) => a.textContent.toLowerCase() === 'original file');

    if (!pageImageFullUrl) throw new Error(`\nERROR al obtener "pageImageFullUrl" de "${charaName}"\n`)
    return 'https:' + pageImageFullUrl

  } catch (error) {
    console.error(`\nError en la funcion "getPageImageFullUrl" de: "${charaName}"\n`, error)
    return null
  }
}

export const getAudioUrl = (dom) => {
  return 'https:' + dom.window.document.querySelector('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(18) > td').dataset.voice;
}