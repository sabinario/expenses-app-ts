import React from 'react';

import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
} from 'react-native';

import { GlobalStyles } from '../../constants/styles';

interface ExtraInputProps {
	label: string;
	textInputProps: TextInputProps;
	invalid: boolean;
	style?: {};
}

const Input = ({ label, style, invalid, textInputProps }: ExtraInputProps) => {
	let inputStyles = [
		styles.input,
		textInputProps.multiline && styles.inputMultiline,
	];
	return (
		<View style={[styles.inputContainer, style]}>
			<Text style={[styles.label, invalid && styles.invalidLabel]}>
				{label}
			</Text>
			<TextInput
				style={[inputStyles, invalid && styles.invalidInput]}
				{...textInputProps}
			/>
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		marginHorizontal: 4,
		marginVertical: 8,
	},
	label: {
		fontSize: 12,
		color: GlobalStyles.colors.primary100,
		marginBottom: 6,
		marginHorizontal: 4,
	},
	input: {
		backgroundColor: GlobalStyles.colors.primary100,
		paddingHorizontal: 14,
		paddingVertical: 6,
		borderRadius: 6,
		fontSize: 18,
		color: GlobalStyles.colors.primary700,
	},
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
	invalidLabel: {
		color: GlobalStyles.colors.error500,
	},
	invalidInput: {
		backgroundColor: GlobalStyles.colors.error50,
	},
});
