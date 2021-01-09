import { makeStyles } from '@material-ui/core/styles';
import { ExitToApp } from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import {
	AppBar,
	Box,
	CircularProgress,
	Container,
	CssBaseline,
	Divider,
	Drawer,
	Grid,
	IconButton,
	List,
	Paper,
	Toolbar,
	Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import {
	BoardTable,
	CopyRight,
	MenuItems,
	Title,
	UserTable,
	AlertDialog,
	SearchInput,
} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/auth';
import { deleteUser, getUsers, unBanUser } from '../store/users';
import { removeMenu, setSelectedMenu } from '../store/config';
import { getBoards } from '../store/boards';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'hidden',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
	progress: {
		margin: 'auto',
	},
}));

const renderData = (
	users,
	boards,
	selectedMenu,
	boardLoading,
	userLoading,
	classes,
	handleModalOpen,
	handleUnBanModalOpen
) => {
	if (boardLoading && selectedMenu === 'Boards')
		return <CircularProgress className={classes.progress} />;
	if (userLoading && selectedMenu === 'Users')
		return <CircularProgress className={classes.progress} />;
	return selectedMenu === 'Users' ? (
		<UserTable data={users} handleModalOpen={handleModalOpen} handleUnBanModalOpen={handleUnBanModalOpen} />
	) : (
		<BoardTable data={boards} />
	);
};

export default function Dashboard() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const [modalOpen, setModalOpen] = React.useState(false);
	const [userToDelete, setUserToDelete] = React.useState('');
	const [unBanModalOpen, setUnBanModalOpen] = React.useState(false);
	const [userToUnBan, setUserToUnBan] = React.useState('');
	const dispatch = useDispatch();
	const { users, loading: userLoading } = useSelector((state) => state.users);
	const { selectedMenu } = useSelector((state) => state.config);
	const { boards, loading: boardLoading } = useSelector(
		(state) => state.boards
	);

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};


	const handleLogout = () => {
		dispatch(logout());
	};


	const handleModalOpen = (id) => {
		setModalOpen(true);
		setUserToDelete(id);
	};
	const handleModalClose = () => {
		setModalOpen(false);
	};
	const handleDeleteUser = () => {
		setModalOpen(false);
		dispatch(deleteUser(userToDelete));
	};


	const handleUnBanModalOpen = (id) => {
		setUnBanModalOpen(true);
		setUserToUnBan(id);
	};
	const handleUnBanModalClose = () => {
		setUnBanModalOpen(false);
	};
	const handleUnBanUser = () => {
		setUnBanModalOpen(false);
		dispatch(unBanUser(userToUnBan));
	};

	const handleUsersMenuClick = (e) => {
		e.preventDefault();
		if (selectedMenu !== 'Users') {
			dispatch(setSelectedMenu('Users'));
		}
	};

	const handleBoardsMenuClick = (e) => {
		e.preventDefault();
		if (selectedMenu !== 'Boards') {
			dispatch(setSelectedMenu('Boards'));
		}
	};

	const handleSearch = (e,filter,query) => {
		e.preventDefault();
		dispatch(getUsers(filter,query));
	};

	React.useEffect(() => {
		dispatch(getUsers());
		dispatch(setSelectedMenu('Users'));

		return () => dispatch(removeMenu());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (selectedMenu === 'Users') {
			dispatch(getUsers());
		} else if (selectedMenu === 'Boards') {
			dispatch(getBoards());
		}
	}, [selectedMenu, dispatch]);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="absolute"
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						className={classes.title}
					>
						Dashboard
					</Typography>
					<IconButton color="inherit" onClick={handleLogout}>
						<ExitToApp />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<MenuItems
						selectedMenu={selectedMenu}
						handleBoardsMenuClick={handleBoardsMenuClick}
						handleUsersMenuClick={handleUsersMenuClick}
					/>
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={12} lg={12}>
							{selectedMenu === 'Users' && <SearchInput handleSearch={handleSearch}/>}
							<Paper className={classes.paper}>
								<Title>{selectedMenu}</Title>
								{renderData(
									users,
									boards,
									selectedMenu,
									boardLoading,
									userLoading,
									classes,
									handleModalOpen,
									handleUnBanModalOpen
								)}
								<AlertDialog
									title="Ban user"
									open={modalOpen}
									handleClose={handleModalClose}
									handleAgree={handleDeleteUser}
								>
									Do you want to ban this user?
								</AlertDialog>
								<AlertDialog
									title="Unban user"
									open={unBanModalOpen}
									handleClose={handleUnBanModalClose}
									handleAgree={handleUnBanUser}
								>
									Do you want to unban this user?
								</AlertDialog>
							</Paper>
						</Grid>
					</Grid>
					<Box pt={4}>
						<CopyRight />
					</Box>
				</Container>
			</main>
		</div>
	);
}
