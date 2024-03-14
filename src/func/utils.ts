export const domain = 'https://bluearchive.wiki/';
export const charaDomain = (charaName: string) => domain + charaName;

export function searchCharaNamesDifferences(
	mainArray: string[],
	secondaryArray: string[],
): string[] {
	return mainArray.filter(
		(main) => !secondaryArray.some((second) => main === second),
	);
}
