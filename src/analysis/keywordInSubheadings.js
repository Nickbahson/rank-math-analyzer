import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'
import { includes } from 'lodash'

class KeywordInSubheadings extends Analysis {

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
		const analysisResult  = new AnalysisResult
		const subheadingRegex = new RegExp( '<h[2-6][^>]*>.*' + paper.getLower( 'keyword' ) + '.*</h[2-6]>', 'gi' )
		const hasKeyword      = null !== paper.getTextLower().match( subheadingRegex ) ? true : false

		analysisResult.setScore( this.calculateScore( hasKeyword ) )
		analysisResult.setText( this.translateScore( analysisResult, i18n ) )

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
		return paper.hasKeyword() && paper.hasText()
	}

	/**
	 * Calculates the score based on the url length.
	 *
	 * @param {Boolean} hasKeyword Title has number or not.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( hasKeyword ) {
		return hasKeyword ? wp.hooks.applyFilters( 'rankMath/analysis/keywordInSubheadings/score', 3 ) : null
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
			i18n.__( 'Focus Keyword found in the subheading(s).', 'rank-math-analyzer' ) :
			i18n.__( 'Focus Keyword not found in subheading(s) like H2, H3, H4, etc..', 'rank-math-analyzer' )
	}
}

export default KeywordInSubheadings
