import React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

interface IconButtonProps {
	icon: keyof typeof Ionicons.glyphMap;
	color: string;
	size: number;
	onPress: () => void;
}

const IconButton = ({ icon, color, size, onPress }: IconButtonProps) => {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => pressed && styles.pressed}
		>
			<View style={styles.buttonContainer}>
				<Ionicons name={icon} color={color} size={size} onPress={onPress} />
			</View>
		</Pressable>
	);
};

export default IconButton;

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 24,
		padding: 6,
		marginHorizontal: 8,
		marginVertical: 2,
	},
	pressed: {
		opacity: 0.75,
	},
});
