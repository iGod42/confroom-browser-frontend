import {useReducer} from "react"
import reducer, {init} from "./reducer"
import thunk from "./thunk"

export default (roomId: string) => {
	const [state, dispatch] = useReducer(reducer, undefined, init)
	const theThunk = thunk(dispatch, reducer)
	
	return [state, theThunk]
}