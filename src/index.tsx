import React from "react"
import ReactDOM from "react-dom"
import {ThemeProvider} from "@material-ui/core/styles"
import {ThemeProvider as StyledCompThemeProvider} from "styled-components"
import CssBaseline from "@material-ui/core/CssBaseline"

import * as serviceWorker from "./serviceWorker"

import theme from "./assets/Theme"
import App from "./components/App"

ReactDOM.render(<ThemeProvider theme={theme}>
	<StyledCompThemeProvider theme={theme}>
		<CssBaseline/>
		<App/>
	</StyledCompThemeProvider>
</ThemeProvider>, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
