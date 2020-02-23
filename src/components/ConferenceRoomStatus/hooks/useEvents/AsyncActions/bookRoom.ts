import {Dispatch} from "react"
import {EventsAction} from "../interface/EventActionType"
import EventsState from "../interface/EventsState"
import {eventUpdated, startLoad, stopLoad} from "../actions"
import * as EventTools from "../../../tools/EventTools"
import * as RoomApi from "../../../../../api/RoomApi"

type BookingDetails = {
	roomId: string,
	currentTime: Date,
	desiredDuration: number
}

const getCleanedCurrentTime = (currentTime: Date) => new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(),
	currentTime.getHours(), currentTime.getMinutes(), 0, 0)

export default function (dispatch: Dispatch<EventsAction>, state: EventsState, bookingDetails: BookingDetails) {
	dispatch(startLoad())
	
	const {currentTime, desiredDuration, roomId} = bookingDetails
	const start = getCleanedCurrentTime(currentTime)
	
	const nextEventStart =
		EventTools.getTodaysFutureEvents(currentTime, state.events)[0]?.start
		|| new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1)
	
	let end = new Date(start)
	end.setMinutes(end.getMinutes() + desiredDuration)
	end = nextEventStart < end ? nextEventStart : end
	
	RoomApi.bookRoom(roomId, start, end)
		.then(newEvent => {
			dispatch(eventUpdated(newEvent))
		})
		.finally(() => {
			dispatch(stopLoad())
		})
	
}