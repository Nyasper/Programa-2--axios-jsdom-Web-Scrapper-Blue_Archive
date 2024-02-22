import { getHtmlFromUrl } from './axiosRequests';
import { JSDOM } from 'jsdom';
import { domain } from './utils';
import {
	getCharaName,
	getName,
	getLastName,
	getSchool,
	getRole,
	getCombatClass,
	getWeaponType,
	getAge,
	getBirthday,
	getHeight,
	getHobbies,
	getDesigner,
	getIllustrator,
	getVoice,
	getReleaseDate,
	getSkinSet,
	getPageImageProfileUrl,
	getPageImageFullUrl,
	getAudioUrl,
} from './getFunctions';
import { IStudent } from '../db/studentsModel';

export default async function scanCharaInfo(
	charaNameParameter: string,
): Promise<IStudent> {
	try {
		const document = await validateHtml(charaNameParameter);

		const $selectText = (selector: string) => {
			const element = document.querySelector(selector);
			if (element && element.textContent) {
				return element.textContent.trim();
			}
			throw new Error(
				`\nError al intentar SELECCIONAR "${selector || 'undefined'}" en la funcion "$selectText"\n`,
			);
		};

		const charaName = getCharaName(charaNameParameter);

		const name = getName(await $selectText('#firstHeading > span'));

		const lastName = getLastName(
			$selectText(
				'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(11) > td',
			),
		);

		const school = getSchool(
			$selectText(
				'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(4) > td:nth-child(1)',
			),
		);

		const role = getRole(
			$selectText(
				'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(4) > td:nth-child(2)',
			),
		);

		const combatClass = getCombatClass(
			await $selectText(
				'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(7) > td',
			),
		);

		const weaponType = getWeaponType(
			$selectText(
				'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(9) > td > table > tbody > tr > td.weapon > div.weapon-text',
			),
		);

		const age = getAge(
			$selectText(
				'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(12) > td',
			),
		);

		const birthday = getBirthday(
			$selectText(
				'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(13) > td',
			),
		);

		const height = getHeight(
			$selectText(
				'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(14) > td',
			),
		);

		const hobbies = getHobbies(
			$selectText(
				'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(15) > td',
			),
		);

		const designer = getDesigner(
			$selectText(
				'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(16) > td',
			),
		);

		const illustrator = getIllustrator(
			$selectText(
				'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(17) > td',
			),
		);

		const voice = getVoice(
			$selectText(
				'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(18) > td',
			),
		);

		const releaseDate = getReleaseDate(
			$selectText(
				'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(19) > td',
			),
		);

		const skinSet = getSkinSet(charaName);

		const pageUrl = `https://bluearchive.wiki/wiki/${charaName}`;

		const pageImageProfileUrl = getPageImageProfileUrl(document, charaName);

		const pageImageFullUrl = await getPageImageFullUrl(
			document,
			charaName,
			skinSet,
		);

		const audioUrl = getAudioUrl(document);

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
			files: false,
		};
	} catch (error) {
		console.error(
			'\nSe ha producido un error al escanear la informacion del personaje en la funcion "scanCharaInfo()"\n',
			error,
		);
		process.exit(1);
	}
}

const validateHtml = async (charaNameParameter: string): Promise<Document> => {
	const html = await getHtmlFromUrl(domain + charaNameParameter);
	const dom = new JSDOM(html, { resources: 'usable' });
	const document = dom.window.document;

	if (document) {
		return document;
	}
	throw new Error(
		`\nError al intentar obtener el "HTML" de "${charaNameParameter || 'undefined'}" en la funcion "validateHTML"\n`,
	);
};

(async () => {
	console.log(await scanCharaInfo('Shun_(Kid)'));
})();
