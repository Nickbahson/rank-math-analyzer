import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'

class LinksHasExternals extends Analysis {

	/**
	 * Create new analysis result instance.
	 *
	 * @return {AnalysisResult} New instance.
	 */
	newResult( i18n ) {
		return new AnalysisResult()
			.setEmpty( i18n.__( 'Link out to external resources.', 'rank-math-analyzer' ) )
			.setTooltip( i18n.__( 'It helps visitors read more about a topic and prevents pogosticking.', 'rank-math-analyzer' ) )
	}

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
		const analysisResult = this.newResult( i18n )
		const linkStatistics = researcher.getResearch( 'getLinkStats' )
		const statistics     = linkStatistics( paper.getText() )

		if ( null === statistics.anchors ) {
			return analysisResult
		}

		analysisResult
			.setScore( this.calculateScore( 0 < statistics.externalTotal ) )
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
		return hasExternalDofollow ? wp.hooks.applyFilters( 'rankMath/analysis/linksHasExternals/score', 4 ) : null
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
			i18n.__( 'Great! You are linking to external resources.', 'rank-math-analyzer' ) :
			i18n.__( 'No outbound links were found. Link out to external resources.', 'rank-math-analyzer' )
	}
}

export default LinksHasExternals
