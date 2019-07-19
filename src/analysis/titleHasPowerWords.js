import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'
import { includes } from 'lodash'

class TitleHasPowerWords extends Analysis {

	/**
	 * Create new analysis result instance.
	 *
	 * @return {AnalysisResult} New instance.
	 */
	newResult( i18n ) {
		return new AnalysisResult()
			.setEmpty(
				i18n.sprintf(
					i18n.__( 'Add %s to your title to increase CTR.', 'rank-math-analyzer' ),
					'<a href="https://sumo.com/stories/power-words" target="_blank">power words</a>'
				)
			)
			.setTooltip( i18n.__( 'Power Words are tried-and-true words that copywriters use to attract more clicks.', 'rank-math-analyzer' ) )
	}

	/**
	 * Executes the assessment and return its result
	 *
	 * @param  {Paper}      paper      The paper to run this assessment on.
	 * @param  {Researcher} researcher The researcher used for the assessment.
	 * @param  {Object}     i18n       The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
	 */
	getResult( paper, researcher, i18n ) {
		const analysisResult = this.newResult( i18n )
		const title            = paper.getLower( 'title' )
		const powerWordsInText = rankMath.assessor.powerWords.filter( word => includes( title, word ) )
		const hasPowerWords    = 0 < powerWordsInText.length

		analysisResult
			.setScore( this.calculateScore( hasPowerWords ) )
			.setText(
				i18n.sprintf(
					this.translateScore( analysisResult, i18n ),
					powerWordsInText.length
				)
			)

		return analysisResult
	}

	/**
	 * Checks whether the paper has a url.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @return {boolean} True when there is text.
	 */
	isApplicable( paper ) {
		return rankMath.isUserRegistered && 'en' === paper.getLocale()
	}

	/**
	 * Calculates the score based on the url length.
	 *
	 * @param {Boolean} hasPowerWords Title has power words or not.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( hasPowerWords ) {
		return hasPowerWords ? wp.hooks.applyFilters( 'rankMath/analysis/titleHasPowerWords/score', 1 ) : null
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {AnalysisResult}  analysisResult AnalysisResult with the score and the formatted text.
	 * @param {Jed}            i18n           The object used for translations.
	 *
	 * @return {String} The translated string.
	 */
	translateScore( analysisResult, i18n ) {
		if ( false === rankMath.isUserRegistered ) {
			return i18n.sprintf(
				i18n.__( 'Please connect your %s to calculate the Power Words used.', 'rank-math-analyzer' ),
				'<a href="' + rankMath.assessor.registrationUrl + '" target="_blank">Rank Math account</a>'
			)
		}

		return analysisResult.hasScore() ?
			i18n.__( 'Your title contains %1$s power word(s). Booyah!', 'rank-math-analyzer' ) :
			i18n.sprintf(
				i18n.__( 'Your title doesn\'t contain a %1$s. Add at least one.', 'rank-math-analyzer' ),
				'<a href="https://sumo.com/stories/power-words" target="_blank">power word</a>'
			)
	}
}

export default TitleHasPowerWords
