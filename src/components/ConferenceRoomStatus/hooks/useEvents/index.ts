import {useEffect, useReducer} from "react"
import reducer, {init} from "./reducer"
import thunk from "./thunk"
import {loadTodaysEvents} from "./actions"

export default (roomId: string | undefined, currentDay: Date) => {
	if (!roomId) throw new Error("Room ID is not set")
	
	const [state, dispatch] = useReducer(reducer, undefined, init)
	const theThunk = thunk(dispatch, state, reducer)
	
	const initialLoad = () => loadTodaysEvents(roomId, currentDay)
	
	useEffect(() => {
		console.log("loading events")
		theThunk(initialLoad())
	}, [])
	
	return [state, theThunk]
}