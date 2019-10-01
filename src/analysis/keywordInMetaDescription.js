import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'
import { includes } from 'lodash'

class KeywordInMetaDescription extends Analysis {
	/**
	 * Create new analysis result instance.
	 *
	 * @param {Jed} i18n The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} New instance.
	 */
	newResult( i18n ) {
		return new AnalysisResult()
			.setEmpty( i18n.__( 'Add Focus Keyword to your SEO Meta Description.', 'rank-math-analyzer' ) )
			.setTooltip( i18n.__( 'Make sure the focus keyword appears in the SEO description too.', 'rank-math-analyzer' ) )
	}

	/**
	 * Executes the assessment and return its result
	 *
	 * @param {Paper}      paper      The paper to run this assessment on.
	 * @param {Researcher} researcher The researcher used for the assessment.
	 * @param {Jed}        i18n       The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
	 */
	getResult( paper, researcher, i18n ) {
		const analysisResult = this.newResult( i18n )
		const hasKeyword = includes( paper.getLower( 'description' ), paper.getLower( 'keyword' ) )

		analysisResult
			.setScore( this.calculateScore( hasKeyword ) )
			.setText( this.translateScore( analysisResult, i18n ) )

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
		return paper.hasKeyword() && paper.hasDescription()
	}

	/**
	 * Calculates the score based on the url length.
	 *
	 * @param {boolean} hasKeyword Title has number or not.
	 *
	 * @return {number} The calculated score.
	 */
	calculateScore( hasKeyword ) {
		return hasKeyword ? wp.hooks.applyFilters( 'rankMath/analysis/keywordInMetaDescription/score', 2 ) : null
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
	 * @param {Jed}            i18n           The i18n-object used for parsing translations.
	 *
	 * @return {string} The translated string.
	 */
	translateScore( analysisResult, i18n ) {
		return analysisResult.hasScore() ?
			i18n.__( 'Focus Keyword used inside SEO Meta Description.', 'rank-math-analyzer' ) :
			i18n.__( 'Focus Keyword not found in your SEO Meta Description.', 'rank-math-analyzer' )
	}
}

export default KeywordInMetaDescription
