import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'
import { includes } from 'lodash'

class KeywordInTitle extends Analysis {

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
		const hasKeyword     = includes( paper.getLower( 'title' ), paper.getLower( 'keyword' ) )

		analysisResult.setScore( this.calculateScore( hasKeyword ) )
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
	 * @param {Boolean} hasKeyword Title has number or not.
	 * @param {Paper}   paper      The paper to use for the assessment.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( hasKeyword, paper ) {
		const score = 'en' === paper.getLocale().substring( 0, 2 ) ? 30 : 32
		return hasKeyword ? rankMath.hooks.applyFilters( 'rankMath/analysis/keywordInTitle/score', score ) : null
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
			i18n.__( 'Hurray! You\'re using Focus Keyword in the SEO Title.', 'rank-math-analyzer' ) :
			i18n.__( 'Focus Keyword does not appear in the SEO title.', 'rank-math-analyzer' )
	}
}

export default KeywordInTitle
