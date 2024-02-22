import { getHtmlFromUrl } from './axiosRequests';
import { JSDOM } from 'jsdom';
import { domain } from './utils';

export interface charaList {
	charaName: string;
	img: string;
	url: string;
}

export default async function scanCharaList(): Promise<charaList[]> {
	try {
		const charaList = await scanList();
		return charaList;
	} catch (error) {
		console.error(
			'\n Se a producido un error en la funcion "scanCharaList()".\n',
			error,
		);
		process.exit(1);
	}
}

async function scanList(): Promise<charaList[]> {
	const charaList: charaList[] = [];

	const charaUl = await getCharaListUl();
	const totalChara = getTotalChara(charaUl);

	for (let i = 1; i < totalChara; i++) {
		const charaName = validateCharaName(charaUl, i);
		const img = validateImg(charaUl, i);
		const url = validatetUrl(charaUl, i);

		charaList.push({
			charaName,
			img,
			url,
		});
	}
	return charaList;
}

const getCharaListUl = async (): Promise<HTMLTableSectionElement> => {
	const dom = new JSDOM(
		await getHtmlFromUrl('https://bluearchive.wiki/wiki/Characters'),
		{ resources: 'usable' },
	);

	const charaUl = dom.window.document.querySelector<HTMLTableSectionElement>(
		'#mw-content-text > div.mw-parser-output > table > tbody',
	);

	if (charaUl) return charaUl;
	throw new Error(
		'\nError al obtener "charaUl" en la funcion "getCharaListUl".',
	);
};

const getTotalChara = (charaUl: HTMLTableSectionElement): number => {
	if (charaUl && charaUl.children.length > 0) {
		return charaUl.children.length;
	}
	throw new Error(
		'\nError al obtener "totalChara" en la funcion "getTotalChara", charaUl no existe.',
	);
};

const validateCharaName = (
	charaUl: HTMLTableSectionElement,
	i: number,
): string => {
	const td = charaUl.children[i]?.children[1] as HTMLTableElement;

	if (td && td.textContent) {
		return td.textContent.trim().replaceAll(' ', '_');
	}

	throw new Error(
		`\nError al obtener "charaName" de "${td.textContent ? td.textContent : 'undefined'}" en la funcion "validateCharaName".`,
	);
};

const validateImg = (charaUl: HTMLTableSectionElement, i: number): string => {
	const img = charaUl.children[i].children[0].children[0].children[0]
		.children[0] as HTMLImageElement;

	if (img && img.src) {
		return 'https:' + img.src;
	}

	throw new Error(`\nError al obtener "img"".`);
};

const validatetUrl = (charaUl: HTMLTableSectionElement, i: number): string => {
	const url = charaUl.children[i].children[1].children[0] as HTMLAnchorElement;

	if (url && url.textContent) {
		return domain + url.href;
	}

	throw new Error('\nError al obtener "Url" en la funcion "validateUrl".\n');
};
