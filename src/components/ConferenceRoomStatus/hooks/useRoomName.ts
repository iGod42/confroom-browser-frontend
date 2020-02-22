import {useEffect, useState} from "react"
import * as RoomApi from "../../../api/RoomApi"

const DEFAULT_ROOM_NAME = "Meeting Room"

export default (roomId: string | undefined) => {
	const [roomName, setRoomName] = useState<string>(DEFAULT_ROOM_NAME)
	
	useEffect(() => {
		if (!roomId) return
		
		RoomApi.getRoom(roomId)
			.then(room => {
				if (room?.displayName)
					setRoomName(room.displayName)
			})
	}, [roomId])
	
	return roomName
}