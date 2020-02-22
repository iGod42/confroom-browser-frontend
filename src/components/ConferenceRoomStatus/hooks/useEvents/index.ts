import {EventType} from "../../../../api/RoomApi"
import {useReducer, useState} from "react"
import reducer, {init} from "./reducer"
import EventsState from "./interface/EventsState"
import EventsAction from "./interface/EventsAction"

export default (roomId: string) => {
	const [state, dispatch] = useReducer(reducer(roomId), undefined, init)
	
	return [state, dispatch]
}