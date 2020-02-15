import React from "react"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import {styled, Theme} from "@material-ui/core/styles"

import EventList from "./components/EventList"
import * as EventTools from "../../tools/EventTools"
import {EventType} from "../../../../api/RoomApi"
import StatusHeader from "./components/StatusHeader"

const BackgroundPaper = styled(Paper)({
	flex: 1
})

const Wrapper = styled(Box)(({theme, spacing}: { theme: Theme, spacing: number }) => ({
	padding: theme.spacing(spacing, spacing, 0, spacing),
	display: "flex"
}))

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
				<Box p={spacing + 1} pt={spacing}>
					<EventList events={events} currentTime={currentTime} shownEvents={4}/>
				</Box>
			</BackgroundPaper>
		</Wrapper>)
}

StatusPane.defaultProps = {
	spacing: 3
}

export default React.memo(StatusPane)