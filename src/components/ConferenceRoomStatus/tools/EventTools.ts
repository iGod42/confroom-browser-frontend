import {EventType} from "../../../api/RoomApi"

function sortNewFirst(a: EventType, b: EventType): number {
	return a.start.getTime() - b.start.getTime()
}

export function getCurrentEvent(currentTime: Date, events: EventType[]) {
	return events.find((event: EventType) => isCurrentEvent(currentTime, event))
}

export function isCurrentEvent(currentTime: Date, event: EventType) {
	return event.start < currentTime && event.end >= currentTime
}

export function getTodaysFutureEvents(currentTime: Date, events: EventType[], options?: ({ includeCurrent?: boolean })): EventType[] {
	return events.filter(evt => (
		options?.includeCurrent ?
			(evt.start >= currentTime || evt.end > currentTime) :
			(evt.start > currentTime)))
		.filter(evt => evt.start < new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1))
		.sort(sortNewFirst)
}

export function getFormattedDuration(event: EventType): string {
	if (event.isAllDay) return "all day"
	const timeDiffInSeconds = (event.end.getTime() - event.start.getTime()) / 1000
	
	const hours = Math.floor(timeDiffInSeconds / 3600)
	const minutes = Math.round((timeDiffInSeconds % 3600) / 60)
	
	if (hours > 24)
		return "all day"
	if (!hours)
		return `${minutes} min`
	
	return `${hours.toString()}:${minutes.toString().padStart(2, "0")} h`
}