import {
	Avatar,
	Container,
	CssBaseline,
	TextField,
	Button,
	Box,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CopyRight } from '../components';
import { login } from '../store/auth';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Login() {
	const classes = useStyles();

	const { register, handleSubmit, errors } = useForm();
	const dispatch = useDispatch();

	const onSubmit = (data) => {
		dispatch(login(data));
	};

	const { errorMsg } = useSelector((state) => state.auth);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				{errorMsg && (
					<Typography component="h4" variant="h5" color="error">
						{errorMsg}
					</Typography>
				)}
				<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						inputRef={register({
							required: true,
							pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
						})}
					/>
					{errors.email?.type === 'required' && (
						<Typography variant="body1" color="error">
							Email is required
						</Typography>
					)}
					{errors.email?.type === 'pattern' && (
						<Typography variant="body1" color="error">
							Email is incorrect
						</Typography>
					)}
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						inputRef={register({
							required: true,
						})}
					/>
					{errors.password?.type === 'required' && (
						<Typography variant="body1" color="error">
							Password is required
						</Typography>
					)}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
				</form>
			</div>
			<Box mt={8}>
				<CopyRight />
			</Box>
		</Container>
	);
}
