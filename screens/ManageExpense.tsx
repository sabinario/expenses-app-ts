import React, { useLayoutEffect } from 'react';

import { StyleSheet, View } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpenses'>;

const ManageExpenseScreen = ({ route, navigation }: Props) => {
	const expenseId = route.params?.expenseId;
	const isEditing = !!expenseId;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit expense' : 'Add expense',
		});
	}, [isEditing]);

	function deleteExpenseHandler() {}

	return (
		<View style={styles.container}>
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
