import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as yup from 'yup';

export default function AddStopForm({ onAdd, onStopAddedSuccessfully }) {
	const emptyForm = {
		data: { code: '' },
		error: undefined
	};
	const [formState, setFormState] = useState(emptyForm);
	let schema = yup.object().shape({
		code: yup
			.string()
			.matches(/^[A-Z][0-9]+$/, 'Code needs to be in the format like A1 or Q42')
			.required('Code is a required field')
	});

	return (
		<Form>
			<h3>Add a Stop</h3>
			<Form.Group as={Row} className='justify-content-center mb-3' controlId='formBasicEmail'>
				<Form.Label column lg={4}>
					Code
				</Form.Label>
				<Col className='flex-grow-1'>
					<Form.Control
						type='text'
						placeholder='e.g. A12'
						value={formState.data.code}
						onChange={(value) =>
							setFormState({
								...formState,
								data: { code: value.target.value }
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

						const error = onAdd(data);
						if (error) return setFormState({ ...formState, error });

						onStopAddedSuccessfully();
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
