import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {styled} from "@material-ui/core/styles"

import io from "socket.io-client"

import RoomApi, {EventType} from "../../api/RoomApi"
import StatusPane from "./components/StatusPane"
import Box from "@material-ui/core/Box"

const StatusWrapper = styled(Box)(({theme}) => {
	return ({
		backgroundImage: `url(${(theme as any).background})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
		height: "100vh",
		width: "100vw",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center"
	})
	
})

type EventUpdate = {
	type: "addedOrUpdated" | "removed",
	id: string,
	event?: EventType
}

const mapSocksEvtType = (evt: any): EventType => {
	return {
		...evt,
		start: new Date(evt.start),
		end: new Date(evt.end)
	}
}

const ConferenceRoomStatus = ({socketUrl}: { socketUrl: string }) => {
	
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
				const loadedEvents = await RoomApi.getEvents(roomId)
				
				setEvents(loadedEvents.sort((a, b) => a.start.getTime() - b.start.getTime()))
			} catch (e) {
				setError("Error loading, will retry automatically")
			} finally {
				setLoading(false)
				//theTimeout = window.setTimeout(loadEvents, 60000)
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
	
	useEffect(() => {
		const socket = io(`${socketUrl}?roomId=${roomId}`)
		socket.on("update", (updates: EventUpdate[]) => {
			const newEvents = events
				.filter(evt => !updates.find(change => change.id === evt.id)) // fitler updated ones
				.concat(updates
					.filter(change => change.type !== "removed") // filter out the removed ones to not add them again
					.map((change) => change.event) // and map them to be nice events
					.map(mapSocksEvtType)
				)
			setEvents(newEvents)
		})
		
		return () => {
			socket.disconnect()
		}
	}, [events, socketUrl, roomId])
	
	return (!events.length && loading) ? <div>loading...</div> :
		(!events.length && error) ? <div>{error}</div> :
			<StatusWrapper>
				<StatusPane currentTime={currentTime} events={events}/>
			</StatusWrapper>
}

export default React.memo(ConferenceRoomStatus)