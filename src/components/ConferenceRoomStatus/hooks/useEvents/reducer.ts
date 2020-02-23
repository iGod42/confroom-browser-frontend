import EventsState from "./interface/EventsState"
import EventsActionType from "./interface/EventActionType"
import EventsReducer from "./interface/EventsReducer"
import receiveUpdates from "./reducerFunctions/receiveUpdates"

const init = (): EventsState => ({
	events: [],
	isLoading: false
})

const reducer: EventsReducer = (state, action) => {
	switch (action.type) {
		case EventsActionType.StartLoad:
			return {...state, isLoading: true}
		case EventsActionType.StopLoad:
			return {...state, isLoading: false}
		case EventsActionType.SetEvents:
			return {...state, events: action.payload.events}
		case EventsActionType.SetError:
			return {...state, error: action.payload?.error}
		case EventsActionType.ReceiveUpdates:
			return receiveUpdates(state, action)
		case EventsActionType.EventUpdated:
			return {
				...state,
				events: state.events
					.filter(evt => evt.id !== action.payload.event.id)
					.concat(action.payload.event)
			}
		default:
			return state
	}
}

export default reducer
export {init}