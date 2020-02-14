import React from "react"
import styled from "styled-components"
import moment from "moment"

const StyledTime = styled.div`
	font-weight: bold;
	font-size: 3em;
`

type LargeTimeParams = {
	time: Date
}

const LargeTime = ({time}: LargeTimeParams) => {
	return <StyledTime>
		{moment(time).format("HH:mm")}
	</StyledTime>
}

export default React.memo(LargeTime)