export function getFormatterDate(date: Date) {
	return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
