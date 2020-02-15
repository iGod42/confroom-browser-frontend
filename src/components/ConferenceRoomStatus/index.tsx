import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {styled} from "@material-ui/core/styles"

import RoomApi, {EventType} from "../../api/RoomApi"
import aurora from "./assets/aurora1024.jpg"
import StatusPane from "./components/StatusPane"
import Box from "@material-ui/core/Box"

const StatusWrapper = styled(Box)({
	backgroundImage: `url(${aurora})`,
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
	backgroundSize: "cover",
	height: "100vh",
	width: "100vw",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center"
})

const ConferenceRoomStatus = () => {
	
	const [loading, setLoading] = useState<boolean>(false)
	const [events, setEvents] = useState<EventType[]>([])
	const [error, setError] = useState<string>()
	
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
				theTimeout = window.setTimeout(loadEvents, 60000)
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
	
	return (!events.length && loading) ? <div>loading...</div> :
		(!events.length && error) ? <div>{error}</div> :
			<StatusWrapper>
				<StatusPane currentTime={currentTime} events={events}/>
			</StatusWrapper>
}

export default React.memo(ConferenceRoomStatus)