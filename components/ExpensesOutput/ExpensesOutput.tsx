import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

export interface Expense {
	id: string;
	date: string;
	description: string;
	amount: number;
}

/* const DUMMY_EXPENSES: Expense[] = DUMMY_DATA.map((data) => {
	return new Expense({
		id: data.id,
		date: new Date(data.date).toISOString(),
		description: data.description,
		amount: data.price,
	});
});
 */
interface ExpensesOutputProps {
	expenses: Expense[];
	expensesPeriod: string;
	fallbackText: string;
}

const ExpensesOutput = ({
	expenses,
	expensesPeriod,
	fallbackText,
}: ExpensesOutputProps) => {
	let content = <Text style={styles.infoText}>{fallbackText}</Text>;

	if (expenses.length > 0) {
		content = <ExpensesList expenses={expenses} />;
	}
	return (
		<View style={styles.rootContainer}>
			<ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
			{content}
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
	infoText: {
		color: '#FFF',
		fontSize: 16,
		textAlign: 'center',
		marginTop: 32,
	},
});
