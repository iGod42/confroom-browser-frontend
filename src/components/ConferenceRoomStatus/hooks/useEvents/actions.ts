import EventActionType, {EventsAction} from "./interface/EventActionType"

export const startLoad = (): EventsAction => ({
	type: EventActionType.StartLoad
})

export const stopLoad = (): EventsAction => ({
	type: EventActionType.StopLoad
})