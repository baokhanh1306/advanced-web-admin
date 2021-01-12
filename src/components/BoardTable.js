import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@material-ui/core';
import React from 'react';

const BoardTable = ({ data }) => {
	if (!data || data.length === 0) return null;
	return (
		<Table size="small">
			<TableHead>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell>PlayerX</TableCell>
					<TableCell>PlayerO</TableCell>
					<TableCell>Winner</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((board, index) => (
					<TableRow key={index}>
						<TableCell>{board.name}</TableCell>
						<TableCell>{board.playerX?.username}</TableCell>
						<TableCell>{board.playerO?.username}</TableCell>
						<TableCell>{board.winner === -1 ? board.playerX?.username : board.playerO?.username}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default BoardTable;
