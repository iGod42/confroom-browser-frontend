import EventActionType from "./interface/EventActionType"
import EventsActionType, {EventsAction} from "./interface/EventActionType"
import {EventType, EventUpdate} from "../../../../api/RoomApi"

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

export const setError = (error: string): EventsAction => ({
	type: EventsActionType.SetError,
	payload: {
		error
	}
})

export const clearError = (): EventsAction => ({
	type: EventsActionType.SetError
})

export const receiveUpdates = (updates: EventUpdate[]): EventsAction => ({
	type: EventsActionType.ReceiveUpdates,
	payload: {
		updates
	}
})

export const bookRoom = (roomId: string, currentTime: Date, desiredDuration: number): EventsAction => ({
	type: EventsActionType.BookRoom,
	payload: {
		roomId,
		currentTime,
		desiredDuration
	}
})

export const eventUpdated = (event: EventType): EventsAction => ({
	type: EventsActionType.EventUpdated,
	payload: {
		event
	}
})

export const finishCurrentMeeting = (currentTime: Date, roomId: string): EventsAction => ({
	type: EventsActionType.FinishCurrentMeeting,
	payload: {
		currentTime, roomId
	}
})