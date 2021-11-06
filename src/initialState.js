const initialState = {
	buses: [
		{ id: 1, registrationNum: 'ABC-123' },
		{ id: 2, registrationNum: 'XYZ-456' }
	],
	stops: [
		{ id: 1, code: 'A1' },
		{ id: 2, code: 'B3' },
		{ id: 3, code: 'Q42' }
	],
	routes: [
		{
			id: 1,
			name: 'M44',
			stops: [
				{ id: 1, code: 'A1' },
				{ id: 3, code: 'Q42' }
			]
		},
		{
			id: 2,
			name: 'H22',
			stops: [
				{ id: 2, code: 'B3' },
				{ id: 3, code: 'Q42' }
			]
		}
	],
	lines: [
		{
			id: 1,
			name: 'L1',
			routes: [
				{ id: 1, name: 'M44' },
				{ id: 2, name: 'H22' }
			]
		},
		{
			id: 2,
			name: 'L2',
			routes: [{ id: 1, name: 'M44' }]
		}
	],
	schedules: [
		{
			id: 1,
			name: 'S1',
			bus: { id: 1, registrationNum: 'ABC-123' },
			line: { id: 1, name: 'L1' },
			time: '10:00 AM'
		},
		{
			id: 2,
			name: 'S12',
			bus: { id: 2, registrationNum: 'XYZ-456' },
			line: { id: 2, name: 'L2' },
			time: '11:30 PM'
		}
	],
	lastBusId: 2,
	lastStopId: 3,
	lastRouteId: 2,
	lastLineId: 3,
	lastScheduleId: 2
};

export default initialState;
