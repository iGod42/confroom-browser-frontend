import config from "../config.json"

export type RoomType = {
	displayName: string,
	id: string
}

async function getRooms(): Promise<Array<RoomType>> {
	return fetch(`${config.hubUrl}/rooms`)
		.then(res => res.json())
}

export default {getRooms}