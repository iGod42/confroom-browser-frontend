import React from "react"
import Box from "@material-ui/core/Box"
import {Paper} from "@material-ui/core"
import styled from "@material-ui/core/styles/styled"
import Typography from "@material-ui/core/Typography"

const ErrorPaper = styled(Paper)(({theme}) => ({
	backgroundColor: theme.palette.error.main,
	padding: theme.spacing(5)
}))

const ErrorPane = ({message}: { message: string }) => (
	<Box flex={1} padding={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
		<ErrorPaper>
			<Typography variant="h6">{message}</Typography>
		</ErrorPaper>
	</Box>
)

export default ErrorPane