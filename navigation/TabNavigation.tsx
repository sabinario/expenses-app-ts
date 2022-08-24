import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import AllExpensesScreen from '../screens/AllExpenses';
import RecentExpensesScreen from '../screens/RecentExpenses';

const BottomTabs = createBottomTabNavigator();

const TabNavigation = () => {
	return (
		<BottomTabs.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: {
					backgroundColor: GlobalStyles.colors.primary500,
				},
				headerTintColor: '#FFF',
				tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
				headerRight: ({ tintColor }) => {
					return (
						<IconButton
							color={tintColor as string}
							size={24}
							icon='add-circle'
							onPress={() => {
								navigation.navigate('ManageExpenses');
							}}
						/>
					);
				},
			})}
		>
			<BottomTabs.Screen
				name='RecentExpenses'
				component={RecentExpensesScreen}
				options={{
					title: 'Recent Expences',
					tabBarLabel: 'Recent Expenses',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='hourglass' color={color} size={size} />
					),
				}}
			/>
			<BottomTabs.Screen
				name='AllExpenses'
				component={AllExpensesScreen}
				options={{
					title: 'All Expenses',
					tabBarLabel: 'All Expenses',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='calendar' color={color} size={size} />
					),
				}}
			/>
		</BottomTabs.Navigator>
	);
};

export default TabNavigation;
