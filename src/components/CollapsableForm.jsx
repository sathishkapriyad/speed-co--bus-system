import React, { useImperativeHandle, useRef, useState } from 'react';
import { Accordion, Button, Card, CloseButton, useAccordionButton } from 'react-bootstrap';

const CollapsableForm = React.forwardRef(({ buttonText, children }, ref) => {
	const [expanded, setExpanded] = useState(false);
	const btnRef = useRef();
	useImperativeHandle(ref, () => ({
		expand: () => btnRef.current.click()
	}));

	return (
		<Accordion flush>
			<Accordion.Collapse eventKey='0'>
				<Card className='p-3'>
					<CloseButton
						className='align-self-end'
						onClick={() => btnRef.current.click()}
					/>
					{children}
				</Card>
			</Accordion.Collapse>
			<ToggleButton
				buttonRef={btnRef}
				text={buttonText}
				eventKey='0'
				expanded={expanded}
				toggle={() => setExpanded(!expanded)}
			/>
		</Accordion>
	);
});

const ToggleButton = React.forwardRef(({ buttonRef, text, eventKey, expanded, toggle }, ref) => {
	const decoratedOnClick = useAccordionButton(eventKey, toggle);

	return (
		<Button
			ref={buttonRef}
			className={`${expanded ? 'invisible' : ''}`}
			onClick={decoratedOnClick}>
			{text}
		</Button>
	);
});

export default CollapsableForm;
