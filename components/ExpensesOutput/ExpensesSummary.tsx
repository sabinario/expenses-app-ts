import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import { Expense } from './ExpensesOutput';

interface ExpensesSummaryProps {
	periodName: string;
	expenses: Expense[];
}

const ExpensesSummary = ({ periodName, expenses }: ExpensesSummaryProps) => {
	const expensesSum: number = expenses.reduce((sum, expense) => {
		return sum + expense.amount;
	}, 0);

	return (
		<View style={styles.rootContainer}>
			<Text style={styles.timePeriod}>{periodName}</Text>
			<Text style={styles.expensesSum}>${expensesSum.toFixed(2)}</Text>
		</View>
	);
};

export default ExpensesSummary;

const styles = StyleSheet.create({
	rootContainer: {
		padding: 8,
		backgroundColor: GlobalStyles.colors.primary50,
		borderRadius: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	timePeriod: {
		fontSize: 12,
		color: GlobalStyles.colors.primary400,
	},
	expensesSum: {
		fontSize: 16,
		fontWeight: 'bold',
		color: GlobalStyles.colors.primary500,
	},
});
