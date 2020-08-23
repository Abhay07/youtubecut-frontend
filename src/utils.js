export function checkTimeFormat(text){
	const timeRegex = /^[0-9]{1,2}$/;
	if(!text.match(timeRegex)){
		return false;
	}
	return true;
}


export function parseTime(sec){
	const minutes = Math.floor(sec/60);
	const seconds = sec%60;
	return `${minutes}:${seconds}`;
}