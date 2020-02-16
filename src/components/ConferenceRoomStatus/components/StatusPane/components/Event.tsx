import React, {useEffect, useState} from "react"
import moment from "moment"
import {styled, Theme} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import {Box} from "@material-ui/core"
import Divider from "@material-ui/core/Divider"
import Collapse from "@material-ui/core/Collapse"

import * as EventTools from "../../../tools/EventTools"
import {EventType} from "../../../../../api/RoomApi"

type EventProps = {
	event: EventType | null,
	bottomDivider: boolean,
	isCurrent: boolean,
	appear: boolean,
	disappear: boolean
}

const Wrapper = styled(Box)(({theme, active}: { theme: Theme, active: number }) => ({
	display: "flex",
	color: active ? theme.palette.error.main : "inherit"
}))

const Event = ({event, bottomDivider, isCurrent, appear, disappear}: EventProps) => {
	const [collapsed, setCollapsed] = useState<boolean>(appear)
	
	useEffect(() => {
		if (appear)
			setCollapsed(false)
		else if (disappear)
			setCollapsed(true)
	})
	
	return (<Collapse in={!collapsed}>
			{
				event ?
					<Box>
						<Wrapper active={isCurrent ? 1 : 0}>
							<Box flexShrink={0}>
								<Typography variant="subtitle2">{moment(event.start).format("HH:mm")}</Typography>
								<Typography variant="caption">{EventTools.getFormattedDuration(event)}</Typography>
							</Box>
							<Box ml={2}><Typography variant="body1">{event.subject}</Typography></Box>
						</Wrapper>
						{bottomDivider ? <Box mt={1} mb={1}><Divider/></Box> : null}
					</Box> :
					<Typography variant="overline" align="center">No more events today</Typography>
			}
		</Collapse>
	)
}

Event.defaultProps = {
	appear: false,
	disappear: false
}

export default React.memo(Event)