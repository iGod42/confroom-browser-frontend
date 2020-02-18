import React from "react"
import {styled} from "@material-ui/core/styles"
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"
import RoomSelection from "./RoomSelection"
import ConferenceRoomStatus from "./ConferenceRoomStatus"

const Wrapper = styled("div")({
	width: "100vw",
	height: "100vh",
	position: "absolute"
})

type AppProps = {
	socketUrl: string
}

const App = ({socketUrl}: AppProps) => {
	return (
		<Wrapper>
			<Router>
				<Switch>
					<Route path="/status/:roomId">
						<ConferenceRoomStatus socketUrl={socketUrl}/>
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
