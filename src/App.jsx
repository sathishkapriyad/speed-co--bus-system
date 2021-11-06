import { useState } from 'react';
import NavBar from './components/NavBar';
import Sections from './components/Sections';
import ToastMessage from './components/ToastMessage';
import initialState from './initialState';

export default function App() {
	const [state, setState] = useState(initialState);
	const callbacks = {
		onAddBus: ({ registrationNum }) => {
			if (state.buses.find((bus) => bus.registrationNum === registrationNum)) {
				return 'A bus already exists with this registration number';
			}

			const newBus = { id: state.lastBusId + 1, registrationNum };
			setState({ ...state, buses: [...state.buses, newBus], lastBusId: newBus.id });
		},
		onRemoveBus: (id) => {
			const buses = state.buses.filter((bus) => bus.id !== id);
			const schedules = state.schedules.filter((schedule) => schedule.bus.id !== id);
			setState({ ...state, buses, schedules });
		},
		onAddStop: ({ code }) => {
			if (state.stops.find((stop) => stop.code === code)) {
				return 'A stop already exists with this code';
			}

			const newStop = { id: state.lastStopId + 1, code };
			setState({
				...state,
				stops: [...state.stops, newStop],
				lastStopId: newStop.id
			});
		},
		onRemoveStop: (id) => {
			const stopIdsInUse = [];
			state.routes.map((route) => route.stops.map((stop) => stopIdsInUse.push(stop.id)));
			if (stopIdsInUse.includes(id))
				return setState({ ...state, error: 'The stop is associated with route(s).' });

			const stops = state.stops.filter((stop) => stop.id !== id);
			setState({ ...state, stops });
		},
		onAddRoute: ({ name, stops }) => {
			if (state.routes.find((route) => route.name === name)) {
				return 'A route already exists with this name';
			}

			const newRoute = { id: state.lastRouteId + 1, name, stops };
			setState({
				...state,
				routes: [...state.routes, newRoute],
				lastRouteId: newRoute.id
			});
		},
		onRemoveRoute: (id) => {
			const routeIdsInUse = [];
			state.lines.map((line) => line.routes.map((route) => routeIdsInUse.push(route.id)));
			if (routeIdsInUse.includes(id))
				return setState({ ...state, error: 'The route is associated with line(s).' });

			const routes = state.routes.filter((route) => route.id !== id);

			setState({ ...state, routes });
		},
		onAddLine: ({ name, routes }) => {
			if (state.lines.find((line) => line.name === name)) {
				return 'A line already exists with this name';
			}

			const newLine = { id: state.lastLineId + 1, name, routes };
			setState({
				...state,
				lines: [...state.lines, newLine],
				lastLineId: newLine.id
			});
		},
		onRemoveLine: (id) => {
			const lines = state.lines.filter((line) => line.id !== id);
			const schedules = state.schedules.filter((schedule) => schedule.line.id !== id);

			setState({ ...state, lines, schedules });
		},
		onAddSchedule: ({ name, bus, line, time }) => {
			if (state.schedules.find((schedule) => schedule.name === name)) {
				return 'A schedule already exists with this name';
			}

			const newSchedule = { id: state.lastScheduleId + 1, name, bus, line, time };
			setState({
				...state,
				schedules: [...state.schedules, newSchedule],
				lastScheduleId: newSchedule.id
			});
		},
		onRemoveSchedule: (id) => {
			const schedules = state.schedules.filter((schedule) => schedule.id !== id);
			setState({ ...state, schedules });
		}
	};

	return (
		<>
			<NavBar />
			<Sections data={state} callbacks={callbacks} />
			<ToastMessage
				message={state.error}
				onClose={() => setState({ ...state, error: undefined })}
			/>
		</>
	);
}
