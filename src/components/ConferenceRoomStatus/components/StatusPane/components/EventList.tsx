import React from "react"
import Box from "@material-ui/core/Box"

import * as EventTools from "../../../tools/EventTools"
import {EventType} from "../../../../../api/RoomApi"
import Event from "./Event"
import Typography from "@material-ui/core/Typography"

type EventListProps = {
	currentTime: Date,
	events: EventType[],
	shownEvents: number,
	showCurrentEvent: boolean
}

const EventList = ({currentTime, events, shownEvents, showCurrentEvent}: EventListProps) => {
	const evtToDisplay = EventTools
		.getFutureEvents(currentTime, events, {includeCurrent: showCurrentEvent})
		.slice(0, shownEvents)
	return (
		<Box>
			{
				evtToDisplay.length ?
					evtToDisplay
						.map((de, index, all) =>
							<Event key={de?.id || "listEmptyItem"} event={de}
								   isCurrent={!!de && EventTools.isCurrentEvent(currentTime, de)}
								   bottomDivider={index !== (all.length - 1)}
							/>
						) :
					<Typography variant="overline" align="center">No more events today</Typography>}
		</Box>
	)
}

EventList.defaultProps = {
	shownEvents: 3,
	showCurrentEvent: true
}

export default React.memo(EventList)