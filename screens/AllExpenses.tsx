import React from 'react';

import { StyleSheet } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useAppSelector } from '../hooks/reduxHooks';
import { sortDate } from '../util/date';

const AllExpensesScreen = () => {
	const state = useAppSelector((state) => state.expenses);

	const allExpenses = state.expenses.slice().sort(sortDate);

	return (
		<ExpensesOutput
			expensesPeriod='Total'
			expenses={allExpenses}
			fallbackText='No registered expenses found'
		/>
	);
};

export default AllExpensesScreen;

const styles = StyleSheet.create({});
