import { getHtmlFromUrl } from './axiosRequests.js';
import { JSDOM } from 'jsdom';
import { getCharaName, getName, getLastName, getSchool, getRole, getCombatClass, getWeaponType, getAge, getBirthday, getHeight, getHobbies, getDesigner, getIllustrator, getVoice, getReleaseDate, getSkinSet, getPageImageProfileUrl, getPageImageFullUrl, getAudioUrl } from './getFunctions.js';

export default async function scanCharaInfo(charaNameParameter) {

	try {
		//JSDOM
		const dom = new JSDOM(await getHtmlFromUrl(`https://bluearchive.wiki/wiki/${charaNameParameter}`), { resources: 'usable' });
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
			audioUrl
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
