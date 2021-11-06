import React from 'react';
import { Button, Table } from 'react-bootstrap';

export default function StopsTable({ stops, onRemove }) {
	return (
		<Table striped bordered hover>
			<thead className='text-center'>
				<tr>
					<th>#</th>
					<th className='text-start'>Code</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{stops.map((stop, index) => (
					<tr key={stop.id}>
						<td>{index + 1}</td>
						<td className='text-start flex-grow-1'>{stop.code}</td>
						<td>
							<Button variant='danger' size='sm' onClick={() => onRemove(stop.id)}>
								Remove
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
