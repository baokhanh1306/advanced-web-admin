import React from 'react';
import {
	Grid,
	CardActionArea,
	Card,
	CardContent,
	Typography,
	Hidden,
	CardMedia,
	makeStyles,
	Avatar,
} from '@material-ui/core';
const useStyles = makeStyles({
	card: {
		display: 'flex',
		padding: '10px',
	},
	cardDetails: {
		flex: 1,
	},
	cardMedia: {
		width: 200,
		height: 'auto',
	},
});
const UserDetail = ({
	user: { avatar, email, username, cups, games, gamesWon },
}) => {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<Avatar className={classes.cardMedia} src={avatar} />
			<div className={classes.cardDetails}>
				<CardContent>
					<Typography component="h2" variant="h5">
						Name: {username}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						Email: {email}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						Cups: {cups}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						Games: {games}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						GamesWon: {gamesWon}
					</Typography>
				</CardContent>
			</div>
		</Card>
	);
};

export default UserDetail;
