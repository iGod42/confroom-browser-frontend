import React from "react"
import styled from "styled-components"

type RoomInfoProps = {
	roomName: string
}

const StyledName = styled.div`
	font-size: 1.5em;
	margin: 0.5em 0;
	color: #00FFC8;
`

const RoomInfo = ({roomName}: RoomInfoProps) => {
	
	return <StyledName>{roomName}</StyledName>
}

export default React.memo(RoomInfo)