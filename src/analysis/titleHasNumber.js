import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'

class TitleHasNumber extends Analysis {

	/**
	 * Executes the assessment and return its result
	 *
	 * @param  {Paper}      paper      The paper to run this assessment on.
	 * @param  {Researcher} researcher The researcher used for the assessment.
	 * @param  {Object}     il8n       The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
	 */
	getResult( paper, researcher, il8n ) {
		const analysisResult = new AnalysisResult
		const hasNumber      = /\d+/.test( paper.getTitle() )

		analysisResult.setScore( this.calculateScore( hasNumber ) )
		analysisResult.setText( this.translateScore( analysisResult, il8n ) )

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
		return paper.hasTitle()
	}

	/**
	 * Calculates the score based on the url length.
	 *
	 * @param {Boolean} hasNumber Title has number or not.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( hasNumber ) {
		return hasNumber ? rankMath.hooks.applyFilters( 'rankMath/analysis/titleHasNumber/score', 4 ) : null
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
	 * @param {Jed}            i18n           The object used for translations.
	 *
	 * @return {string} The translated string.
	 */
	translateScore( analysisResult, i18n ) {
		return analysisResult.hasScore() ?
			i18n.__( 'You are using a number in your SEO title.', 'rank-math-analyzer' ) :
			i18n.__( 'Your SEO title doesn\'t contain a number.', 'rank-math-analyzer' )
	}
}

export default TitleHasNumber
