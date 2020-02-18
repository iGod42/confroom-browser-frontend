import {createMuiTheme} from "@material-ui/core/styles"
import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme"
import background from "./aurora1024.jpg"

type CustomThemeOptions = ThemeOptions & {
	background: string
}

const options: CustomThemeOptions = ({
	palette: {
		type: "dark",
		primary: {
			main: "#233246"
		},
		secondary: {
			main: "#00ffc8"
		}
	},
	background: background
})

export default createMuiTheme(options)