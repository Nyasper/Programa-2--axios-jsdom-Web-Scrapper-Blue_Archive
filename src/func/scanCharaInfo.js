import { getDATACharaInfo } from './axiosRequests.js';
import { JSDOM } from 'jsdom';

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

export default async function scanCharaInfo(charaNameParameter) {

	try {
		//JSDOM
		const dom = new JSDOM(await getDATACharaInfo(`https://bluearchive.wiki/wiki/${charaNameParameter}`), { resources: 'usable' });
		const $selectText = (selector) => dom.window.document.querySelector(selector).textContent.trim();


		//Data Extraction
		const charaName = getCharaName(charaNameParameter);

		const name = getName(await $selectText('#firstHeading > span'));

		const lastName = getLastName(await $selectText('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(11) > td'));

		const school = getSchool(await $selectText(
			'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(4) > td:nth-child(1)',
		));


		const role = getRole(await $selectText('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(4) > td:nth-child(2)'));

		const combatClass = getCombatClass(await $selectText('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(7) > td',
		));

		const weaponType = getWeaponType(await $selectText('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(9) > td > table > tbody > tr > td.weapon > div.weapon-text'));

		const age = getAge(await $selectText('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(12) > td'));

		const birthday = getBirthday(await $selectText('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(13) > td'));

		const height = getHeight(await $selectText('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(14) > td'));

		const hobbies = getHobbies(await $selectText('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(15) > td'));

		const designer = getDesigner(await $selectText('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(16) > td'));

		const illustrator = getIllustrator(await $selectText(
			'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(17) > td'));

		const voice = getVoice(await $selectText('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(18) > td'));

		const releaseDate = getReleaseDate(await $selectText('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(19) > td'));

		const skinSet = getSkinSet(charaName);

		const pageUrl = `https://bluearchive.wiki/wiki/${charaName}`;

		const pageImageProfileUrl = getPageImageProfileUrl(dom, charaName);

		const pageImageFullUrl = await getPageImageFullUrl(dom, charaName, skinSet);

		const localAudioSrc = getLocalAudioSrc(school, charaName);

		const localImageProfileSrc = getLocalImageProfileSrc(school, charaName);

		const localImageFullSrc = getLocalImageFullSrc(school, charaName);

		const audioUrl = getAudioUrl(dom);

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
			skinSet,
			pageUrl,
			pageImageProfileUrl,
			pageImageFullUrl,
			audioUrl,
			localImageProfileSrc,
			localImageFullSrc,
			localAudioSrc,
		};
	} catch (error) {
		console.error(
			'\n\n Se ha producido un error al escanear la informacion del personaje \n\n'
				.bgRed,
			error,
		);
		throw error;
	}
}

//GET Functions
const getCharaName = (charaName) => charaName
const getName = (name) => name.split(' ')[0].trim();
const getLastName = (lastName) => lastName.split(' ')[0].trim()
const getSchool = (school) => {
	if (!mainsSchools.includes(school)) {
		return school = 'other';
	}
	return school
}
const getRole = (role) => role.replace('/', '_');
const getCombatClass = (combatClass) => combatClass
const getWeaponType = (weaponType) => weaponType
const getAge = (age) => {
	if (!isNaN(parseInt(age))) {
		return parseInt(age);
	}
	return null;
}
const getBirthday = (birthday) => {
	if (birthday === '-') {
		return null
	}
	return birthday
}
const getHeight = (height) => {
	if (height.includes('cm')) {
		let newHeight = height.split('cm')[0];
		if (!isNaN(parseInt(newHeight))) {
			return parseInt(newHeight);
		}
		return null;
	}
	return null
}
const getHobbies = (hobbies) => {
	if (hobbies.includes("'")) {
		return hobbies.replaceAll("'", '');
	}
	return hobbies
}
const getDesigner = (designer) => {
	if (designer === '-') {
		return null
	}
	return designer
}
const getIllustrator = (illustrator) => {
	if (illustrator === '-') {
		return null
	}
	return illustrator
}
const getVoice = (voice) => voice
const getReleaseDate = (releaseDate) => releaseDate.replaceAll('/', '-');

const getSkinSet = (charaName) => {
	if (charaName.includes('_(') && charaName.endsWith(')')) {
		return charaName
			.split('(')[1]
			.split(')')[0]
			.toLowerCase()
			.trim();
	}
	return 'original';
}

const getPageImageProfileUrl = (dom, charaName) => {
	let pageImageProfile = '';
	dom.window.document.querySelectorAll('img').forEach((img) => {
		if (img.alt === charaName.replaceAll('_', ' ') && !img.src.includes('_full.png')) {
			pageImageProfile = 'https:' + img.src;
		}
	});
	if (pageImageProfile) return pageImageProfile
	return null
}


const getPageImageFullUrl = async (dom, charaName, skinSet) => {
	let newPageUrl = '';
	dom.window.document.querySelectorAll('img').forEach((image) => {
		if (image.alt.toLowerCase() === skinSet.replaceAll('_', ' ')) {
			newPageUrl = `https://bluearchive.wiki${image.parentElement.href}`;
		} else if (image.alt.toLowerCase() === charaName.toLowerCase().replaceAll('_', ' ')) {
			newPageUrl = `https://bluearchive.wiki${image.parentElement.href}`;
		}
	});
	if (newPageUrl) {
		const newPagedom = new JSDOM(await getDATACharaInfo(newPageUrl), { resources: 'usable' });
		newPagedom.window.document.querySelectorAll('a').forEach((a) => {
			if (a.textContent === 'Original file') {
				newPageUrl = 'https:' + a.href;
			}
		});
		return newPageUrl
	}
	return null
}
const getAudioUrl = (dom) => {
	return 'https:' + dom.window.document.querySelector('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(18) > td').dataset.voice;
}
const getLocalImageProfileSrc = (school, charaName) => `/media/${school}/${charaName}.png`
const getLocalImageFullSrc = (school, charaName) => `/media/${school}/${charaName}_full.png`
const getLocalAudioSrc = (school, charaName) => `/media/${school}/${charaName}.ogg`

