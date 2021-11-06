import React from 'react';
import { Button, Table } from 'react-bootstrap';

export default function BusesTable({ buses, onRemove }) {
	return (
		<Table striped bordered hover>
			<thead className='text-center'>
				<tr>
					<th>#</th>
					<th className='text-start'>Registration Number</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{buses.map((bus, index) => (
					<tr key={bus.id}>
						<td>{index + 1}</td>
						<td className='text-start flex-grow-1'>{bus.registrationNum}</td>
						<td>
							<Button variant='danger' size='sm' onClick={() => onRemove(bus.id)}>
								Remove
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
