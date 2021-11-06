import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as yup from 'yup';

export default function AddBusForm({ onAdd, onBusAddedSuccessfully }) {
	const emptyForm = {
		data: { registrationNum: '' },
		error: undefined
	};
	const [formState, setFormState] = useState(emptyForm);
	let schema = yup.object().shape({
		registrationNum: yup
			.string()
			.matches(
				/^[A-Z]{3}-[0-9]{3}$/,
				'Registration number needs to be in the format like ABC-123'
			)
			.required('Registration number is a required field')
	});

	return (
		<Form>
			<h3>Add a Bus</h3>
			<Form.Group as={Row} className='justify-content-center mb-3' controlId='formBasicEmail'>
				<Form.Label column lg={4}>
					Registration #
				</Form.Label>
				<Col className='flex-grow-1'>
					<Form.Control
						type='text'
						placeholder='e.g. ABC-123'
						value={formState.data.registrationNum}
						onChange={(value) =>
							setFormState({
								...formState,
								data: { registrationNum: value.target.value }
							})
						}
					/>
				</Col>
			</Form.Group>
			<p className='text-danger'>{formState.error}</p>
			<Button
				onClick={async () => {
					try {
						const data = await schema.validate(formState.data);

						const res = onAdd(data);
						if (res) return setFormState({ ...formState, error: res });

						onBusAddedSuccessfully();
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
