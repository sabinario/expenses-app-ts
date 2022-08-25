import React from 'react';

import { StyleSheet } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useAppSelector } from '../hooks/reduxHooks';
import { getDateMinusDays } from '../util/date';

const RecentExpensesScreen = () => {
	const state = useAppSelector((state) => state.expenses);

	const recentExpenses = state.expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);

		return new Date(expense.date) > date7DaysAgo;
	});

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
