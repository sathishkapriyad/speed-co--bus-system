import React from 'react';
import { Button, Table } from 'react-bootstrap';

export default function RoutesTable({ routes, onRemove }) {
	return (
		<Table striped bordered hover>
			<thead className='text-center'>
				<tr>
					<th>#</th>
					<th className='text-start'>Code</th>
					<th className='text-start'>Stops</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{routes.map((route, index) => (
					<tr key={route.id}>
						<td>{index + 1}</td>
						<td className='text-start flex-grow-1'>{route.name}</td>
						<td className='text-start flex-grow-1'>
							{route.stops.map((stop) => (
								<p key={stop.id}>{stop.code}</p>
							))}
						</td>
						<td>
							<Button variant='danger' size='sm' onClick={() => onRemove(route.id)}>
								Remove
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
