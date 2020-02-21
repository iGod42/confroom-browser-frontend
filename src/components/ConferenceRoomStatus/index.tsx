import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {styled} from "@material-ui/core/styles"
import Fab from "@material-ui/core/Fab"

import io from "socket.io-client"

import {EventType, getEvents} from "../../api/RoomApi"
import StatusPane from "./components/StatusPane"
import ErrorPane from "./components/ErrorPane"
import StatusWrapper from "./components/StatusWrapper"
import * as RoomApi from "../../api/RoomApi"
import * as EventTools from "./tools/EventTools"

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

const ActionButton = styled(Fab)(({theme}) => ({
	position: "fixed",
	bottom: theme.spacing(2),
	right: theme.spacing(2)
}))

const ConferenceRoomStatus = ({socketUrl}: { socketUrl: string }) => {
	
	const [loading, setLoading] = useState<boolean>(false)
	const [events, setEvents] = useState<EventType[]>([])
	const [error, setError] = useState<string>()
	const [roomName, setRoomName] = useState<string>("Meeting Room")
	const [apiWorking, setApiWorking] = useState<boolean>(false)
	
	const [currentTime, setCurrentTime] = useState<Date>(new Date())
	
	const {roomId} = useParams()
	
	const currentEvent = EventTools.getCurrentEvent(currentTime, events)
	
	// fetches the events periodically
	useEffect(() => {
		let theTimeout: number
		
		async function loadEvents() {
			if (!roomId) return
			setLoading(true)
			setError("")
			try {
				const loadedEvents = await getEvents(roomId)
				
				setEvents(loadedEvents.sort((a, b) => a.start.getTime() - b.start.getTime()))
			} catch (e) {
				setError("Error loading, will retry automatically")
				theTimeout = window.setTimeout(loadEvents, 60000)
			} finally {
				setLoading(false)
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
			setError("")
			const newEvents = events
				.filter(evt => !updates.find(change => change.id === evt.id)) // fitler updated ones
				.concat(updates
					.filter(change => change.type !== "removed") // filter out the removed ones to not add them again
					.map((change) => change.event) // and map them to be nice events
					.map(mapSocksEvtType)
				)
			setEvents(newEvents)
		})
		
		socket.on("error", (error: number) => {
			setError(error === 401 ?
				"Authentication for the room failed, manual action on the hub is required" :
				"There seems to be an error updating. Please check the hub")
		})
		
		return () => {
			socket.disconnect()
		}
	}, [events, socketUrl, roomId])
	
	useEffect(() => {
		if (!roomId) return
		RoomApi.getRoom(roomId)
			.then(room => {
				if (room?.displayName)
					setRoomName(room.displayName)
			})
	}, [roomId])
	
	const getCleanedCurrentTime = () => new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(),
		currentTime.getHours(), currentTime.getMinutes(), 0, 0)
	
	const bookRoom = async () => {
		if (!roomId || apiWorking) return
		setApiWorking(true)
		try {
			const start = getCleanedCurrentTime()
			
			const nextEventStart =
				EventTools.getFutureEvents(currentTime, events)[0]?.start
				|| new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1)
			
			let end = new Date(start)
			end.setMinutes(end.getMinutes() + 15)
			
			end = nextEventStart < end ? nextEventStart : end
			
			const newEvent = await RoomApi.bookRoom(roomId, start, end)
			
			setEvents(events.concat(newEvent))
			
		} finally {
			setApiWorking(false)
		}
	}
	
	const stopCurrent = async () => {
		const currentEvent = EventTools.getCurrentEvent(currentTime, events)
		if (!currentEvent || !roomId) return
		
		setApiWorking(true)
		
		const update: EventType = {...currentEvent}
		update.end = getCleanedCurrentTime()
		try {
			const newEvent = await RoomApi.updateBooking(roomId, update)
			const cleanEvents = events.filter(evt => evt.id !== update.id)
			setEvents(cleanEvents)
			setEvents(cleanEvents.concat(newEvent))
		} finally {
			setApiWorking(false)
		}
	}
	
	return <StatusWrapper>
		{(!events.length && loading) ? <div>loading...</div> :
			(!events.length && error) ? <ErrorPane message={error}/> :
				<React.Fragment>
					<StatusPane currentTime={currentTime} events={events} roomName={roomName}/>
					{apiWorking ? null : !currentEvent ?
						<ActionButton onClick={bookRoom} color="secondary" variant={"extended"} size="large"><i
							className="material-icons">meeting_room</i>Book 15 min</ActionButton>
						: <ActionButton onClick={stopCurrent} color="secondary" variant={"extended"} size="large"><i
							className="material-icons">check</i>Meeting Done</ActionButton>}
				</React.Fragment>}
	</StatusWrapper>
}

export default React.memo(ConferenceRoomStatus)