import {
	AppBar,
	Box,
	Container,
	Grid,
	IconButton,
	makeStyles,
    Paper,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BoardTable, CopyRight, Title, UserTable } from '../components';
import { logout } from '../store/auth';
import { getUser } from '../store/user';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
        flexGrow: 1,
        color: 'white',
        fontSize: '24px',
        textDecoration: 'none',
	},
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
}));

const Detail = () => {
	const params = useParams();
	const classes = useStyles();
    
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);


	React.useEffect(() => {
		dispatch(getUser(params.id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Link className={classes.title} to="/dashboard">
						Dashboard
					</Link>
					<IconButton color="inherit" onClick={handleLogout}>
						<ExitToApp />
					</IconButton>
				</Toolbar>
			</AppBar>
			<main className={classes.content}>
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
							<Paper className={classes.paper}>
								<Title>User</Title>
                            {user&&<UserTable data={[user]} />}
							</Paper>
						</Grid>
						<Grid item xs={12} md={12} lg={12}>
							<Paper className={classes.paper}>
								<Title>History</Title>
                             <BoardTable data={user?.history} />
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
};

export default Detail;
