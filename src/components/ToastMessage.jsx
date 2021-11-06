import React, { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function ToastMessage({ message, onClose }) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (message) setShow(true);
	}, [message]);

	return (
		<ToastContainer className='p-3' position='bottom-center'>
			<Toast
				className='text-center'
				delay={3000}
				show={show}
				autohide
				onClose={() => {
					onClose();
					setShow(false);
				}}>
				<Toast.Header closeButton={false}>
					<h5 className='flex-grow-1 text-danger'>Can not delete!</h5>
				</Toast.Header>
				<Toast.Body>{message}</Toast.Body>
			</Toast>
		</ToastContainer>
	);
}
