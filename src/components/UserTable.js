import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@material-ui/core';
import React from 'react';

const UserTable = ({ data }) => {
	if (!data) return null;
	return (
		<Table size="small">
			<TableHead>
				<TableRow>
					<TableCell>Username</TableCell>
					<TableCell>Email</TableCell>
					<TableCell>Games</TableCell>
					<TableCell>Cups</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((user, index) => (
					<TableRow key={index}>
						<TableCell>{user.username}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{user.games}</TableCell>
						<TableCell>{user.cups}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default UserTable;
