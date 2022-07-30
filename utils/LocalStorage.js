export default class LocalStorage {

	static get (key) {
		if (typeof window !== 'undefined')
			return localStorage.getItem(key)
	}

	static set (key, value) {
		if (typeof window !== 'undefined')
			localStorage.setItem(key, value)
	}

	static clear (key) {
		if (typeof window !== 'undefined')
			localStorage.removeItem(key)
	}

}