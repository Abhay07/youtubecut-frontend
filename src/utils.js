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

export function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
