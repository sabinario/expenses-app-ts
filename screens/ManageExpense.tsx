import React, { useLayoutEffect, useState } from 'react';

import { AxiosError } from 'axios';
import { StyleSheet, View } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App';
import { Expense } from '../components/ExpensesOutput/ExpensesOutput';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
	addExpense,
	deleteExpense,
	updateExpense,
} from '../redux/reducers/expenses';
import {
	deleteExpenseRemote,
	storeExpense,
	updateExpenseRemote,
} from '../util/http';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpenses'>;

const ManageExpenseScreen = ({ route, navigation }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | AxiosError>();

	const expenseId = route.params?.expenseId;
	const state = useAppSelector((state) => state.expenses);
	const dispatch = useAppDispatch();

	const selectedExpense: Expense = state.expenses.filter(
		(expense) => expense.id === expenseId
	)[0];

	const isEditing = !!expenseId;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit expense' : 'Add expense',
		});
	}, [isEditing]);

	async function deleteExpenseHandler() {
		setIsLoading(true);
		try {
			await deleteExpenseRemote(expenseId as string);
			dispatch(deleteExpense({ id: expenseId as string }));
			navigation.goBack();
		} catch (err) {
			const errors = err as Error | AxiosError;
			setError(errors);
			setIsLoading(false);
		}
	}

	function cancelHandler() {
		navigation.goBack();
	}

	async function confirmHandler(expenseData: Expense) {
		setIsLoading(true);
		try {
			if (isEditing) {
				dispatch(updateExpense({ ...expenseData, id: expenseId }));
				await updateExpenseRemote(expenseId, expenseData);
			} else {
				const expenseId = await storeExpense(expenseData);
				dispatch(addExpense({ ...expenseData, id: expenseId }));
			}
			navigation.goBack();
		} catch (err) {
			const errors = err as Error | AxiosError;
			setError(errors);
			setIsLoading(false);
		}
	}

	if (error && !isLoading) {
		return <ErrorOverlay message={error.message} />;
	}

	if (isLoading) {
		return <LoadingOverlay />;
	}

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
