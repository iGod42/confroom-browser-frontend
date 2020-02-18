import React from "react"
import {RoomType} from "../../../api/RoomApi"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"

type RoomParams = {
	room: RoomType,
	onSelect: () => void
}

const GiganticButton = styled(Button)(({theme}) => ({
	padding: theme.spacing(5)
}))

const Room = ({room, onSelect}: RoomParams) =>
	<Box m={1}>
		<GiganticButton onClick={onSelect} variant="contained" color="secondary"
						size="large">{room.displayName}</GiganticButton>
	</Box>

export default Room