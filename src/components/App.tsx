import React from "react"
import styled from "styled-components"
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"
import RoomSelection from "./RoomSelection"
import ConferenceRoomStatus from "./ConferenceRoomStatus"

const Wrapper = styled.div`
`

const App = () => {
	return (
		<Wrapper>
			<Router>
				<Switch>
					<Route path="/status/:roomId">
						<ConferenceRoomStatus/>
					</Route>
					<Route path="*">
						<RoomSelection/>
					</Route>
				</Switch>
			</Router>
		</Wrapper>
	)
}

export default App
