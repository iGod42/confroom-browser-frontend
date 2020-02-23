import {EventType} from "../../../../../api/RoomApi"

enum EventsActionType {
	StartLoad = "StartLoad",
	StopLoad = "StopLoad",
	LoadTodaysEvents = "LoadTodaysEvents",
	SetEvents = "SetEvents"
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

export default EventsActionType
export type EventsAction = StartLoadAction | StopLoadAction | LoadTodaysEventsAction | SetEventsAction