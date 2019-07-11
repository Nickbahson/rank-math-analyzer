import {
	has,
	isEmpty,
	isUndefined
} from 'lodash'

/**
 * Researcher class
 */
class Researcher {

	/**
	 * Class constructor.
	 */
	constructor( paper ) {
		this.setPaper( paper )
	}

	/**
	 * Set the Paper.
	 *
	 * @param {Paper} paper The paper
	 */
	setPaper( paper ) {
		this.paper = paper
	}

	/**
	 * Get all researches.
	 *
	 * @returns {Object} An object containing all available researches.
	 */
	getResearches() {
		return this.researches
	}

	/**
	 * Return the Research by name.
	 *
	 * @param {string} name The name to reference the research by.
	 *
	 * @returns {*} Returns the result of the research or false if research does not exist.
	 */
	getResearch( name ) {
		if ( isUndefined( name ) || isEmpty( name ) ) {
			return false
		}

		if ( ! this.hasResearch( name ) ) {
			return false
		}

		return this.getResearches()[ name ]
	}

	/**
	 * Check whether or not the research is known by the Researcher.
	 *
	 * @param {string} name The name to reference the research by.
	 *
	 * @returns {boolean} Whether or not the research is known by the Researcher
	 */
	hasResearch( name ) {
		return has( this.getResearches(), name )
	}
}

export default Researcher
