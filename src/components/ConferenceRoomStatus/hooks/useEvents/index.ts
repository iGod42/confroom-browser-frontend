import {Dispatch, useEffect, useReducer, useRef} from "react"
import reducer, {init} from "./reducer"
import thunk from "./thunk"
import {clearError, loadTodaysEvents, receiveUpdates, setError} from "./actions"
import io from "socket.io-client"
import EventsState from "./interface/EventsState"
import {EventsAction} from "./interface/EventActionType"
import useClientKey from "../../../useClientKey"
import { EventUpdate } from "../../../../api/RoomApi"

export default (roomId: string | undefined, currentTime: Date, socketUrl: string): [EventsState, Dispatch<EventsAction>] => {
	if (!roomId) throw new Error("Room ID is not set")
	
	const clientKey = useClientKey()
	
	const [state, unsafeDispatch] = useReducer(reducer, undefined, init)
	const mountedRef = useRef(false)
	
	useEffect(() => {
		mountedRef.current = true
		return () => {
			mountedRef.current = false
		}
	}, [])
	
	const dispatch: Dispatch<EventsAction> = action => {
		if (mountedRef.current) unsafeDispatch(action)
	}
	
	const theThunk = thunk(dispatch, state, reducer, clientKey)
	
	// initial load
	useEffect(() => {
		theThunk(loadTodaysEvents(roomId, currentTime))
		
		// ensure that we do a full load tomorrow as incremental updates won't cover those coming in
		const tomorrow = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1)
		const timeout = window.setTimeout(() => loadTodaysEvents(roomId, tomorrow), tomorrow.getTime() - currentTime.getTime())
		
		return () => clearTimeout(timeout)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roomId])
	
	// subscribe to socket
	useEffect(() => {
		
		// todo handle disconnect and reconnect
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

export * from "./actions"