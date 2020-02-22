import {useEffect, useState} from "react"

export default function () {
	
	const [currentTime, setCurrentTime] = useState<Date>(new Date())
	useEffect(() => {
		let theInterval: NodeJS.Timeout
		const updateDate = () => {
			const theTime = new Date()
			setCurrentTime(theTime)
			theInterval = setTimeout(updateDate, 60000 - theTime.getSeconds() * 1000)
		}
		updateDate()
		return () => clearInterval(theInterval)
	}, [])
	
	return currentTime
}