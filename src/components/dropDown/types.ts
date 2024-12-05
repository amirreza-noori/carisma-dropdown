import { ReactNode } from 'react';

export type DropDownItem<T> = {
	id: T;
	title: string;
};

export type DropDownListProps<T> = {
	items: DropDownItem<T>[];
	selectedIds: T[];
	onItemClick: (id: T) => void;
};

export type DropDownProps<T> = {
	placeholder: ReactNode;
	onListInit?: () => void | Promise<void>;
	items: DropDownItem<T>[];
	onChange: (ids: T[]) => void | Promise<void>;
};
