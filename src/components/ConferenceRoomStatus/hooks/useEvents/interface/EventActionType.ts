import {EventType} from "../../../../../api/RoomApi"

enum EventsActionType {
	StartLoad = "StartLoad",
	StopLoad = "StopLoad",
	LoadTodaysEvents = "LoadTodaysEvents",
	SetEvents = "SetEvents",
	SetError = "SetError"
}

interface StartLoadAction {
	type: EventsActionType.StartLoad
}

interface StopLoadAction {
	type: EventsActionType.StopLoad
}

interface LoadTodaysEventsAction {
	type: EventsActionType.LoadTodaysEvents,
	payload: {
		roomId: string,
		currentTime: Date
	}
}

interface SetEventsAction {
	type: EventsActionType.SetEvents,
	payload: {
		events: EventType[]
	}
}

interface SetErrorAction {
	type: EventsActionType.SetError,
	payload?: {
		error?: string
	}
}

export default EventsActionType
export type EventsAction = StartLoadAction | StopLoadAction | LoadTodaysEventsAction | SetEventsAction | SetErrorAction