import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import roomApi, {RoomType} from "../../api/RoomApi"
import Rooms from "./components/Rooms"
import styled from "styled-components"

const RoomSelectionWrapper = styled.div`
	margin-left: 1em;
	display: flex;
	flex-direction: column;
	align-items: center;
`

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
				theTimeout = setTimeout(fetchRooms, 10000)
			} finally {
				setLoading(false)
			}
		}
		
		fetchRooms()
			.then(() => {
			})
		return () => clearTimeout(theTimeout)
	}, [])
	
	return loading ? <div>loading</div> :
		error ? <div>{error}</div> :
			(<RoomSelectionWrapper>
				<h3>Please select the room</h3>
				<Rooms rooms={rooms} onSelectRoom={selectRoom}/>
			</RoomSelectionWrapper>)
}

export default RoomSelection