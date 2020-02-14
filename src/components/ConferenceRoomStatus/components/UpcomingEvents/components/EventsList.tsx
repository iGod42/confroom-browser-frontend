import React from "react"
import styled from "styled-components"
import {EventType} from "../../../../../api/RoomApi"
import Event from "./Event"
import * as EventTools from "../../../tools/EventTools"

const StyledEventList = styled.div`
	flex: 1;
	diplay: flex;
	flex-direction: column;
	align-items: stretch;
`

type EventsListProps = {
	currentTime: Date,
	events: EventType[]
}

const EventList = ({currentTime, events}: EventsListProps) => {
	return <StyledEventList>
		{EventTools.getFutureEvents(currentTime, events).map(evt => <Event key={evt.id} event={evt}/>)}
	</StyledEventList>
}

export default React.memo(EventList)