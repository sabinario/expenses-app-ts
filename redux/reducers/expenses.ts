import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Expense } from '../../components/ExpensesOutput/ExpensesOutput';
import { DUMMY_DATA } from '../../dummy-data';
import { RootState } from '../store';

interface PayloadProps {
	description: string;
	amount: number;
	date: string;
	id: string;
}

interface UpdateProps {
	description?: string;
	amount?: number;
	date?: string;
	id: string;
}

const initialState: { expenses: Expense[] } = {
	expenses: DUMMY_DATA.map((data) => {
		return {
			id: data.id,
			description: data.description,
			date: data.date,
			amount: data.price,
		};
	}),
};

export const expensesSlice = createSlice({
	name: 'expenses',
	initialState,
	reducers: {
		addExpense: (state, action: PayloadAction<PayloadProps>) => {
			const date = new Date(action.payload.date).toISOString();
			state.expenses.push({ ...action.payload, date });
		},
		deleteExpense: (state, action: PayloadAction<{ id: string }>) => {
			const expenseIndex = state.expenses.findIndex(
				(expense) => expense.id === action.payload.id
			);
			console.log('expenseIndex: ', expenseIndex);
			if (expenseIndex >= 0) {
				state.expenses.splice(expenseIndex, 1);
			}
		},
		updateExpense: (state, action: PayloadAction<UpdateProps>) => {
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

export const { addExpense, deleteExpense, updateExpense } =
	expensesSlice.actions;

export const expenses = (state: RootState) => state.expenses;

export default expensesSlice.reducer;
