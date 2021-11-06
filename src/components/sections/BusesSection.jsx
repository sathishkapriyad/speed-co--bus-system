import React, { useRef } from 'react';
import { Container } from 'react-bootstrap';
import CollapsableForm from '../CollapsableForm';
import SectionHeading from '../SectionHeading';
import AddBusForm from '../forms/AddBusForm';
import BusesTable from '../tables/BusesTable';

export default function BusesSection({ buses, onAdd, onRemove }) {
	const isListEmpty = buses && buses.length === 0;
	const collapsableRef = useRef();

	return (
		<Container className='text-center'>
			<SectionHeading text='Buses' />
			{isListEmpty && <p>No buses added yet!</p>}
			{!isListEmpty && <BusesTable buses={buses} onRemove={onRemove} />}

			<CollapsableForm ref={collapsableRef} buttonText='Add Bus'>
				<AddBusForm
					onAdd={onAdd}
					onBusAddedSuccessfully={() => {
						collapsableRef.current.expand();
					}}
				/>
			</CollapsableForm>
		</Container>
	);
}
