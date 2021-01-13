import {
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';
import React from 'react';

const ChatDialog = ({ children, open, handleClose }) => {
	const descriptionElementRef = React.useRef(null);
	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			scroll="paper"
			maxWidth="lg"
			fullWidth={true}
		>
			<DialogTitle>Conversation</DialogTitle>
			<DialogContent dividers={true}>
				<DialogContentText ref={descriptionElementRef} tabIndex={-1}>
					{children}
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};

export default ChatDialog;
