import React from 'react';
import { Button, Table } from 'react-bootstrap';

export default function LinesTable({ lines, onRemove }) {
	return (
		<Table striped bordered hover>
			<thead className='text-center'>
				<tr>
					<th>#</th>
					<th className='text-start'>Name</th>
					<th className='text-start'>Routes</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{lines.map((line, index) => (
					<tr key={line.id}>
						<td>{index + 1}</td>
						<td className='text-start flex-grow-1'>{line.name}</td>
						<td className='text-start flex-grow-1'>
							{line.routes.map((route) => (
								<p key={route.id}>{route.name}</p>
							))}
						</td>
						<td>
							<Button variant='danger' size='sm' onClick={() => onRemove(line.id)}>
								Remove
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
