import React, { useRef } from 'react';
import { Container } from 'react-bootstrap';
import CollapsableForm from '../CollapsableForm';
import SectionHeading from '../SectionHeading';
import AddLineForm from '../forms/AddLineForm';
import LinesTable from '../tables/LinesTable';

export default function LinesSection({ lines, routes, onAdd, onRemove }) {
	const isListEmpty = lines && lines.length === 0;
	const collapsableRef = useRef();

	return (
		<Container className='text-center'>
			<SectionHeading text='Lines' />
			{isListEmpty && <p>No lines added yet!</p>}
			{!isListEmpty && <LinesTable lines={lines} onRemove={onRemove} />}

			<CollapsableForm ref={collapsableRef} buttonText='Add Line'>
				<AddLineForm
					routes={routes}
					onAdd={onAdd}
					onLineAddedSuccessfully={() => {
						collapsableRef.current.expand();
					}}
				/>
			</CollapsableForm>
		</Container>
	);
}
