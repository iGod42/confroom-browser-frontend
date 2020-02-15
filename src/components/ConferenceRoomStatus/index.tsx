import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import styled from "styled-components"

import RoomApi, {EventType} from "../../api/RoomApi"
import aurora from "./assets/aurora1024.jpg"
import StatusPane from "./components/StatusPane"

const StatusWrapper = styled.div`
	background-image: url(${aurora});
	background-repeat: no-repeat;
	height: 100vh;
	width: 100vw;
	background-position: center;
	background-size: cover;
	display:flex;
	flex-direction: column;
`

const ConferenceRoomStatus = () => {
	
	const [loading, setLoading] = useState<boolean>(false)
	const [events, setEvents] = useState<EventType[]>([])
	const [error, setError] = useState<string>()
	/*const [roomName, setRoomName] = useState<string>("Raum")*/
	
	const [currentTime, setCurrentTime] = useState<Date>(new Date())
	
	const {roomId} = useParams()
	
	// fetches the events periodically
	useEffect(() => {
		let theTimeout: number
		
		async function loadEvents() {
			if (!roomId) return
			setLoading(true)
			setError("")
			try {
				const events = await RoomApi.getEvents(roomId)
				setEvents(events.sort((a, b) => a.start.getTime() - b.start.getTime()))
			} catch (e) {
				setError("Error loading, will retry automatically")
			} finally {
				setLoading(false)
				theTimeout = setTimeout(loadEvents, 60000)
			}
		}
		
		loadEvents().then(() => {
		})
		return () => clearTimeout(theTimeout)
	}, [roomId])
	
	// takes care that time is updated every second
	useEffect(() => {
		const theInterval = setInterval(() => setCurrentTime(new Date()), 1000)
		return () => clearInterval(theInterval)
	})
	
	//Loads the room name, once
	/*useEffect(() => {
		let theTimeout: number
		
		async function fetchRoomInfo() {
			if (!roomId) return
			try {
				const roomInfo = await RoomApi.getRoom(roomId)
				setRoomName(roomInfo.displayName)
			} catch (e) {
				theTimeout = setTimeout(fetchRoomInfo, 5000)
			}
		}
		
		fetchRoomInfo().then(() => {
		})
		
		return () => clearTimeout(theTimeout)
	}, [roomId])*/
	
	return (!events.length && loading) ? <div>loading...</div> :
		(!events.length && error) ? <div>{error}</div> :
			<StatusWrapper>
				<StatusPane currentTime={currentTime} events={events}/>
			</StatusWrapper>
}

export default React.memo(ConferenceRoomStatus)