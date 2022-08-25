import React from 'react';

import { FlatList } from 'react-native';

import ExpenseItem from './ExpenseItem';
import { Expense } from './ExpensesOutput';

interface ExpensesListProps {
	expenses: Expense[];
}

function renderExpenseItem(itemData: { item: Expense }) {
	return <ExpenseItem {...itemData.item} />;
}

const ExpensesList = ({ expenses }: ExpensesListProps) => {
	return (
		<FlatList
			data={expenses}
			renderItem={renderExpenseItem}
			keyExtractor={(item) => item.id as string}
		/>
	);
};

export default ExpensesList;
