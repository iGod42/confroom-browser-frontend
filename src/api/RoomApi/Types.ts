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