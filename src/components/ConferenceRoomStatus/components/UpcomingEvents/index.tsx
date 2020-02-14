import React from "react"
import styled from "styled-components"
import {EventType} from "../../../../api/RoomApi"
import EventList from "./components/EventsList"

const EvtWrapper = styled.div`
	flex: 4;
	min-width: 20em;
	display:flex;
	flex-direction:column;
`

type UpcomingEventProps = {
	currentTime: Date,
	events: EventType[]
}

const UpcomingEvents = ({currentTime, events}: UpcomingEventProps) => {
	return <EvtWrapper>
		<EventList events={events} currentTime={currentTime}/>
	</EvtWrapper>
}

export default React.memo(UpcomingEvents)