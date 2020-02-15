import React from "react"
import styled from "styled-components"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"

import EventList from "./components/EventList"
import * as EventTools from "../../tools/EventTools"
import {EventType} from "../../../../api/RoomApi"
import StatusHeader from "./components/StatusHeader"

const BackgroundPaper = styled(Paper)`
 	display: flex;
 	flex: 1;
 	flex-direction: column;
 	max-width: 100%;
`

const ContentBox = styled(Box)`
	display: flex;
	flex: 1;
	flex-direction: column;
`

const Wrapper = styled(Box)<{ spacing: number }>`
	padding: ${({theme, spacing}) => theme.spacing(spacing, spacing, 0, spacing)};
	display: flex;
`

type StatusPaneProps = {
	currentTime: Date,
	events: EventType[],
	spacing: number
}

const StatusPane = ({currentTime, events, spacing}: StatusPaneProps) => {
	const currentEvent = EventTools.getCurrentEvent(currentTime, events)
	const nextEvent = EventTools.getFutureEvents(currentTime, events)[0]
	
	return (
		<Wrapper spacing={spacing}>
			<BackgroundPaper elevation={3}>
				<StatusHeader currentEvent={currentEvent} nextEvent={nextEvent} currentTime={currentTime}
							  spacing={spacing}/>
				<ContentBox p={spacing + 1} pt={spacing}>
					<EventList events={events} currentTime={currentTime} shownEvents={4}/>
				</ContentBox>
			</BackgroundPaper>
		</Wrapper>)
}

StatusPane.defaultProps = {
	spacing: 3
}

export default React.memo(StatusPane)