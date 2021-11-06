import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as yup from 'yup';

export default function AddRouteForm({ stops, onAdd, onRouteAddedSuccessfully }) {
	const emptyForm = {
		data: { name: '', stops: [] },
		error: undefined
	};
	const [formState, setFormState] = useState(emptyForm);
	let schema = yup.object().shape({
		name: yup
			.string()
			.matches(/^[A-Z][0-9]{2}$/, 'Name needs to be in the format like M44 or H22')
			.required('Name is a required field'),
		stops: yup.array().min(2, 'At least 2 stops required')
	});
	const stopOptions = stops.map((stop) => ({ key: JSON.stringify(stop), label: stop.code }));

	return (
		<Form>
			<h3>Add a Route</h3>
			<Form.Group className='justify-content-center mb-3' controlId='formBasicEmail'>
				<Row>
					<Form.Label column lg={4}>
						Name
					</Form.Label>
					<Col className='flex-grow-1'>
						<Form.Control
							type='text'
							placeholder='e.g. M44'
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
						Stops
					</Form.Label>
					<Col className='flex-grow-1'>
						<Form.Control
							as='select'
							multiple
							value={formState.data.stops}
							onChange={(e) => {
								const values = [].slice
									.call(e.target.selectedOptions)
									.map((item) => item.value);
								setFormState({
									...formState,
									data: { ...formState.data, stops: values }
								});
							}}>
							{stopOptions.map((option) => (
								<option key={option.key} value={option.key}>
									{option.label}
								</option>
							))}
						</Form.Control>
					</Col>
				</Row>
			</Form.Group>
			<p className='text-danger'>{formState.error}</p>
			<Button
				onClick={async () => {
					try {
						const stops = formState.data.stops.map((stop) => JSON.parse(stop));
						const data = await schema.validate({ name: formState.data.name, stops });

						const error = onAdd(data);
						if (error) return setFormState({ ...formState, error: error });

						onRouteAddedSuccessfully();
						setFormState(emptyForm);
					} catch (e) {
						setFormState({ ...formState, error: e.errors[0] });
					}
				}}>
				Add
			</Button>
		</Form>
	);
}
