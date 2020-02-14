import config from "../config.json"

export type RoomType = {
	displayName: string,
	id: string
}

function getRooms(): Promise<RoomType[]> {
	return fetch(new URL("rooms", config.hubUrl).toString())
		.then(res => res.json())
}

export type EventType = {
	id: string,
	subject: string,
	start: Date,
	end: Date
}

type ApiEventType = {
	id: string,
	subject: string,
	start: Date,
	end: Date
}

function getEvents(roomId: string, from?: Date, to?: Date): Promise<EventType[]> {
	
	const today = new Date()
	from = from || new Date(today.getFullYear(), today.getMonth(), today.getDate())
	to = to || new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
	
	const url = new URL(`rooms/${roomId}/events`, config.hubUrl)
	url.searchParams.append("from", from.toISOString())
	url.searchParams.append("to", to.toISOString())
	
	return fetch(url.toString())
		.then(res => res.json())
		.then(res => (res as ApiEventType[]).map(convertEvent))
}

function convertEvent(event: ApiEventType): EventType {
	return {
		...event,
		start: new Date(event.start),
		end: new Date(event.end)
	}
}

export default {getRooms, getEvents}