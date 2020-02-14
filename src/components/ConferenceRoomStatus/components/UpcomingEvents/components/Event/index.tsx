import React from "react"
import styled from "styled-components"
import {EventType} from "../../../../../../api/RoomApi"

const StyledEvent = styled.div`
	background: #FFFFFF33;
	margin:0.3em;
`

type EventsProps = {
	event: EventType
}

const Index = ({event}: EventsProps) => {
	return <StyledEvent>
		{event.subject}
	</StyledEvent>
}

export default React.memo(Index)