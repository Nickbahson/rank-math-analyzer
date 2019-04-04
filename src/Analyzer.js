import Researcher from './Researcher'
import { filter } from 'lodash'

/**
 * Creates the Analyzer.
 */
class Analyzer {

	i18n = null

	assessments = []

	constructor( i18n, args ) {
		this.setI18n( i18n )
		this.researcher = new Researcher
	}

	/**
	 * Checks if the i18n object is defined and sets it.
	 *
	 * @param {Object} i18n The i18n object used for translations.
	 *
	 * @throws {MissingArgument} Parameter needs to be a valid i18n object.
	 */
	setI18n( i18n ) {
		if ( isUndefined( i18n ) ) {
			throw new Error( 'MissingArgument', 'The assessor requires an i18n object.' )
		}

		this.i18n = i18n
	}

	/**
	  * Runs the researches defined in the tasklist or the default researches.
	  *
	  * @param {Paper} paper The paper to run assessments on.
	  */
	analyze( paper ) {
		this.researcher.setPaper( paper )

		assessments = filter( assessments, ( assessment ) => {
			return assessment.isApplicable( paper, this.researcher )
		})

		this.results = map( assessments, this.executeAnalysis )
	}

	executeAnalysis( analysis ) {

	}
}

export default Analyzer
