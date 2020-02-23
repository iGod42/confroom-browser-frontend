import React from "react"
import {useParams} from "react-router-dom"


import StatusPane from "./components/StatusPane"

import ActionButton from "./components/ActionButton"
import StatusWrapper from "./components/StatusWrapper"
import * as EventTools from "./tools/EventTools"
import useCurrentTime from "./hooks/useCurrentTime"
import useRoomName from "./hooks/useRoomName"
import useEvents, {bookRoom as bookRoomAction, finishCurrentMeeting} from "./hooks/useEvents"

import ErrorPane from "./components/ErrorPane"

const ConferenceRoomStatus = ({socketUrl}: { socketUrl: string }) => {
	const currentTime = useCurrentTime()
	
	const {roomId} = useParams()
	
	const roomName = useRoomName(roomId)
	
	const [eventsState, eventDispatch] = useEvents(roomId, currentTime, socketUrl)
	const {events, isLoading, error} = eventsState
	
	const currentEvent = EventTools.getCurrentEvent(currentTime, events)
	
	const bookRoom = () => {
		eventDispatch(bookRoomAction(roomId || "", currentTime, 15))
	}
	
	const stopCurrent = () => {
		eventDispatch(finishCurrentMeeting(currentTime, roomId || ""))
	}
	
	return <StatusWrapper>
		{(!events.length && error) ? <ErrorPane message={error}/> :
			<React.Fragment>
				<StatusPane currentTime={currentTime} events={events} roomName={roomName}/>
				{isLoading ? null : !currentEvent ?
					<ActionButton onClick={bookRoom} color="secondary" variant={"extended"} size="large"><i
						className="material-icons">meeting_room</i>Book 15 min</ActionButton>
					: <ActionButton onClick={stopCurrent} color="secondary" variant={"extended"} size="large"><i
						className="material-icons">check</i>Meeting Done</ActionButton>}
			</React.Fragment>}
	</StatusWrapper>
}

export default React.memo(ConferenceRoomStatus)