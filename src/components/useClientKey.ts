import {useLocation} from "react-router-dom"

export default (): string => {
	const {search} = useLocation()
	const clientKey = search.split(/[?&]/).find(qp => qp.match(/^client_key/))
	if (!clientKey)
		throw new Error("client_key URL Param needs to be passed")
	
	return clientKey
}