import { apiBaseUrl } from '@/constants/configs';
import type { User } from './types';

export const getUsers = async () => {
	const res = await fetch(apiBaseUrl + 'users');
	const users = await res.json();
	return users as User[];
};
