export default class DateTime {

	static async ms (time) {
		return new Promise(resolve => {
			setTimeout(resolve, time)
		})
	}

}