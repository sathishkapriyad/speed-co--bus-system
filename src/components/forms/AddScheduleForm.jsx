import React, { useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';
import * as yup from 'yup';
import { secondsToHhMm } from '../../utils/time-utils';

export default function AddScheduleForm({ buses, lines, onAdd, onScheduleAddedSuccessfully }) {
	const emptyForm = {
		data: { name: '', bus: undefined, line: undefined, time: '' },
		error: undefined
	};
	const [formState, setFormState] = useState(emptyForm);
	let schema = yup.object().shape({
		name: yup
			.string()
			.matches(/^[A-Z][0-9]+$/, 'Name needs to be in the format like S1 or S22')
			.required('Name is a required field'),
		bus: yup.object().required('Please select a bus'),
		line: yup.object().required('Please select a line'),
		time: yup.string().required('Please select a time')
	});

	return (
		<Form>
			<h3>Add a Schedule</h3>
			<Form.Group className='justify-content-center mb-3' controlId='formBasicEmail'>
				<Row>
					<Form.Label column lg={4}>
						Name
					</Form.Label>
					<Col className='flex-grow-1'>
						<Form.Control
							type='text'
							placeholder='e.g. S23'
							value={formState.data.name}
							onChange={(value) =>
								setFormState({
									...formState,
									data: { ...formState.data, name: value.target.value }
								})
							}
						/>
					</Col>
				</Row>
				<Row className='my-2'>
					<Form.Label column lg={4}>
						Bus
					</Form.Label>
					<Col className='text-start'>
						<DropdownButton
							title={
								formState.data.bus === undefined
									? 'Select a bus'
									: JSON.parse(formState.data.bus).registrationNum
							}
							onSelect={(e) =>
								setFormState({
									...formState,
									data: { ...formState.data, bus: e }
								})
							}>
							{buses.map((bus) => (
								<Dropdown.Item key={bus.id} eventKey={JSON.stringify(bus)}>
									{bus.registrationNum}
								</Dropdown.Item>
							))}
						</DropdownButton>
					</Col>
				</Row>
				<Row>
					<Form.Label column lg={4}>
						Line
					</Form.Label>
					<Col className='text-start'>
						<DropdownButton
							title={
								formState.data.line === undefined
									? 'Select a line'
									: JSON.parse(formState.data.line).name
							}
							onSelect={(e) =>
								setFormState({
									...formState,
									data: { ...formState.data, line: e }
								})
							}>
							{lines.map((line) => (
								<Dropdown.Item key={line.id} eventKey={JSON.stringify(line)}>
									{line.name}
								</Dropdown.Item>
							))}
						</DropdownButton>
					</Col>
					<Row className='my-2'>
						<Form.Label column lg={4}>
							Time
						</Form.Label>
						<Col className='flex-grow-1'>
							<TimePicker
								step={30}
								value={formState.data.time}
								onChange={(timeInSeconds) => {
									setFormState({
										...formState,
										data: { ...formState.data, time: timeInSeconds }
									});
								}}
							/>
						</Col>
					</Row>
				</Row>
			</Form.Group>
			<p className='text-danger'>{formState.error}</p>
			<Button
				onClick={async () => {
					try {
						console.log('formdata', formState);
						const bus = JSON.parse(formState.data.bus);
						const line = JSON.parse(formState.data.line);
						const time = secondsToHhMm(formState.data.time);

						const data = await schema.validate({
							name: formState.data.name,
							bus,
							line,
							time
						});

						const error = onAdd(data);
						if (error) return setFormState({ ...formState, error: error });

						onScheduleAddedSuccessfully();
						setFormState(emptyForm);
					} catch (e) {
						console.log(e);
						setFormState({ ...formState, error: e.errors[0] });
					}
				}}>
				Add
			</Button>
		</Form>
	);
}
