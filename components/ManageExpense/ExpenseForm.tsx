import 'react-native-get-random-values';

import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import { Expense } from '../ExpensesOutput/ExpensesOutput';
import Button from '../UI/Button';
import Input from './Input';

interface FormProps {
	onCancel: () => void;
	onSubmit: (expenseData: Expense) => void;
	submitButtonLabel: string;
	defaultValues?: Expense[];
}

const ExpenseForm = ({
	onCancel,
	onSubmit,
	submitButtonLabel,
	defaultValues,
}: FormProps) => {
	const [inputs, setInputs] = useState({
		amount: {
			value: defaultValues ? defaultValues[0].amount.toString() : '',
			isValid: true,
		},
		date: {
			value: defaultValues ? defaultValues[0].date : '',
			isValid: true,
		},
		description: {
			value: defaultValues ? defaultValues[0].description : '',
			isValid: true,
		},
	});

	function inputHandler(inputName: string, text: string) {
		setInputs((currentInputs) => ({
			...currentInputs,
			[inputName]: {
				value: text,
				isValid: true,
			},
		}));
	}

	function submitHandler() {
		const expenseData = {
			amount: parseFloat(inputs.amount.value),
			date: new Date(inputs.date.value).toJSON(),
			description: inputs.description.value,
		};

		const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
		const dateIsValid =
			new Date(expenseData.date).toString() !== 'Invalid Date';
		const descriptionIsValid = expenseData.description.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			// Alert.alert('Invalid input, check your input values');
			setInputs((currentInputs) => {
				return {
					amount: { value: currentInputs.amount.value, isValid: amountIsValid },
					date: { value: currentInputs.date.value, isValid: dateIsValid },
					description: {
						value: currentInputs.description.value,
						isValid: descriptionIsValid,
					},
				};
			});
			return;
		}
		onSubmit(expenseData);
	}

	const formIsInvalid =
		!inputs.amount.isValid ||
		!inputs.date.isValid ||
		!inputs.description.isValid;

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your expense</Text>
			<View style={styles.inputsRow}>
				<Input
					label='Amount'
					invalid={!inputs.amount.isValid}
					style={styles.rowInput}
					textInputProps={{
						value: inputs.amount.value || '',
						keyboardType: 'decimal-pad',
						onChangeText: inputHandler.bind(this, 'amount'),
					}}
				/>
				<Input
					label='Date'
					invalid={!inputs.date.isValid}
					style={styles.rowInput}
					textInputProps={{
						value: inputs.date.value || '',
						placeholder: 'MM/DD/YYYY',
						maxLength: 10,
						onChangeText: inputHandler.bind(this, 'date'),
					}}
				/>
			</View>
			<Input
				label='Description'
				invalid={!inputs.description.isValid}
				textInputProps={{
					value: inputs.description.value || '',
					multiline: true,
					autoCapitalize: 'none',
					onChangeText: inputHandler.bind(this, 'description'),
				}}
			/>
			{formIsInvalid && (
				<Text style={styles.errorText}>Please, check your inputs</Text>
			)}
			<View style={styles.buttons}>
				<Button mode={'flat'} onPress={onCancel} style={styles.button}>
					Cancel
				</Button>
				<Button onPress={submitHandler} style={styles.button}>
					{submitButtonLabel}
				</Button>
			</View>
		</View>
	);
};

export default ExpenseForm;

const styles = StyleSheet.create({
	form: {
		marginTop: 10,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#FFF',
		marginVertical: 24,
		textAlign: 'center',
	},
	inputsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	rowInput: {
		flex: 1,
	},
	errorText: {
		textAlign: 'center',
		color: GlobalStyles.colors.error500,
		margin: 8,
	},
	buttons: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
});
