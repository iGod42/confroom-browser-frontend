import React from "react"
import styled from "styled-components"
import moment from 'moment'
import {EventType} from "../../../../api/RoomApi"
import RoomInfo from "./components/RoomInfo"
import LargeTime from "./components/LargeTime"
import * as EventTools from "../../tools/EventTools"

type InfoBoxParams = {
	roomName: string,
	currentTime: Date,
	events: EventType[]
}

const StyledInfoBox = styled.div<{ booked: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 3;
	min-width: 10em;
	background-color:${props => props.booked ? "red" : "green"}
`
const CurrentStatusInfo = ({roomName, currentTime, events}: InfoBoxParams) => {
	const booked = EventTools.hasCurrentEvent(currentTime, events)
	const nextEvent = EventTools.getNextOrCurrentEvent(currentTime, events)
	
	return <StyledInfoBox booked={booked}>
		<RoomInfo roomName={roomName}/>
		<LargeTime time={currentTime}/>
		<div>{booked ? "Booked" : "Free"} until</div>
		<div>{moment(booked ? nextEvent?.end : nextEvent?.start).format("HH:mm")}</div>
	</StyledInfoBox>
	
}

export default React.memo(CurrentStatusInfo)