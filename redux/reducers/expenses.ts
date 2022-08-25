import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Expense } from '../../components/ExpensesOutput/ExpensesOutput';
import { RootState } from '../store';

/* 
export interface PayloadProps {
	description: string;
	amount: number;
	date: string;
	id?: string;
} */

/* export interface UpdateProps {
	description?: string;
	amount?: number;
	date?: string;
	id: string;
} */

const initialState = {
	expenses: [] as Expense[],
};

export const expensesSlice = createSlice({
	name: 'expenses',
	initialState,
	reducers: {
		setExpenses: (state, action: PayloadAction<Expense[]>) => {
			function sortDate(a: Expense, b: Expense) {
				let dateA = new Date(a.date).getTime();
				let dateB = new Date(b.date).getTime();
				return dateA < dateB ? 1 : -1;
			}
			const cronological = action.payload.sort(sortDate);
			state.expenses = cronological;
		},
		addExpense: (state, action: PayloadAction<Expense>) => {
			const date = new Date(action.payload.date).toJSON();
			state.expenses.push({ ...action.payload, date });
		},
		deleteExpense: (state, action: PayloadAction<{ id: string }>) => {
			const expenseIndex = state.expenses.findIndex(
				(expense) => expense.id === action.payload.id
			);
			if (expenseIndex >= 0) {
				state.expenses.splice(expenseIndex, 1);
			}
		},
		updateExpense: (state, action: PayloadAction<Expense>) => {
			const expenseIndex = state.expenses.findIndex(
				(expense) => expense.id === action.payload.id
			);
			state.expenses[expenseIndex] = {
				...state.expenses[expenseIndex],
				...action.payload,
			};
		},
	},
});

export const { addExpense, deleteExpense, updateExpense, setExpenses } =
	expensesSlice.actions;

export const expenses = (state: RootState) => state.expenses;

export default expensesSlice.reducer;
