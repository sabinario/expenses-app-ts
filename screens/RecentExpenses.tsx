import React, { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import { StyleSheet } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setExpenses } from '../redux/reducers/expenses';
import { getDateMinusDays, sortDate } from '../util/date';
import { fetchExpenses } from '../util/http';

const RecentExpensesScreen = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | AxiosError>();
	const state = useAppSelector((state) => state.expenses);
	const dispatch = useAppDispatch();

	useEffect(() => {
		async function getExpenses() {
			setIsLoading(true);
			try {
				const res = await fetchExpenses();
				dispatch(setExpenses(res));
			} catch (error) {
				const errors = error as Error | AxiosError;
				setError(errors);
			}
			setIsLoading(false);
		}
		getExpenses();
	}, []);

	const recentExpenses = state.expenses
		.filter((expense) => {
			const today = new Date();
			const date7DaysAgo = getDateMinusDays(today, 7);

			return new Date(expense.date) > date7DaysAgo;
		})
		.sort(sortDate);

	if (error && !isLoading) {
		return <ErrorOverlay message={error.message} />;
	}

	if (isLoading) {
		return <LoadingOverlay />;
	}

	return (
		<ExpensesOutput
			expensesPeriod='Last 7 days'
			expenses={recentExpenses}
			fallbackText='No expenses in the last 7 days'
		/>
	);
};

export default RecentExpensesScreen;
