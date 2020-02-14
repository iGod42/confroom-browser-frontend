import React from "react"
import {useParams} from "react-router-dom"

const ConferenceRoomStatus = () => {
	const {roomId} = useParams()
	return (<div>I'm conf room Status for room {roomId}</div>)
}

export default ConferenceRoomStatus