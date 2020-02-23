import {EventType} from "../../../../../api/RoomApi"
import EventsReducer from "../interface/EventsReducer"
import EventsActionType from "../interface/EventActionType"

const mapSocksEvtType = (evt: any): EventType => {
	return {
		...evt,
		start: new Date(evt.start),
		end: new Date(evt.end)
	}
}

const receiveUpdates: EventsReducer = (state, action) => {
	if (action.type !== EventsActionType.ReceiveUpdates) return state
	
	const {events} = state
	const {updates} = action.payload
	
	const newEvents = events
		.filter(evt => !updates.find(change => change.id === evt.id)) // fitler updated ones
		.concat(updates
			.filter(change => change.type !== "removed") // filter out the removed ones to not add them again
			.map((change) => change.event) // and map them to be nice events
			.map(mapSocksEvtType)
		)
	
	return {...state, events: newEvents}
}

export default receiveUpdates