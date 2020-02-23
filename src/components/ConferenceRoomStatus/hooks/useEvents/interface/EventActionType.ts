enum EventsActionType {
	StartLoad = "StartLoad",
	StopLoad = "StopLoad"
}

interface StartLoadAction {
	type: EventsActionType.StartLoad
}

interface StopLoadAction {
	type: EventsActionType.StopLoad
}

export default EventsActionType
export type EventsAction = StartLoadAction | StopLoadAction