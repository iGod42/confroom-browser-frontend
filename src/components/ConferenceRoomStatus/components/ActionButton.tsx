import {styled} from "@material-ui/core/styles"
import Fab from "@material-ui/core/Fab"

const ActionButton = styled(Fab)(({theme}) => ({
	position: "fixed",
	bottom: theme.spacing(2),
	right: theme.spacing(2)
}))

export default ActionButton