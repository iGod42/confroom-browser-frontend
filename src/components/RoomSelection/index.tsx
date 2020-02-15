import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import roomApi, {RoomType} from "../../api/RoomApi"
import Rooms from "./components/Rooms"

const RoomSelection = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>()
	const [rooms, setRooms] = useState<Array<RoomType>>([])
	const history = useHistory()
	
	function selectRoom(roomId: string) {
		history.push(`/status/${roomId}`)
	}
	
	useEffect(() => {
		let theTimeout: number
		
		async function fetchRooms() {
			setLoading(true)
			setError(undefined)
			try {
				setRooms(await roomApi.getRooms())
			} catch (e) {
				setRooms([])
				setError("Could not reach hub, will retry automatically")
				theTimeout = window.setTimeout(fetchRooms, 10000)
			} finally {
				setLoading(false)
			}
		}
		
		fetchRooms()
			.then(() => {
			})
		return () => clearTimeout(theTimeout)
	}, [])
	
	return loading ? <Box m={3}><Typography variant="overline">loading...</Typography></Box> :
		error ? <Box m={3}><Typography color="error" variant="subtitle2">{error}</Typography></Box> :
			(
				<Box>
					<Box m={3}><Typography variant="h6" align="center">Please select the room</Typography></Box>
					<Rooms rooms={rooms} onSelectRoom={selectRoom}/>
				</Box>
			)
}

export default RoomSelection