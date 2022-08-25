import React, { useLayoutEffect } from 'react';

import { StyleSheet, View } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App';
import { Expense } from '../components/ExpensesOutput/ExpensesOutput';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
	addExpense,
	deleteExpense,
	updateExpense,
} from '../redux/reducers/expenses';
import { storeExpense } from '../util/http';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpenses'>;

const ManageExpenseScreen = ({ route, navigation }: Props) => {
	const expenseId = route.params?.expenseId;
	const state = useAppSelector((state) => state.expenses);
	const dispatch = useAppDispatch();

	const selectedExpense: Expense[] = state.expenses.filter(
		(expense) => expense.id === expenseId
	);

	const isEditing = !!expenseId;

	function deleteExpenseHandler() {
		dispatch(deleteExpense({ id: expenseId as string }));
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	async function confirmHandler(expenseData: Expense) {
		if (isEditing) {
			dispatch(updateExpense({ ...expenseData, id: expenseId }));
		} else {
			const expenseId = await storeExpense(expenseData);
			dispatch(addExpense({ ...expenseData, id: expenseId }));
		}
		navigation.goBack();
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit expense' : 'Add expense',
		});
	}, [isEditing]);

	return (
		<View style={styles.container}>
			<ExpenseForm
				onCancel={cancelHandler}
				onSubmit={confirmHandler}
				submitButtonLabel={isEditing ? 'Update' : 'Add'}
				defaultValues={isEditing ? selectedExpense : undefined}
			/>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon='trash'
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
};

export default ManageExpenseScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center',
	},
});
