import EventActionType, {EventsAction} from "./interface/EventActionType"
import {EventType} from "../../../../api/RoomApi"

export const startLoad = (): EventsAction => ({
	type: EventActionType.StartLoad
})

export const stopLoad = (): EventsAction => ({
	type: EventActionType.StopLoad
})

export const setEvents = (events: EventType[]): EventsAction => ({
	type: EventActionType.SetEvents,
	payload: {
		events
	}
})

export const loadTodaysEvents = (roomId: string, currentTime: Date): EventsAction => ({
	type: EventActionType.LoadTodaysEvents,
	payload: {
		currentTime,
		roomId
	}
})