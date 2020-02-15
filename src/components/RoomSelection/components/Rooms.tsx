import React from "react"
import Grid from "@material-ui/core/Grid"

import {RoomType} from "../../../api/RoomApi"
import Room from "./Room"

type RoomsParams = {
	rooms: Array<RoomType>
	onSelectRoom: (id: string) => void
}

const Rooms = ({rooms, onSelectRoom}: RoomsParams) => {
	return <Grid
		container
		direction="row"
		justify="center"
		alignItems="center"
	>
		{rooms.sort((a, b) => a.displayName.localeCompare(b.displayName)).map(room => <Room
			key={room.id} room={room}
			onSelect={() => onSelectRoom(room.id)}/>)}
	</Grid>
}

export default Rooms