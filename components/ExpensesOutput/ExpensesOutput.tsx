import React from 'react';

import { StyleSheet, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import { DUMMY_DATA } from '../../dummy-data';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

export class Expense {
	constructor(
		public id: string,
		public date: Date,
		public description: string,
		public amount: number
	) {}
}

const DUMMY_EXPENSES: Expense[] = DUMMY_DATA.map((data) => {
	return new Expense(
		data.id,
		new Date(data.date),
		data.description,
		data.price
	);
});

interface ExpensesOutputProps {
	expenses?: Expense[];
	expensesPeriod: string;
}

const ExpensesOutput = ({ expenses, expensesPeriod }: ExpensesOutputProps) => {
	return (
		<View style={styles.rootContainer}>
			<ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
			<ExpensesList expenses={DUMMY_EXPENSES} />
		</View>
	);
};

export default ExpensesOutput;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 24,
		backgroundColor: GlobalStyles.colors.primary700,
	},
});
