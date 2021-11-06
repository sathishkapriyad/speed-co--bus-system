import React, { useRef } from 'react';
import { Container } from 'react-bootstrap';
import CollapsableForm from '../CollapsableForm';
import SectionHeading from '../SectionHeading';
import AddRouteForm from '../forms/AddRouteForm';
import RoutesTable from '../tables/RoutesTable';

export default function RoutesSection({ routes, stops, onAdd, onRemove }) {
	const isListEmpty = routes && routes.length === 0;
	const collapsableRef = useRef();

	return (
		<Container className='text-center'>
			<SectionHeading text='Routes' />
			{isListEmpty && <p>No routes added yet!</p>}
			{!isListEmpty && <RoutesTable routes={routes} onRemove={onRemove} />}

			<CollapsableForm ref={collapsableRef} buttonText='Add Route'>
				<AddRouteForm
					onAdd={onAdd}
					stops={stops}
					onRouteAddedSuccessfully={() => {
						collapsableRef.current.expand();
					}}
				/>
			</CollapsableForm>
		</Container>
	);
}
