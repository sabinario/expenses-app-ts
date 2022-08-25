import axios from 'axios';

import { Expense } from '../components/ExpensesOutput/ExpensesOutput';

const API_URL =
	'https://react-native-practice-422e5-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData: Expense) {
	const response = await axios.post(`${API_URL}/expenses.json`, expenseData);
	const id = response.data.name;
	return id;
}

export async function fetchExpenses() {
	const { data } = await axios.get(`${API_URL}/expenses.json`);

	const expenses: Expense[] = [];

	for (const key in data) {
		const expenseObj: Expense = {
			id: key,
			amount: data[key].amount,
			date: data[key].date,
			description: data[key].description,
		};
		expenses.push(expenseObj);
	}

	return expenses;
}

export function updateExpenseRemote(id: string, expenseData: Expense) {
	console.log('expenseData: ', expenseData);
	return axios.put(`${API_URL}/expenses/${id}.json`, expenseData);
}

export async function deleteExpenseRemote(id: string) {
	console.log('id: ', id);
	return axios.delete(`${API_URL}/expenses/${id}.json`);
}
