import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GlobalStyles } from './constants/styles';
import TabNavigation from './navigation/TabNavigation';
import { store } from './redux/store';
import ManageExpenseScreen from './screens/ManageExpense';

export type RootStackParamList = {
	ExpensesOverview: undefined;
	ManageExpenses: { expenseId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<>
			<Provider store={store}>
				<StatusBar style='light' />
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
							headerTintColor: '#FFF',
						}}
					>
						<Stack.Screen
							name='ExpensesOverview'
							component={TabNavigation}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name='ManageExpenses'
							component={ManageExpenseScreen}
							options={{
								presentation: 'modal',
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</>
	);
}

const styles = StyleSheet.create({});
