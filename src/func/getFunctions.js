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
  if (!mainsSchools.includes(school)) {
    return school = 'other';
  }
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
  if (charaName.includes('_(') && charaName.endsWith(')')) {
    return charaName
      .split('(')[1]
      .split(')')[0]
      .toLowerCase()
      .trim();
  }
  return 'original';
}

export const getPageImageProfileUrl = (dom, charaName) => {
  let pageImageProfile = '';
  dom.window.document.querySelectorAll('img').forEach((img) => {
    if (img.alt === charaName.replaceAll('_', ' ') && !img.src.includes('_full.png')) {
      pageImageProfile = 'https:' + img.src;
    }
  });
  if (pageImageProfile) return pageImageProfile
  return null
}


export const getPageImageFullUrl = async (dom, charaName, skinSet) => {
  let newPageUrl = '';
  dom.window.document.querySelectorAll('img').forEach((image) => {
    if (image.alt.toLowerCase() === skinSet.replaceAll('_', ' ')) {
      newPageUrl = `https://bluearchive.wiki${image.parentElement.href}`;
    } else if (image.alt.toLowerCase() === charaName.toLowerCase().replaceAll('_', ' ')) {
      newPageUrl = `https://bluearchive.wiki${image.parentElement.href}`;
    }
  });
  if (newPageUrl) {
    const newPagedom = new JSDOM(await getHtmlFromUrl(newPageUrl), { resources: 'usable' });
    newPagedom.window.document.querySelectorAll('a').forEach((a) => {
      if (a.textContent === 'Original file') {
        newPageUrl = 'https:' + a.href;
      }
    });
    return newPageUrl
  }
  return null
}

export const getAudioUrl = (dom) => {
  return 'https:' + dom.window.document.querySelector('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(18) > td').dataset.voice;
}

export const getLocalImageProfileSrc = (school, charaName) => `/media/${school}/${charaName}.png`

export const getLocalImageFullSrc = (school, charaName) => `/media/${school}/${charaName}_full.png`

export const getLocalAudioSrc = (school, charaName) => `/media/${school}/${charaName}.ogg`