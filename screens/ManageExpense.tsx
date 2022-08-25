import 'react-native-get-random-values';

import React, { useLayoutEffect } from 'react';

import { nanoid } from 'nanoid';
import { StyleSheet, View } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
	addExpense,
	deleteExpense,
	updateExpense,
} from '../redux/reducers/expenses';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpenses'>;

const ManageExpenseScreen = ({ route, navigation }: Props) => {
	const state = useAppSelector((state) => state.expenses);
	const dispatch = useAppDispatch();

	const expenseId = route.params?.expenseId;
	const isEditing = !!expenseId;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit expense' : 'Add expense',
		});
	}, [isEditing]);

	function deleteExpenseHandler() {
		dispatch(deleteExpense({ id: expenseId }));
		navigation.goBack();
	}
	function cancelHandler() {
		navigation.goBack();
	}
	function confirmHandler() {
		if (isEditing) {
			dispatch(updateExpense({ id: expenseId, description: 'TESTING' }));
		} else {
			const date = new Date().toISOString();
			dispatch(
				addExpense({
					description: 'A book',
					amount: 99.99,
					date,
					id: nanoid(6),
				})
			);
		}
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<View style={styles.buttons}>
				<Button mode={'flat'} onPress={cancelHandler} style={styles.button}>
					Cancel
				</Button>
				<Button onPress={confirmHandler} style={styles.button}>
					{isEditing ? 'Update' : 'Add'}
				</Button>
			</View>
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
	buttons: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center',
	},
});
