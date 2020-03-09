import React, {useEffect, useState} from "react"
import {useHistory, useLocation} from "react-router-dom"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import {RoomType, getRooms} from "../../api/RoomApi"
import Rooms from "./components/Rooms"
import useClientKey from "../useClientKey"

const RoomSelection = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>()
	const [rooms, setRooms] = useState<Array<RoomType>>([])
	const history = useHistory()
	const location = useLocation()
	const clientKey = useClientKey()
	
	function selectRoom(roomId: string) {
		history.push(`/status/${roomId}${location.search}`)
	}
	
	useEffect(() => {
		let theTimeout: number
		
		async function fetchRooms() {
			setLoading(true)
			setError(undefined)
			try {
				setRooms(await getRooms(clientKey))
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
	}, [clientKey])
	
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