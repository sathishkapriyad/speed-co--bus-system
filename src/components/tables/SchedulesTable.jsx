import React from 'react';
import { Button, Table } from 'react-bootstrap';

export default function SchedulesTable({ schedules, onRemove }) {
	return (
		<Table striped bordered hover>
			<thead className='text-center'>
				<tr>
					<th>#</th>
					<th className='text-start'>Name</th>
					<th className='text-start'>Bus</th>
					<th className='text-start'>Line</th>
					<th className='text-start'>Time</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{schedules.map(({ id, name, line, bus, time }, index) => (
					<tr key={id}>
						<td>{index + 1}</td>
						<td className='text-start flex-grow-1'>{name}</td>
						<td className='text-start flex-grow-1'>{bus.registrationNum}</td>
						<td className='text-start flex-grow-1'>{line.name}</td>
						<td className='text-start flex-grow-1'>{time}</td>
						<td>
							<Button variant='danger' size='sm' onClick={() => onRemove(id)}>
								Remove
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
