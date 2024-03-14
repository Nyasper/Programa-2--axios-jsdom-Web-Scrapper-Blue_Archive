import { JSDOM } from 'jsdom';
import { getHtmlFromUrl } from './axiosRequests';

export const getCharaName = (charaName: string): string => charaName;

export const getName = (name: string) => name.split(' ')[0].trim();
export const getLastName = (lastName: string): string =>
	lastName.split(' ')[0].trim();
export const getSchool = (school: string): string => {
	const mainsSchools: string[] = [
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
	return school;
};

export const getRole = (role: string): string => role.replace('/', '_');

export const getCombatClass = (combatClass: string): string => combatClass;

export const getWeaponType = (weaponType: string): string => weaponType;

export const getAge = (age: string): number | undefined => {
	if (!isNaN(parseInt(age))) {
		return parseInt(age);
	}
	return undefined;
};

export const getBirthday = (birthday: string): string | undefined => {
	if (birthday === '-') {
		return undefined;
	}
	return birthday;
};

export const getHeight = (height: string): number | undefined => {
	if (height.includes('cm')) {
		let newHeight = height.split('cm')[0];
		if (!isNaN(parseInt(newHeight))) {
			return parseInt(newHeight);
		}
		return undefined;
	}
	return undefined;
};

export const getHobbies = (hobbies: string) => {
	if (hobbies.includes("'")) {
		return hobbies.replaceAll("'", '');
	}
	return hobbies;
};

export const getDesigner = (designer: string): string | undefined => {
	if (designer === '-') {
		return undefined;
	}
	return designer.replaceAll(' ', '_').trim();
};

export const getIllustrator = (illustrator: string): string | undefined => {
	if (illustrator === '-') {
		return undefined;
	}
	return illustrator.replaceAll(' ', '_').trim();
};

export const getVoice = (voice: string): string =>
	voice.replaceAll(' ', '_').trim();

export const getReleaseDate = (releaseDate: string): string =>
	releaseDate.replaceAll('/', '-');

export const getSkinSet = (charaName: string): string => {
	try {
		if (
			charaName.includes('_(') &&
			charaName.endsWith(')') &&
			!charaName.toLowerCase().includes('kid')
		) {
			return charaName.split('(')[1].split(')')[0].trim().toLowerCase();
		}
	} catch (error) {
		console.error(`\nERROR al intentar obtener "skinSet" de "${charaName}"\n`);
	}

	return 'default';
};

export const getPageImageProfileUrl = (
	document: Document,
	charaName: string,
): string | undefined => {
	try {
		const images = Array.from(document.querySelectorAll('img'));
		const pageImageProfile = images.find(
			(img) => img.alt === charaName.replaceAll('_', ' '),
		);

		if (!pageImageProfile) {
			throw new Error(
				`\nError al intentar obtener "pageImageProfile" de "${charaName}"\n`,
			);
		}
		return 'https:' + pageImageProfile.src;
	} catch (error) {
		console.error(
			`\nError en la funcion "getPageImageProfileUrl" de: "${charaName}"\n`,
			error,
		);
		return undefined;
	}
};

export const getPageImageFullUrl = async (
	document: Document,
	charaName: string,
	skinSet: string,
): Promise<string | undefined> => {
	try {
		const images = Array.from(document.querySelectorAll('img'));

		const imgFullTiny = images.find(
			(img) =>
				(img.alt.toLowerCase() === charaName.toLowerCase() &&
					img.src.includes('_full')) ||
				(img.alt.toLowerCase().replaceAll(' ', '_') === skinSet.toLowerCase() &&
					img.src.includes('_00.png')) ||
				(charaName.toLowerCase() && img.src.endsWith('_00.png')),
		);

		if (!imgFullTiny) {
			throw new Error(`\nERROR al obtener "imgFullTiny" de "${charaName}"\n`);
		}

		const newPageImgFull =
			'https://bluearchive.wiki' +
			(imgFullTiny.parentElement as HTMLAnchorElement).href;

		const newPageDom = new JSDOM(await getHtmlFromUrl(newPageImgFull), {
			resources: 'usable',
		});

		const anchors = Array.from(
			newPageDom.window.document.querySelectorAll('a'),
		);

		const pageImageFullUrl = anchors.find(
			(a) => a.textContent?.toLowerCase() === 'original file',
		);

		if (!pageImageFullUrl)
			throw new Error(
				`\nERROR al obtener "pageImageFullUrl" de "${charaName}"\n`,
			);
		return 'https:' + pageImageFullUrl;
	} catch (error) {
		console.error(
			`\nError en la funcion "getPageImageFullUrl" de: "${charaName}"\n`,
			error,
		);
		return undefined;
	}
};

export const getAudioUrl = (document: Document): string => {
	const AudioUrl = document.querySelector(
		'#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(18) > td',
	) as HTMLAudioElement;
	if (AudioUrl && AudioUrl.dataset && AudioUrl.dataset.voice) {
		return 'https:' + AudioUrl.dataset.voice;
	}
	throw new Error(
		`\nError al intentar obtener el audio de el document: ${AudioUrl.dataset.voice || 'undefined'} en la funcion "getAudioUrl"\n`,
	);
};
