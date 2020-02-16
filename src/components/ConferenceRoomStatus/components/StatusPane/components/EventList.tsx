import React, {useEffect, useState} from "react"
import Box from "@material-ui/core/Box"

import * as EventTools from "../../../tools/EventTools"
import {EventType} from "../../../../../api/RoomApi"
import Event from "./Event"

type EventListProps = {
	currentTime: Date,
	events: EventType[],
	shownEvents: number,
	showCurrentEvent: boolean
}

type DisplayEvent = {
	event: EventType | null,
	appear: boolean,
	disappear: boolean
}

const EventList = ({currentTime, events, shownEvents, showCurrentEvent}: EventListProps) => {
	const [displayEvents, setDisplayEvents] = useState<DisplayEvent[]>([])
	
	useEffect(() => {
		const evtToDisplay = EventTools
			.getFutureEvents(currentTime, events, {includeCurrent: showCurrentEvent})
			.slice(0, shownEvents)
		
		let newDisplayEvents: DisplayEvent[] = displayEvents
			.filter(de => !de.disappear) // remove those that disappeared last time and the no event item
			.map(evt => ({event: evt.event, appear: false, disappear: false})) // nothing should appear now
		
		evtToDisplay.forEach((evt) => {
			
			// find if the event is already displayed
			const existingDe = newDisplayEvents.find(de => de.event && de.event.id === evt.id)
			// if so update it
			if (existingDe) existingDe.event = evt
			// if not add it to be displayed
			else newDisplayEvents.push({event: evt, appear: true, disappear: false})
		})
		
		newDisplayEvents = newDisplayEvents.map(nde => ({
			event: nde.event,
			appear: nde.appear,
			disappear: !evtToDisplay.some(evt => nde.event && nde.event.id === evt.id) // if the event is to be displayed but does not exist in this list make it disappear
		} as DisplayEvent))
			.sort((a, b) => (a.event?.start?.getTime() || 0) - (b?.event?.start?.getTime() || 0))
		
		const noEvent = newDisplayEvents.find(nde => !nde.event)
		// if there aren't at least some events not set to disappear add the no-event
		if (!newDisplayEvents.some(nde => !nde.disappear)) {// check if no-event is already there
			if (!noEvent)
				newDisplayEvents.push({event: null, appear: true, disappear: false})
			else {
				noEvent.appear = true
				noEvent.disappear = false
			}
		} else {// otherwise make it disappear
			if (noEvent) noEvent.disappear = true
		}
		
		setDisplayEvents(newDisplayEvents)
	}, [events, currentTime])
	
	return (
		<Box>
			{
				displayEvents
					.map((de, index, all) =>
						<Event key={de.event?.id || "listEmptyItem"} event={de.event}
							   isCurrent={!!de.event && EventTools.isCurrentEvent(currentTime)(de.event)}
							   bottomDivider={index !== (all.length - 1)} appear={de.appear}
							   disappear={de.disappear}/>
					)}
		</Box>
	)
}

EventList.defaultProps = {
	shownEvents: 3,
	showCurrentEvent: true
}

export default React.memo(EventList)