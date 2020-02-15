import React from "react"
import moment from "moment"
import {styled, Theme} from "@material-ui/core/styles"
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

const Wrapper = styled(Box)(({theme, active}: { theme: Theme, active: number }) => ({
	display: "flex",
	color: active ? theme.palette.error.main : "inherit"
}))

const TimeWrapper = styled("div")({
	flexShrink: 0
})

const EventTitle = styled(Typography)(({theme}) => ({
	marginLeft: theme.spacing(2)
}))

const EventDivider = styled(Divider)(({theme}) => ({
	margin: theme.spacing(1, 0)
}))

const Event = ({event, bottomDivider, isCurrent}: EventProps) => (
	<Box>
		<Wrapper active={isCurrent ? 1 : 0}>
			<TimeWrapper>
				<Typography variant="subtitle2">{moment(event.start).format("HH:mm")}</Typography>
				<Typography variant="caption">{EventTools.getFormattedDuration(event)}</Typography>
			</TimeWrapper>
			<EventTitle variant="body1">{event.subject}</EventTitle>
		</Wrapper>
		{bottomDivider ? <EventDivider/> : null}
	</Box>
)

export default React.memo(Event)