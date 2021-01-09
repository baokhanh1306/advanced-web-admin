import { Dialog, DialogContentText, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import React from 'react';

const AlertDialog = ({ title, open, handleClose, children, handleAgree }) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleAgree} color="primary">
                    Agree
                </Button>
            </DialogActions>
		</Dialog>
	);
};

export default AlertDialog;
