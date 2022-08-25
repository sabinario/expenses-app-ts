import React, { useEffect } from 'react';

import { StyleSheet } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setExpenses } from '../redux/reducers/expenses';
import { getDateMinusDays, sortDate } from '../util/date';
import { fetchExpenses } from '../util/http';

const RecentExpensesScreen = () => {
	// const [expenses, setExpenses] = useState<Expense[]>([]);
	const state = useAppSelector((state) => state.expenses);
	const dispatch = useAppDispatch();

	useEffect(() => {
		async function getExpenses() {
			const res = await fetchExpenses();
			// setExpenses(res);
			dispatch(setExpenses(res));
		}
		getExpenses();
	}, []);

	const recentExpenses = state.expenses
		.filter((expense) => {
			const today = new Date();
			const date7DaysAgo = getDateMinusDays(today, 7);

			return new Date(expense.date) > date7DaysAgo;
		})
		.sort(sortDate);

	return (
		<ExpensesOutput
			expensesPeriod='Last 7 days'
			expenses={recentExpenses}
			fallbackText='No expenses in the last 7 days'
		/>
	);
};

export default RecentExpensesScreen;

const styles = StyleSheet.create({});
