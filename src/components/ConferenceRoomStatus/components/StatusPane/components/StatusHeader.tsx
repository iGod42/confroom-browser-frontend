import React from "react"
import styled from "styled-components"
import moment from "moment"
import Paper from "@material-ui/core/Paper"
import {Theme} from "@material-ui/core/styles/createMuiTheme"
import Typography from "@material-ui/core/Typography"

import {EventType} from "../../../../../api/RoomApi"

const getTextPalette = (theme: Theme, booked: boolean) => {
	return booked ? theme.palette.error : theme.palette.secondary
}

const HeaderPaper = styled(Paper)<{ theme: Theme, booked: number, spacing: number }>`
	background: ${({theme, booked}) => getTextPalette(theme, !!booked).main};
	color: ${({theme, booked}) => getTextPalette(theme, !!booked).contrastText};
	margin: ${({theme, spacing}) => theme.spacing(-spacing, spacing, 0, spacing)};
	padding: ${({theme, spacing}) => theme.spacing(spacing / 2)}px;
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: background-color 1s, color 1s;
`

type StatusHeaderProps = {
	spacing: number,
	currentEvent: EventType | undefined,
	nextEvent: EventType | undefined
	currentTime: Date
}

const formatTime = (date: Date): string => moment(date).format("HH:mm")

const StatusHeader = ({currentEvent, nextEvent, currentTime, spacing}: StatusHeaderProps) => (
	<HeaderPaper elevation={3} booked={currentEvent ? 1 : 0} spacing={spacing}>
		<Typography variant="h4">{formatTime(currentTime)}</Typography>
		<Typography variant="body2">{currentEvent ? "Booked" : "Free"} until {
			currentEvent ? formatTime(currentEvent.end) :
				nextEvent ? formatTime(nextEvent.start) : "tomorrow"}</Typography>
	</HeaderPaper>
)

export default React.memo(StatusHeader)