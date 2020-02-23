import {Dispatch} from "react"
import EventsReducer from "./interface/EventsReducer"

export default (dispatch: Dispatch<any>, reducer: EventsReducer): EventsReducer =>
	(state, action) => {
		switch (action.type) {
			default:
				return state
		}
	}

	