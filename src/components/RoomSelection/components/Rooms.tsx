import React from "react"
import {RoomType} from "../../../api/RoomApi"
import Room from "./Room"
import styled from "styled-components"

type RoomsParams = {
	rooms: Array<RoomType>
	onSelectRoom: (id: string) => void
}

const RoomWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-content: space-around;
`

const Rooms = ({rooms, onSelectRoom}: RoomsParams) => {
	return <RoomWrapper>{rooms.sort((a, b) => a.displayName.localeCompare(b.displayName)).map(room => <Room
		key={room.id} room={room}
		onSelect={() => onSelectRoom(room.id)}/>)}</RoomWrapper>
}

export default Rooms