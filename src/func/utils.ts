export const domain = 'https://bluearchive.wiki/';

export function searchDifferences(mainArray: any[], secondaryArray: any[]) {
	const diff = mainArray.filter(
		(main) =>
			!secondaryArray.some((second) => second.charaName === main.charaName),
	);
	return diff;
}
