import {EventType} from "../../../../../api/RoomApi"

type EventsState = {
	events: EventType[],
	isLoading: boolean,
	error?: string
}

export default EventsState