import * as RoomApi from "./RoomApiCore"
import {EventType} from "./Types"

export async function getTodaysEvents(roomId: string, currentTime: Date, clientKey: string): Promise<EventType[]> {
	const from = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate()) // start of today
	const to = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1) // start of tomorrow
	return RoomApi.getEvents(roomId, from, to, clientKey)
}