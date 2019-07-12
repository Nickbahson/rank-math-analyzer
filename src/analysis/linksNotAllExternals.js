import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'

class LinksNotAllExternals extends Analysis {

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
		const linkStatistics = researcher.getResearch( 'getLinkStats' )
		const statistics     = linkStatistics( paper.getText() )

		if ( null === statistics.anchors ) {
			analysisResult.setText( il8n.__( 'Add DoFollow links pointing to external resources.', 'rank-math-analyzer' ) )
			return analysisResult
		}

		analysisResult.setScore( this.calculateScore( 0 < statistics.externalDofollow ) )
		analysisResult.setText(
			i18n.sprintf(
				this.translateScore( analysisResult, il8n ),
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
	 * @return {boolean} True when there is text.
	 */
	isApplicable( paper ) {
		return paper.hasText()
	}

	/**
	 * Calculates the score based on the url length.
	 *
	 * @param {Boolean} hasExternalDofollow Title has number or not.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( hasExternalDofollow ) {
		return hasExternalDofollow ? wp.hooks.applyFilters( 'rankMath/analysis/linksNotAllExternals/score', 2 ) : null
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
			i18n.__( 'At least one external link with DoFollow found in your content.', 'rank-math-analyzer' ) :
			i18n.__( 'We found %1$s outbound links in your content and all of them are nofollow.', 'rank-math-analyzer' )
	}
}

export default LinksNotAllExternals
