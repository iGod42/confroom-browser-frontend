import React from "react"
import styled from "styled-components"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"

import * as EventTools from "../../../tools/EventTools"
import {EventType} from "../../../../../api/RoomApi"
import Event from "./Event"

type EventListProps = {
	currentTime: Date,
	events: EventType[],
	shownEvents: number,
	showCurrentEvent: boolean
}

const Wrapper = styled(Box)`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: stretch;
`

const EventList = ({currentTime, events, shownEvents, showCurrentEvent}: EventListProps) => {
	const eventsToShow = EventTools
		.getFutureEvents(currentTime, events, {includeCurrent: showCurrentEvent})
		.slice(0, shownEvents)
	return (
		<Wrapper>
			{
				!eventsToShow.length ? <Typography variant="h6" align="center">No more events today</Typography> :
					eventsToShow.map((evt, index, all) =>
						<Event key={evt.id} event={evt} isCurrent={EventTools.isCurrentEvent(currentTime)(evt)}
							   bottomDivider={index !== (all.length - 1)}/>)}
		</Wrapper>
	)
}

EventList.defaultProps = {
	shownEvents: 3,
	showCurrentEvent: true
}

export default React.memo(EventList)