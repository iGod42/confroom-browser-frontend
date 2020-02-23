import {Dispatch} from "react"
import EventsReducer from "./interface/EventsReducer"
import EventsActionType, {EventsAction} from "./interface/EventActionType"
import EventsState from "./interface/EventsState"
import loadTodaysEvents from "./AsyncActions/loadTodaysEvents"
import bookRoom from "./AsyncActions/bookRoom"

export default (dispatch: Dispatch<EventsAction>, state: EventsState, reducer: EventsReducer): Dispatch<EventsAction> => {
	return (action) => {
		switch (action.type) {
			case EventsActionType.LoadTodaysEvents:
				loadTodaysEvents(dispatch, action.payload.roomId, action.payload.currentTime)
				return state
			case EventsActionType.BookRoom:
				bookRoom(dispatch, state, action.payload)
				return state
			default:
				return reducer(state, action)
		}
	}
}
	