import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as yup from 'yup';

export default function AddLineForm({ routes, onAdd, onLineAddedSuccessfully }) {
	const emptyForm = {
		data: { name: '', routes: [] },
		error: undefined
	};
	const [formState, setFormState] = useState(emptyForm);
	let schema = yup.object().shape({
		name: yup
			.string()
			.matches(/^[A-Z][0-9]+$/, 'Name needs to be in the format like L1 or L22')
			.required('Name is a required field'),
		routes: yup.array().min(1, 'At least 1 route required')
	});
	const routeOptions = routes.map((route) => ({ key: JSON.stringify(route), label: route.name }));

	return (
		<Form>
			<h3>Add a Line</h3>
			<Form.Group className='justify-content-center mb-3' controlId='formBasicEmail'>
				<Row>
					<Form.Label column lg={4}>
						Name
					</Form.Label>
					<Col className='flex-grow-1'>
						<Form.Control
							type='text'
							placeholder='e.g. L1'
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
						Routes
					</Form.Label>
					<Col className='flex-grow-1'>
						<Form.Control
							as='select'
							multiple
							value={formState.data.routes}
							onChange={(e) => {
								const values = [].slice
									.call(e.target.selectedOptions)
									.map((item) => item.value);
								setFormState({
									...formState,
									data: { ...formState.data, routes: values }
								});
							}}>
							{routeOptions.map((option) => (
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
						const routes = formState.data.routes.map((route) => JSON.parse(route));
						const data = await schema.validate({ name: formState.data.name, routes });

						const error = onAdd(data);
						if (error) return setFormState({ ...formState, error: error });

						onLineAddedSuccessfully();
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
