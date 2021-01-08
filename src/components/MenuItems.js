import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import GameIcon from '@material-ui/icons/Games';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const MenuItems = ({ selectedMenu, handleUsersMenuClick, handleBoardsMenuClick }) => {
	return (
		<div>
			<ListItem button selected={selectedMenu === 'Users'} onClick={handleUsersMenuClick}>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Users" />
			</ListItem>
			<ListItem button selected={selectedMenu === 'Boards'} onClick={handleBoardsMenuClick}>
				<ListItemIcon>
					<GameIcon />
				</ListItemIcon>
				<ListItemText primary="Boards" />
			</ListItem>
		</div>
	);
};

export default MenuItems;
