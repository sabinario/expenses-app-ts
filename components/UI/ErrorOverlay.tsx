import React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

type Props = {
	message: string;
};
const ErrorOverlay = ({ message }: Props) => {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles.title]}>An error occurred</Text>
			<Image
				source={require('../../assets/500.png')}
				style={{ width: 300, height: 300, marginVertical: 24 }}
			/>
			<Text style={styles.text}>{message}</Text>
		</View>
	);
};

export default ErrorOverlay;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary700,
	},
	text: {
		color: '#FFF',
		textAlign: 'center',
		marginBottom: 12,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});
