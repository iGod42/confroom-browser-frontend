import {styled} from "@material-ui/core/styles"
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

export default StatusWrapper