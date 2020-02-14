import {EventType} from "../../../api/RoomApi"

function sortNewFirst(a: EventType, b: EventType): number {
	return a.start.getTime() - b.start.getTime()
}

export function hasCurrentEvent(currentTime: Date, events: EventType[]) {
	return events.some(event => event.start < currentTime && event.end >= currentTime)
}

export function getNextOrCurrentEvent(currentTime: Date, events: EventType[]): EventType | undefined {
	return events
		.filter(evt => evt.start >= currentTime || evt.end >= currentTime)
		.sort(sortNewFirst)[0]
}

export function getFutureEvents(currentTime: Date, events: EventType[]): EventType[] {
	return events.filter(evt => evt.start > currentTime)
		.sort(sortNewFirst)
}