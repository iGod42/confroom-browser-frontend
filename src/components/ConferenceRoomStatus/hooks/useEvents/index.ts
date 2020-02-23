import {useEffect, useReducer} from "react"
import reducer, {init} from "./reducer"
import thunk from "./thunk"
import {clearError, loadTodaysEvents, receiveUpdates, setError} from "./actions"
import io from "socket.io-client"
import {EventUpdate} from "../../../../../../hub/src/lib/CalendarApi"

export default (roomId: string | undefined, currentDay: Date, socketUrl: string) => {
	if (!roomId) throw new Error("Room ID is not set")
	
	const [state, dispatch] = useReducer(reducer, undefined, init)
	const theThunk = thunk(dispatch, state, reducer)
	
	// initial load
	useEffect(() => {
		theThunk(loadTodaysEvents(roomId, currentDay))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roomId])
	
	// subscribe to socket
	useEffect(() => {
		const socket = io(`${socketUrl}?roomId=${roomId}`)
		socket.on("update", (updates: EventUpdate[]) => {
			dispatch(clearError())
			dispatch(receiveUpdates(updates))
		})
		
		socket.on("error", (error: number) => {
			dispatch(setError(error === 401 ?
				"Authentication for the room failed, manual action on the hub is required" :
				"There seems to be an error updating. Please check the hub"))
		})
		
		return () => {
			socket.disconnect()
		}
	}, [socketUrl, roomId])
	
	return [state, theThunk]
}