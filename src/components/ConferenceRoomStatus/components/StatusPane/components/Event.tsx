import React from "react"
import moment from "moment"
import styled from "styled-components"
import Typography from "@material-ui/core/Typography"
import {Box} from "@material-ui/core"
import Divider from "@material-ui/core/Divider"

import * as EventTools from "../../../tools/EventTools"
import {EventType} from "../../../../../api/RoomApi"

type EventProps = {
	event: EventType,
	bottomDivider: boolean,
	isCurrent: boolean
}

const EventBox = styled(Box)`
	display: flex;
	flex-direction: column;
`
const Wrapper = styled(Box)<{ active: number }>`
	display: flex;
	color: ${({theme, active}) => active ? theme.palette.error.main : "inherit"};
`

const TimeWrapper = styled(Box)`
	flex-shrink: 0;
`

const EventTitle = styled(Typography)`
	max-height:100%;
	margin-left: ${({theme}) => theme.spacing(2)}px
`

const EventDivider = styled(Divider)`
	margin: ${({theme}) => theme.spacing(1, 0)}
`

const Event = ({event, bottomDivider, isCurrent}: EventProps) => (
	<EventBox>
		<Wrapper active={isCurrent ? 1 : 0}>
			<TimeWrapper>
				<Typography variant="subtitle2">{moment(event.start).format("HH:mm")}</Typography>
				<Typography variant="caption">{EventTools.getFormattedDuration(event)}</Typography>
			</TimeWrapper>
			<EventTitle variant="body1">{event.subject}</EventTitle>
		</Wrapper>
		{bottomDivider ? <EventDivider/> : null}
	</EventBox>
)

export default React.memo(Event)