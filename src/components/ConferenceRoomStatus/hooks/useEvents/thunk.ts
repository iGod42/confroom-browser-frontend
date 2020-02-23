import {Dispatch} from "react"
import EventsReducer from "./interface/EventsReducer"
import EventsActionType, {EventsAction} from "./interface/EventActionType"
import {setEvents, startLoad, stopLoad} from "./actions"
import * as RoomApi from "../../../../api/RoomApi"
import EventsState from "./interface/EventsState"

export default (dispatch: Dispatch<EventsAction>, state: EventsState, reducer: EventsReducer): Dispatch<EventsAction> => {
	function loadTodaysEvents(roomId: string, currentTime: Date) {
		dispatch(startLoad())
		RoomApi.getTodaysEvents(roomId, currentTime)
			.then(events => {
				dispatch(setEvents(events))
				dispatch(stopLoad())
			})
	}
	
	return (action) => {
		switch (action.type) {
			case EventsActionType.LoadTodaysEvents:
				loadTodaysEvents(action.payload.roomId, action.payload.currentTime)
				return state
			default:
				return reducer(state, action)
		}
	}
}
	