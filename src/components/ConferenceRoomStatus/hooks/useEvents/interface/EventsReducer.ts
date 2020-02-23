import EventsState from "./EventsState"
import {EventsAction} from "./EventActionType"

type EventsReducer = (state: EventsState, action: EventsAction) => EventsState

export default EventsReducer