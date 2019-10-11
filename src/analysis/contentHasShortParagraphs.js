/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'

/**
 * Internal dependencies
 */
import Analysis from '@root/Analysis'
import AnalysisResult from '@root/AnalysisResult'

class ContentHasShortParagraphs extends Analysis {
	/**
	 * Create new analysis result instance.
	 *
	 * @param {Jed} i18n The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} New instance.
	 */
	newResult( i18n ) {
		return new AnalysisResult()
			.setEmpty( i18n.__( 'Add short and concise paragraphs for better readability and UX.', 'rank-math-analyzer' ) )
			.setTooltip( i18n.__( 'Short paragraphs are easier to read and more pleasing to the eye. Long paragraphs scare the visitor, and they might result to SERPs looking for better readable content.', 'rank-math-analyzer' ) )
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
		const getParagraphs = researcher.getResearch( 'getParagraphs' )
		const hasBigParagraphs = getParagraphs( paper.getText() )
			.some( ( paragraph ) => 120 < paragraph.wordCount )

		analysisResult
			.setScore( this.calculateScore( hasBigParagraphs ) )
			.setText( this.translateScore( analysisResult, i18n ) )

		return analysisResult
	}

	/**
	 * Checks whether the paper has text.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @return {boolean} True when requirements meet.
	 */
	isApplicable( paper ) {
		return paper.hasText()
	}

	/**
	 * Calculates the score based on the url length.
	 *
	 * @param {boolean} hasBigParagraphs Title has number or not.
	 *
	 * @return {number} The calculated score.
	 */
	calculateScore( hasBigParagraphs ) {
		return hasBigParagraphs ? null : applyFilters( 'rankMath/analysis/contentHasShortParagraphs/score', 3 )
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
			i18n.__( 'You are using short paragraphs.', 'rank-math-analyzer' ) :
			i18n.__( 'At least one paragraph is long. Consider using short paragraphs.', 'rank-math-analyzer' )
	}
}

export default ContentHasShortParagraphs
