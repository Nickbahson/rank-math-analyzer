import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'
import { includes } from 'lodash'

class KeywordIn10Percent extends Analysis {

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
		let getWords         = researcher.getResearch( 'getWords' )
		let words            = getWords( paper.getTextLower() )

		if ( false === words || 0 === words.length ) {
			return null
		}

		if ( 400 < words.length ) {
			words = words.slice( 0, Math.floor( words.length * 0.1 ) )
		}
		words = words.join( ' ' )

		const hasKeyword = includes( words, paper.getLower( 'keyword' ) )
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
		return hasKeyword ? wp.hooks.applyFilters( 'rankMath/analysis/keywordIn10Percent/score', 3 ) : null
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
			i18n.__( 'Focus Keyword appears in the first 10% of the content.', 'rank-math-analyzer' ) :
			i18n.__( 'Focus Keyword doesn\'t appear at the beginning of your content.', 'rank-math-analyzer' )
	}
}

export default KeywordIn10Percent
