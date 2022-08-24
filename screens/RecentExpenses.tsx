import React from 'react';

import { StyleSheet } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

const RecentExpensesScreen = () => {
	return <ExpensesOutput expensesPeriod='Last 7 days' />;
};

export default RecentExpensesScreen;

const styles = StyleSheet.create({});
