import {clearError, setError, setEvents, startLoad, stopLoad} from "../actions"
import * as RoomApi from "../../../../../api/RoomApi/RoomApiHL"
import {Dispatch} from "react"
import {EventsAction} from "../interface/EventActionType"

export default function loadTodaysEvents(dispatch: Dispatch<EventsAction>, roomId: string, currentTime: Date, client_key: string) {
	dispatch(startLoad())
	dispatch(clearError())
	RoomApi.getTodaysEvents(roomId, currentTime, client_key)
		.then(events => {
			dispatch(setEvents(events))
		})
		.catch(() => {
			dispatch(setError("Events could not be loaded"))
		})
		.finally(() => {
			dispatch(stopLoad())
		})
}
