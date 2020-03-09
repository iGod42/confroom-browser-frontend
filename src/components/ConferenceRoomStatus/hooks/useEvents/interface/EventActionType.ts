import {EventType, EventUpdate} from "../../../../../api/RoomApi"

enum EventsActionType {
	StartLoad = "StartLoad",
	StopLoad = "StopLoad",
	LoadTodaysEvents = "LoadTodaysEvents",
	SetEvents = "SetEvents",
	SetError = "SetError",
	ReceiveUpdates = "ReceiveUpdates",
	BookRoom = "BookRoom",
	EventUpdated = "EventUpdated",
	FinishCurrentMeeting = "FinishCurrentMeeting"
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

interface ReceiveUpdatesAction {
	type: EventsActionType.ReceiveUpdates,
	payload: {
		updates: EventUpdate[]
	}
}

interface BookRoom {
	type: EventsActionType.BookRoom,
	payload: {
		roomId: string,
		currentTime: Date,
		desiredDuration: number
	}
}

interface EventUpdated {
	type: EventsActionType.EventUpdated,
	payload: {
		event: EventType
	}
}

interface FinishCurrentMeeting {
	type: EventsActionType.FinishCurrentMeeting,
	payload: {
		currentTime: Date,
		roomId: string
	}
}

export default EventsActionType
export type EventsAction =
	StartLoadAction
	| StopLoadAction
	| LoadTodaysEventsAction
	| SetEventsAction
	| SetErrorAction
	| ReceiveUpdatesAction
	| BookRoom
	| EventUpdated
	| FinishCurrentMeeting