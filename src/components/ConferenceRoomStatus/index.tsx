import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import RoomApi, {EventType} from "../../api/RoomApi"
import styled from "styled-components"
import CurrentStatusInfo from "./components/CurrentStatusInfo"
import UpcomingEvents from "./components/UpcomingEvents"
import useWindowDimensions from "./tools/useWindowDimensions"

const StatusWrapper = styled.div<{ isPortrait: boolean }>`
	display: flex;
	flex-direction: ${props => props.isPortrait ? "column" : "row"};
	flex-wrap: wrap;
	align-items: stretch;
	height:100%;
`

const ConferenceRoomStatus = () => {
	
	const [loading, setLoading] = useState<boolean>(false)
	const [events, setEvents] = useState<EventType[]>([])
	const [error, setError] = useState<string>()
	const [roomName, setRoomName] = useState<string>("Raum")
	const windowDimensions = useWindowDimensions()
	
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
	useEffect(() => {
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
	}, [roomId])
	
	return (!events.length && loading) ? <div>loading...</div> :
		(!events.length && error) ? <div>{error}</div> :
			<StatusWrapper isPortrait={windowDimensions.width < windowDimensions.height}>
				<CurrentStatusInfo roomName={roomName} currentTime={currentTime} events={events}/>
				<UpcomingEvents events={events} currentTime={currentTime}/>
			</StatusWrapper>
}

/*
* 	<RoomInfo roomName={roomName}/>
				<div>{currentTime.toLocaleString()}</div>
				<br/>
				<div>Next Event: {JSON.stringify(nextEvent)}</div>
				<div>Free until: {nextEvent ? moment(nextEvent.start).format("HH:mm") : "tomorrow"}</div>
				<div>{events.length} Events</div>
* */

export default ConferenceRoomStatus