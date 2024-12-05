import { useEffect, useRef, useState } from 'react';

export const useOpenController = (
	initFunction?: () => void | Promise<void>
) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const isInitialOpen = useRef(true);
	const boxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const box = boxRef.current;

		// close list by clicking outside box
		const handleClickOutside = async (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!box?.contains(target)) {
				setOpen(false);
				return;
			}

			if (target.getAttribute('data-open') === 'none') return;

			// call initFunction if exist to fetch items list
			if (isInitialOpen.current) {
				if (initFunction) {
					setLoading(true);
					setError(false);
					isInitialOpen.current = false;
					try {
						await initFunction();
						setLoading(false);
					} catch (_) {
						setError(true);
						setLoading(false);
						isInitialOpen.current = true;
						box?.blur();
						return;
					}
				}
				isInitialOpen.current = false;
			}

			if (target.getAttribute('data-open') === 'toggler') {
				setOpen((open) => !open);
			} else {
				setOpen(true);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);

		// open list by click on box
		const handleFocus = async (e: FocusEvent) => {
			const target = e.target as HTMLElement;
			if (!box?.contains(target)) {
				setOpen(false);
				return;
			}
		};
		document.addEventListener('focusin', handleFocus);

		// close list by press ESC
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false);
			else if (e.key === 'Enter') setOpen(true);
		};
		box?.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('focusin', handleFocus);
			box?.removeEventListener('keydown', handleKeyDown);
		};
	}, [initFunction]);

	return { open, boxRef, loading, error };
};
