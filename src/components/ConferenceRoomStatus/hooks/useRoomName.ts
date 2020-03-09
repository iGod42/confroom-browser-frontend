import { useEffect, useState } from "react"
import * as RoomApi from "../../../api/RoomApi"
import useClientKey from "../../useClientKey"

const DEFAULT_ROOM_NAME = "Meeting Room"

export default (roomId: string | undefined) => {
	const [roomName, setRoomName] = useState<string>(DEFAULT_ROOM_NAME)
	const clientKey = useClientKey()

	useEffect(() => {
		if (!roomId) return
		RoomApi.getRoom(roomId, clientKey)
			.then(room => {
				if (room?.displayName)
					setRoomName(room.displayName)
			})
	}, [roomId, clientKey])

	return roomName
}