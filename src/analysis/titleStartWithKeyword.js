import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'

class TitleStartWithKeyword extends Analysis {

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
		const analysisResult   = new AnalysisResult
		const title            = paper.getLower( 'title' )
		const keywordPosition  = title.indexOf( paper.getLower( 'keyword' ) )
		const titleHalfLength  = Math.floor( title.length / 2 )
		const startWithKeyword = 0 <= keywordPosition && keywordPosition < titleHalfLength ? true : false

		analysisResult.setScore( this.calculateScore( startWithKeyword ) )
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
		return paper.hasKeyword() && paper.hasTitle()
	}

	/**
	 * Calculates the score based on the url length.
	 *
	 * @param {Boolean} startWithKeyword Title has number or not.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( startWithKeyword ) {
		return startWithKeyword ? wp.hooks.applyFilters( 'rankMath/analysis/titleStartWithKeyword/score', 3 ) : null
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
	 * @param {Jed}            i18n           The object used for translations.
	 *
	 * @return {String} The translated string.
	 */
	translateScore( analysisResult, i18n ) {
		return analysisResult.hasScore() ?
			i18n.__( 'Focus Keyword used at the beginning of SEO title.', 'rank-math-analyzer' ) :
			i18n.__( 'Focus Keyword doesn\'t appear at the beginning of SEO title.', 'rank-math-analyzer' )
	}
}

export default TitleStartWithKeyword
