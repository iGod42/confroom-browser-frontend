import {useEffect, useReducer} from "react"
import reducer, {init} from "./reducer"
import thunk from "./thunk"
import {loadTodaysEvents} from "./actions"

export default (roomId: string | undefined, currentDay: Date) => {
	if (!roomId) throw new Error("Room ID is not set")
	
	const [state, dispatch] = useReducer(reducer, undefined, init)
	const theThunk = thunk(dispatch, state, reducer)
	
	useEffect(() => {
		theThunk(loadTodaysEvents(roomId, currentDay))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roomId])
	
	return [state, theThunk]
}