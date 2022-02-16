/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'

/**
 * Internal dependencies
 */
import links from '@config/links'
import Analysis from '@root/Analysis'
import AnalysisResult from '@root/AnalysisResult'

class ContentAI extends Analysis {
	/**
	 * Create new analysis result instance.
	 *
	 * @param {Jed} i18n The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} New instance.
	 */
	newResult( i18n ) {
		return new AnalysisResult()
			.setMaxScore( this.getScore() )
			.setEmpty( i18n.__( 'Use Content AI to optimise the post.', 'rank-math' ) )
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
		const hasContentAI = false !== paper.get( 'contentAI' )
		analysisResult
			.setScore( this.calculateScore( hasContentAI ) )
			.setText( this.translateScore( analysisResult, i18n ) )

		return analysisResult
	}

	/**
	 * Checks whether paper meet analysis requirements.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @return {boolean} True when requirements meet.
	 */
	isApplicable( paper ) {
		return false !== paper.get( 'contentAI' )
	}

	/**
	 * Calculates the score based on the url length.
	 *
	 * @param {boolean} hasContentAI Title has number or not.
	 *
	 * @return {number} The calculated score.
	 */
	calculateScore( hasContentAI ) {
		return hasContentAI ? this.getScore() : null
	}

	/**
	 * Get analysis max score.
	 *
	 * @return {number} Max score an analysis has
	 */
	getScore() {
		return applyFilters( 'rankMath_analysis_contentAI', 5 )
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
			i18n.sprintf(
				/* Translators: Placeholder expands to "Content AI" with a link to the corresponding KB article. */
				i18n.__( 'You are using %1$s to optimise this Post.', 'rank-math' ),
				'<a href="' + links.contentAILink + '" target="_blank">Content AI</a>'
			) :
			i18n.sprintf(
				/* Translators: Placeholder expands to "Content AI" with a link to the corresponding KB article. */
				i18n.__( 'You are not using %1$s to optimise this Post.', 'rank-math' ),
				'<a href="' + links.contentAILink + '" target="_blank">Content AI</a>'
			)
	}
}

export default ContentAI
