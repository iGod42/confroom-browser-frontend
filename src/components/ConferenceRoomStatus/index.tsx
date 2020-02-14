import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import RoomApi, {EventType} from "../../api/RoomApi"
import styled from "styled-components"
import moment from "moment"

const StatusWrapper = styled.div`

`

const ConferenceRoomStatus = () => {
	
	const [loading, setLoading] = useState<boolean>(false)
	const [events, setEvents] = useState<EventType[]>([])
	const [error, setError] = useState<string>()
	
	const [currentTime, setCurrentTime] = useState<Date>(new Date())
	
	const {roomId} = useParams()
	
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
	
	useEffect(() => {
		const theInterval = setInterval(() => setCurrentTime(new Date()), 1000)
		return () => clearInterval(theInterval)
	})
	
	const nextEvent = events.filter(evt => evt.start > currentTime)[0]
	
	
	
	return (!events.length && loading) ? <div>loading...</div> :
		(!events.length && error) ? <div>{error}</div> :
			<StatusWrapper>
				<div>{currentTime.toLocaleString()}</div>
				<br/>
				<div>Next Event: {JSON.stringify(nextEvent)}</div>
				<div>Free until: {nextEvent ? moment(nextEvent.start).format("HH:mm") : "tomorrow"}</div>
				<div>{events.length} Events</div>
			</StatusWrapper>
}

export default ConferenceRoomStatus