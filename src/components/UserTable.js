import {
	IconButton,
	InputBase,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip,
} from '@material-ui/core';
import { Delete, Redo } from '@material-ui/icons';
import React from 'react';

const UserTable = ({ data, handleModalOpen, handleUnBanModalOpen }) => {
	if (!data) return null;
	return (
		<Table size="small">
			<TableHead>
				<TableRow>
					<TableCell>Username</TableCell>
					<TableCell>Email</TableCell>
					<TableCell align="center">Games</TableCell>
					<TableCell align="center">Cups</TableCell>
					<TableCell align="center">Edit</TableCell>
					<TableCell align="center">Status</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((user, index) => (
					<TableRow key={index}>
						<TableCell>{user.username}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell align="center">{user.games}</TableCell>
						<TableCell align="center">{user.cups}</TableCell>
						<TableCell align="center">
							{user.banned ? (
								<Tooltip title="Unban">
									<IconButton
										aria-label="Unban"
										onClick={() => handleUnBanModalOpen(user._id)}
									>
										<Redo />
									</IconButton>
								</Tooltip>
							) : (
								<Tooltip title="Ban">
									<IconButton
										aria-label="Ban"
										onClick={() => handleModalOpen(user._id)}
									>
										<Delete />
									</IconButton>
								</Tooltip>
							)}
						</TableCell>
						<TableCell align="center">{user.banned && 'Banned'}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default UserTable;
