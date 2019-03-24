import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'

class LengthPermalink extends Analysis {

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
		const analysisResult  = new AnalysisResult
		const permalinkLength = paper.getUrl().length

		analysisResult.setScore( this.calculateScore( permalinkLength ) )
		analysisResult.setText(
			i18n.sprintf(
				this.translateScore( analysisResult, il8n ),
				permalinkLength
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
		return paper.hasUrl()
	}

	/**
	 * Calculates the score based on the url length.
	 *
	 * @param {String} permalink Url to run the analysis on .
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( permalink ) {
		return 75 < permalink.length ? null : rankMath.hooks.applyFilters( 'rankMath/analysis/permalinkLength', 4 )
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
			i18n.__( 'URL is %1$s characters long. Kudos!', 'rank-math-analyzer' ) :
			i18n.__( 'URL is %1$s characters long. Considering shortening it.', 'rank-math-analyzer' )
	}
}
