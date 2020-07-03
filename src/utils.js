export function checkTimeFormat(text){
	const timeRegex = /^[0-9]{1,2}$/;
	if(!text.match(timeRegex)){
		return false;
	}
	return true;
}