import EventsState from "./interface/EventsState"
import EventsAction from "./interface/EventsAction"

const init = (): EventsState => {

}

const reducer = (roomId: string) => (state: EventsState, action: EventsAction): EventsState => {
	return state
}

export default reducer
export {init}