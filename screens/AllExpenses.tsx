import React from 'react';

import { StyleSheet } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useAppSelector } from '../hooks/reduxHooks';

const AllExpensesScreen = () => {
	const state = useAppSelector((state) => state.expenses);

	return (
		<ExpensesOutput
			expensesPeriod='Total'
			expenses={state.expenses}
			fallbackText='No registered expenses found'
		/>
	);
};

export default AllExpensesScreen;

const styles = StyleSheet.create({});
