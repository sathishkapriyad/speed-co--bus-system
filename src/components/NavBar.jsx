import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export default function NavBar() {
	return (
		<Navbar bg='dark' variant='dark'>
			<Container>
				<Navbar.Brand href='#home'>
					<Navbar.Brand>SpeedCo Bus System</Navbar.Brand>
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
}
