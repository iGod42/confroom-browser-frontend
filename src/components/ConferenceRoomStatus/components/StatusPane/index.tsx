import React from "react"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import {styled} from "@material-ui/core/styles"

import EventList from "./components/EventList"
import * as EventTools from "../../tools/EventTools"
import {EventType} from "../../../../api/RoomApi"
import StatusHeader from "./components/StatusHeader"

const BackgroundPaper = styled(Paper)({
	flex: 1
})

type StatusPaneProps = {
	currentTime: Date,
	events: EventType[],
	spacing: number,
	roomName: string
}

const StatusPane = ({currentTime, events, spacing, roomName}: StatusPaneProps) => {
	const currentEvent = EventTools.getCurrentEvent(currentTime, events)
	const nextEvent = EventTools.getFutureEvents(currentTime, events)[0]
	
	return (
		<Box display="flex" padding={spacing}>
			<BackgroundPaper elevation={3}>
				<StatusHeader currentEvent={currentEvent} nextEvent={nextEvent} currentTime={currentTime}
							  spacing={spacing} roomName={roomName}/>
				<Box p={spacing + 1} pt={spacing}>
					<EventList events={events} currentTime={currentTime} shownEvents={3}/>
				</Box>
			</BackgroundPaper>
		</Box>)
}

StatusPane.defaultProps = {
	spacing: 3
}

export default React.memo(StatusPane)