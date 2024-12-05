import { useMemo, useState } from 'react';
import DropDownList from './dropDownList';
import { DropDownProps } from './types';
import { useOpenController } from './useOpenController';
import styles from './dropDown.module.scss';

const DropDown = <ItemId,>({
	items,
	placeholder,
	onChange,
	onListInit,
}: DropDownProps<ItemId>) => {
	const [selectedItemsId, setSelectedItemsId] = useState<ItemId[]>([]);
	const { open, boxRef, loading, error } = useOpenController(onListInit);

	const selectedItemsView = useMemo(
		() =>
			selectedItemsId
				.map((id) => items.find((item) => item.id === id)?.title)
				.join(', '),
		[items, selectedItemsId]
	);

	const handleOptionClick = (id: ItemId) => {
		const selectedIds = selectedItemsId.includes(id)
			? selectedItemsId.filter((i) => i !== id)
			: [...selectedItemsId, id];
		setSelectedItemsId(selectedIds);
		onChange(selectedIds);
	};

	const handleReset = () => {
		setSelectedItemsId([]);
		onChange([]);
	};

	return (
		<div className={styles.container} ref={boxRef}>
			<div className={styles.input} tabIndex={0} data-open='toggler'>
				{error ? (
					<>Fetch Error</>
				) : loading ? (
					<>Loading...</>
				) : selectedItemsView ? (
					<>
						{selectedItemsView}
						<button
							className={styles.clear}
							onClick={handleReset}
							data-open='none'
						>
							❌
						</button>
					</>
				) : (
					<span className={styles.placeholder}>{placeholder}</span>
				)}
			</div>
			{open && (
				<DropDownList
					items={items}
					selectedIds={selectedItemsId}
					onItemClick={handleOptionClick}
				/>
			)}
		</div>
	);
};

export default DropDown;
