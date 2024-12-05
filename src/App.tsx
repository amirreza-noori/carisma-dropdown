import { useState } from 'react';
import { DropDown, type DropDownItem } from '@/components';
import { getUsers } from '@/api/users';

function App() {
	const [githubUsers, setGithubUsers] = useState<DropDownItem<number>[]>([]);

	return (
		<>
			List of Movies
			<DropDown
				items={[
					{ id: '1', title: 'Avatar' },
					{ id: '2', title: 'Avengers' },
					{ id: '3', title: 'Avatar' },
					{ id: '4', title: 'Titanic' },
					{ id: '5', title: 'Star Wars' },
					{ id: '6', title: 'Avengers' },
					{ id: '7', title: 'Spider-Man' },
					{ id: '8', title: 'Inside Out' },
					{ id: '9', title: 'Jurassic World' },
				]}
				onChange={(selectedIds) => {
					console.log('List of Movies', selectedIds);
				}}
				placeholder='Select Favorite Movies'
			/>
			<hr />
			List of Github Users
			<DropDown
				items={githubUsers}
				onChange={(selectedIds) => {
					console.log('Users Ids:', selectedIds);
				}}
				placeholder='Select Github Users'
				onListInit={async () => {
					const users = await getUsers();
					const items = users.map(({ fname, id }) => ({
						id,
						title: fname,
					}));
					setGithubUsers(items);
				}}
			/>
		</>
	);
}

export default App;
