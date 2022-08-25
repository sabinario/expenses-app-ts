import { Expense } from '../components/ExpensesOutput/ExpensesOutput';

export function getFormatterDate(date: Date) {
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function getDateMinusDays(date: Date, days: number) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
export function sortDate(a: Expense, b: Expense) {
	let dateA = new Date(a.date).getTime();
	let dateB = new Date(b.date).getTime();
	return dateA < dateB ? 1 : -1;
}
