import {createMuiTheme} from "@material-ui/core/styles"
import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme"

const options: ThemeOptions = ({
	palette: {
		type: "dark",
		primary: {
			main: "#233246"
		},
		secondary: {
			main: "#00ffc8"
		}
	}
})

export default createMuiTheme(options)