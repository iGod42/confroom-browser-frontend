import React from "react"
import {RoomType} from "../../../api/RoomApi"
import styled from "styled-components"

type RoomParams = {
	room: RoomType,
	onSelect: () => void
}

const LinkButton = styled.button`
	padding: 1em;
	font-size: medium;
	background: transparent;
	color: white;
	font-weight: bold;
	border-style: solid;
	border-color:white;
	border-width:2px;
	margin: 0 1em 1em 0;
	min-width: 8em;
	flex: 1;
`
const Room = ({room, onSelect}: RoomParams) => <LinkButton onClick={onSelect}>{room.displayName}</LinkButton>

export default Room