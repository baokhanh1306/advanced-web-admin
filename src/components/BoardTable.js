import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip,
} from '@material-ui/core';
import { LocalSee, Message } from '@material-ui/icons';
import React from 'react';

const BoardTable = ({ data, handleConversationOpen }) => {
	if (!data || data.length === 0) return null;
	return (
		<Table size="small">
			<TableHead>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell>PlayerX</TableCell>
					<TableCell>PlayerO</TableCell>
					<TableCell>Winner</TableCell>
					<TableCell>Conversation</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((board, index) => (
					<TableRow key={index}>
						<TableCell>{board.name}</TableCell>
						<TableCell>{board.playerX?.username}</TableCell>
						<TableCell>{board.playerO?.username}</TableCell>
						<TableCell>{board.winner === -1 ? board.playerX?.username : board.playerO?.username}</TableCell>
						<TableCell>
						<Tooltip title="See Chat">
									<IconButton
										aria-label="Conversation"
										onClick={() => handleConversationOpen(board.conversation)}
									>
										<Message />
									</IconButton>
								</Tooltip>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default BoardTable;
