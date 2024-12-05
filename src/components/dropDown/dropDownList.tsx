import {
	ChangeEventHandler,
	KeyboardEvent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import styles from './dropDown.module.scss';
import { DropDownListProps } from './types';

const DropDownList = <ItemId,>({
	items,
	selectedIds,
	onItemClick,
}: DropDownListProps<ItemId>) => {
	const [searchTerm, setSearchTerm] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleEnterOnItem = (e: KeyboardEvent<HTMLLIElement>, id: ItemId) => {
		if (e.key === 'Enter') onItemClick(id);
	};

	const filteredItems = useMemo(() => {
		const formattedText = searchTerm.trim().toLowerCase();
		return items.filter((item) =>
			item.title.toLowerCase().includes(formattedText)
		);
	}, [items, searchTerm]);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<div className={styles.list}>
			<input
				type='text'
				value={searchTerm}
				onChange={handleSearchChange}
				placeholder='Search...'
				ref={inputRef}
			/>
			{filteredItems.length > 0 ? (
				<ul>
					{filteredItems.map(({ id, title }) => (
						<li
							className={
								selectedIds.includes(id)
									? styles.checked
									: undefined
							}
							key={String(id)}
							onClick={() => onItemClick(id)}
							onKeyDown={(e) => handleEnterOnItem(e, id)}
							tabIndex={0}
						>
							{title}
						</li>
					))}
				</ul>
			) : (
				<div className={styles.notFound}>Not Found</div>
			)}
		</div>
	);
	s;
};

export default DropDownList;
