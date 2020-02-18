import {createMuiTheme} from "@material-ui/core/styles"
import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme"

export default function (darkMode: boolean) {
	const background = darkMode ? require("./aurora1024.jpg") : require("./aurora_light.jpg")
	
	type    CustomThemeOptions = ThemeOptions & {
		background: string
	}
	
	const options: CustomThemeOptions = ({
		palette: {
			type: darkMode ? "dark" : "light",
			primary: {
				main: "#233246"
			},
			secondary: {
				main: "#00ffc8"
			}
		},
		background: background
	})
	
	return createMuiTheme(options)
}