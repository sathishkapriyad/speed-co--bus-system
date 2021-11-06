import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BusesSection from './sections/BusesSection';
import LinesSection from './sections/LinesSection';
import RoutesSection from './sections/RoutesSection';
import SchedulesSection from './sections/SchedulesSection';
import StopsSection from './sections/StopsSection';

export default function Sections({ data, callbacks }) {
	return (
		<Container className='my-4'>
			<Row>
				<Col>
					<BusesSection
						buses={data.buses}
						onAdd={callbacks.onAddBus}
						onRemove={callbacks.onRemoveBus}
					/>
				</Col>
				<Col>
					<StopsSection
						stops={data.stops}
						onAdd={callbacks.onAddStop}
						onRemove={callbacks.onRemoveStop}
					/>
				</Col>
			</Row>
			<Row className='mt-4'>
				<Col>
					<RoutesSection
						routes={data.routes}
						stops={data.stops}
						onAdd={callbacks.onAddRoute}
						onRemove={callbacks.onRemoveRoute}
					/>
				</Col>
				<Col>
					<LinesSection
						lines={data.lines}
						routes={data.routes}
						onAdd={callbacks.onAddLine}
						onRemove={callbacks.onRemoveLine}
					/>
				</Col>
			</Row>
			<Row className='mt-4'>
				<SchedulesSection
					schedules={data.schedules}
					buses={data.buses}
					lines={data.lines}
					onAdd={callbacks.onAddSchedule}
					onRemove={callbacks.onRemoveSchedule}
				/>
			</Row>
		</Container>
	);
}
