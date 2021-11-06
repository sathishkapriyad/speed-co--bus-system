import React, { useRef } from 'react';
import { Container } from 'react-bootstrap';
import CollapsableForm from '../CollapsableForm';
import SectionHeading from '../SectionHeading';
import AddStopForm from '../forms/AddStopForm';
import StopsTable from '../tables/StopsTable';

export default function StopsSection({ stops, onAdd, onRemove }) {
	const isListEmpty = stops && stops.length === 0;
	const collapsableRef = useRef();

	return (
		<Container className='text-center'>
			<SectionHeading text='Stops' />
			{isListEmpty && <p>No stops added yet!</p>}
			{!isListEmpty && <StopsTable stops={stops} onRemove={onRemove} />}

			<CollapsableForm ref={collapsableRef} buttonText='Add Stop'>
				<AddStopForm
					onAdd={onAdd}
					onStopAddedSuccessfully={() => {
						collapsableRef.current.expand();
					}}
				/>
			</CollapsableForm>
		</Container>
	);
}
