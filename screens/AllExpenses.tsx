import React from 'react';

import { StyleSheet } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

const AllExpensesScreen = () => {
	return <ExpensesOutput expensesPeriod='Total' />;
};

export default AllExpensesScreen;

const styles = StyleSheet.create({});
