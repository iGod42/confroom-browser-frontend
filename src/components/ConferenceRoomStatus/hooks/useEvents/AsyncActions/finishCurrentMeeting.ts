import {EventsAction} from "../interface/EventActionType"
import {Dispatch} from "react"
import EventsState from "../interface/EventsState"
import * as EventTools from "../../../tools/EventTools"
import {EventType} from "../../../../../api/RoomApi"
import * as RoomApi from "../../../../../api/RoomApi"
import {eventUpdated, startLoad, stopLoad} from "../actions"

const getCleanedCurrentTime = (currentTime: Date) => new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(),
	currentTime.getHours(), currentTime.getMinutes(), 0, 0)

export default function (dispatch: Dispatch<EventsAction>, state: EventsState, currentTime: Date, roomId: string) {
	const {events} = state
	
	dispatch(startLoad())
	
	const currentEvent = EventTools.getCurrentEvent(currentTime, events)
	if (!currentEvent || !roomId) return
	
	const update: EventType = {...currentEvent}
	update.end = getCleanedCurrentTime(currentTime)
	RoomApi.updateBooking(roomId, update)
		.then(newEvent => {
			dispatch(eventUpdated(newEvent))
		})
		.finally(() => {
			dispatch(stopLoad())
		})
}