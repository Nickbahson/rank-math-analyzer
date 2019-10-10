/**
 * External dependencies
 */
import { reduce } from 'lodash'

/**
 * Analysis result manager.
 */
class ResultManager {
	/**
	 * Class constructor.
	 */
	constructor() {
		this.results = new Map
	}

	/**
	 * Add result.
	 *
	 * @param {string}         keyword   Keyword of which results are.
	 * @param {AnalysisResult} results   Analysis results.
	 * @param {boolean}        isPrimary Is primary keyword.
	 */
	update( keyword, results, isPrimary ) {
		if ( this.results.has( keyword ) ) {
			const oldResults = this.results.get( keyword )
			results = {
				...oldResults.results,
				...results,
			}
		}

		this.results.set(
			keyword,
			{
				results,
				isPrimary,
				score: this.refreshScore( results ),
			}
		)
	}

	/**
	 * Refresh score after results update.
	 *
	 * @param {AnalysisResult} results Analysis results.
	 *
	 * @return {number} Analysis total score.
	 */
	refreshScore( results ) {
		return reduce( results, ( seed, result ) => result.getScore() + seed, 0 )
	}

	/**
	 * Get the available score.
	 *
	 * @param {string} keyword Keyword for which you want score.
	 *
	 * @return {number} Result score.
	 */
	getScore( keyword ) {
		if ( this.results.has( keyword ) ) {
			return this.results.get( keyword ).score
		}

		return 0
	}

	/**
	 * Check if keyword is primary.
	 *
	 * @param {string} keyword Keyword for which you want score.
	 *
	 * @return {boolean} Whether keyword is primary or not.
	 */
	isPrimary( keyword ) {
		if ( this.results.has( keyword ) ) {
			return this.results.get( keyword ).isPrimary
		}

		return false
	}
}

export default ResultManager
