/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'

/**
 * Internal dependencies
 */
import Analysis from '@root/Analysis'
import AnalysisResult from '@root/AnalysisResult'

class LinksNotAllExternals extends Analysis {
	/**
	 * Create new analysis result instance.
	 *
	 * @param {Jed} i18n The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} New instance.
	 */
	newResult( i18n ) {
		return new AnalysisResult()
			.setEmpty( i18n.__( 'Add DoFollow links pointing to external resources.', 'rank-math-analyzer' ) )
			.setTooltip( i18n.__( 'PageRank Sculpting no longer works. Your posts should have a mix of nofollow and DoFollow links.', 'rank-math-analyzer' ) )
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
		const linkStatistics = researcher.getResearch( 'getLinkStats' )
		const statistics = linkStatistics( paper.getText() )

		if ( null === statistics.anchors ) {
			analysisResult.setText( i18n.__( 'Add DoFollow links pointing to external resources.', 'rank-math-analyzer' ) )
			return analysisResult
		}

		analysisResult
			.setScore( this.calculateScore( 0 < statistics.externalDofollow ) )
			.setText(
				i18n.sprintf(
					this.translateScore( analysisResult, i18n ),
					statistics.externalTotal
				)
			)

		return analysisResult
	}

	/**
	 * Checks whether the paper has a url.
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
	 * @param {boolean} hasExternalDofollow Title has number or not.
	 *
	 * @return {number} The calculated score.
	 */
	calculateScore( hasExternalDofollow ) {
		return hasExternalDofollow ? applyFilters( 'rankMath/analysis/linksNotAllExternals/score', 2 ) : null
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
			i18n.__( 'At least one external link with DoFollow found in your content.', 'rank-math-analyzer' ) :
			i18n.__( 'We found %1$s outbound links in your content and all of them are nofollow.', 'rank-math-analyzer' )
	}
}

export default LinksNotAllExternals
