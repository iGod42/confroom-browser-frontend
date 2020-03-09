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

export type EventUpdate = {
	type: "addedOrUpdated" | "removed",
	id: string,
	event?: EventType
}