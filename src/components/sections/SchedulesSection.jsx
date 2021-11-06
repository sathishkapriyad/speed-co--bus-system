import React, { useRef } from 'react';
import { Container } from 'react-bootstrap';
import CollapsableForm from '../CollapsableForm';
import SectionHeading from '../SectionHeading';
import AddScheduleForm from '../forms/AddScheduleForm';
import SchedulesTable from '../tables/SchedulesTable';

export default function SchedulesSection({ schedules, buses, lines, onAdd, onRemove }) {
	const isListEmpty = schedules && schedules.length === 0;
	const collapsableRef = useRef();

	return (
		<Container className='text-center'>
			<SectionHeading text='Schedules' />
			{isListEmpty && <p>No schedules added yet!</p>}
			{!isListEmpty && <SchedulesTable schedules={schedules} onRemove={onRemove} />}

			<CollapsableForm ref={collapsableRef} buttonText='Add Schedule'>
				<AddScheduleForm
					buses={buses}
					lines={lines}
					onAdd={onAdd}
					onScheduleAddedSuccessfully={() => {
						collapsableRef.current.expand();
					}}
				/>
			</CollapsableForm>
		</Container>
	);
}
