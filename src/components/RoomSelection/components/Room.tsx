import React from "react"
import {RoomType} from "../../../api/RoomApi"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"

type RoomParams = {
	room: RoomType,
	onSelect: () => void
}

const Room = ({room, onSelect}: RoomParams) =>
	<Box m={1}>
		<Button onClick={onSelect} variant="contained" color="secondary" size="large">{room.displayName}</Button>
	</Box>

export default Room