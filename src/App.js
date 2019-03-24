import config from './config/config'
// import { setLocaleData, sprintf, _n } from '@wordpress/i18n'

class App {

	constructor() {
		this.loadConfig()
		// this.loadLocaleData()

		rankMath.hooks.doAction( 'rankMath.init' )
	}

	loadConfig() {
		this.config = config
	}

	// loadLocaleData() {
	// 	setLocaleData({}, 'rank-math' )
	// }
}

export default App
