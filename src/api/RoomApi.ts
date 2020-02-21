import config from "../config.json"

export type RoomType = {
	displayName: string,
	id: string
}

export type EventType = {
	id: string,
	subject: string,
	start: Date,
	end: Date,
	isAllDay: boolean
}

type ApiEventType = {
	id: string,
	subject: string,
	start: Date,
	end: Date,
	isAllDay: boolean
}

export function getRooms(): Promise<RoomType[]> {
	return fetch(new URL("rooms", config.hubUrl).toString())
		.then(res => res.json())
}

export function getRoom(roomId: string): Promise<RoomType> {
	return fetch(new URL("rooms/" + roomId, config.hubUrl).toString())
		.then(res => res.json())
}

export function getEvents(roomId: string, from?: Date, to?: Date): Promise<EventType[]> {
	
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

export async function bookRoom(roomId: string, from: Date, to: Date): Promise<EventType> {
	const url = new URL(`rooms/${roomId}/events`, config.hubUrl)
	url.searchParams.append("from", from.toISOString())
	url.searchParams.append("to", to.toISOString())
	
	return fetch(url.toString(), {
		method: "POST"
	})
		.then(res => res.json())
		.then(convertEvent)
}

export async function updateBooking(roomId: string, event: EventType) {
	const url = new URL(`rooms/${roomId}/events/${event.id}`, config.hubUrl)
	
	return fetch(url.toString(), {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(event)
	})
		.then(res => res.json())
		.then(convertEvent)
}

/* All day events will be returned with UTC Date set, so we need to account for that here*/
function convertEvent(event: ApiEventType): EventType {
	const convertUTCDateToLocalTime = (date: Date): Date =>
		new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
			date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds())
	
	const converted = {
		...event,
		start: new Date(event.start),
		end: new Date(event.end)
	}
	
	if (event.isAllDay) {
		converted.start = convertUTCDateToLocalTime(converted.start)
		converted.end = convertUTCDateToLocalTime(converted.end)
		// make sure that inclusive end queries don't pick up this date
		converted.end.setMilliseconds(converted.end.getMilliseconds() - 1)
	}
	
	return converted
}
