import React from "react"
import moment from "moment"
import {styled} from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import {Theme} from "@material-ui/core/styles/createMuiTheme"
import Typography from "@material-ui/core/Typography"

import {EventType} from "../../../../../api/RoomApi"

const getTextPalette = (theme: Theme, booked: boolean) => {
	return booked ? theme.palette.error : theme.palette.secondary
}

const HeaderPaper = styled(Paper)(({theme, booked, spacing}: { theme: Theme, booked: number, spacing: number }) => ({
	background: getTextPalette(theme, !!booked).main,
	color: getTextPalette(theme, !!booked).contrastText,
	margin: theme.spacing(-spacing, spacing, 0, spacing),
	padding: theme.spacing(spacing / 2),
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	transition: "background-color 1s, color 1s"
}))

type StatusHeaderProps = {
	spacing: number,
	currentEvent: EventType | undefined,
	nextEvent: EventType | undefined,
	currentTime: Date,
	roomName: string
}

const formatTime = (date: Date): string => moment(date).format("HH:mm")

const StatusHeader = ({currentEvent, nextEvent, currentTime, spacing, roomName}: StatusHeaderProps) => (
	<HeaderPaper elevation={3} booked={currentEvent ? 1 : 0} spacing={spacing}>
		<Typography variant="subtitle1">{roomName}</Typography>
		<Typography variant="h4">{formatTime(currentTime)}</Typography>
		<Typography variant="subtitle2">{currentEvent ? "Booked" : "Free"} until {
			currentEvent ? (currentEvent.isAllDay ? "tomorrow" : formatTime(currentEvent.end)) :
				nextEvent ? formatTime(nextEvent.start) : "tomorrow"}</Typography>
	</HeaderPaper>
)

export default React.memo(StatusHeader)