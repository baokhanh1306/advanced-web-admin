import {
	IconButton,
	InputBase,
	makeStyles,
	MenuItem,
	Paper,
	Select,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400,
		flex: 1,
		marginBottom: '20px',
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	select: {
		margin: '0 10px',
	},
}));

const SearchInput = ({ handleSearch }) => {
	const classes = useStyles();
	const [filter, setFilter] = React.useState('email');
	const [query, setQuery] = React.useState('');

	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};
	const handleChangeFilter = (e) => {
		setFilter(e.target.value);
    };
	return (
		<Paper component="form" className={classes.root} elevation={3} onSubmit={(e) => handleSearch(e,filter,query)}>
			<InputBase
				className={classes.input}
				placeholder="Search user"
				inputProps={{ 'aria-label': 'search user' }}
                onChange={handleInputChange}
                value={query}
			/>
			<IconButton
				className={classes.iconButton}
                aria-label="search"
                onClick={(e) => handleSearch(e,filter,query)}
			>
				<Search />
			</IconButton>
			<Select
				className={classes.select}
				value={filter}
				onChange={handleChangeFilter}
			>
				<MenuItem value="email">Email</MenuItem>
				<MenuItem value="name">Name</MenuItem>
			</Select>
		</Paper>
	);
};

export default SearchInput;
