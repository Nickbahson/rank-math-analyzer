import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'

class LinksHasInternal extends Analysis {

	/**
	 * Create new analysis result instance.
	 *
	 * @return {AnalysisResult} New instance.
	 */
	newResult( i18n ) {
		return new AnalysisResult()
			.setEmpty( i18n.__( 'Add internal links in your content.', 'rank-math-analyzer' ) )
			.setTooltip( i18n.__( 'Internal links decrease your bounce rate and improve SEO.', 'rank-math-analyzer' ) )
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
			.setScore( this.calculateScore( 0 < statistics.internalTotal ) )
			.setText(
				i18n.sprintf(
					this.translateScore( analysisResult, i18n ),
					statistics.internalTotal
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
	 * @param {Boolean} hasInternal Title has number or not.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( hasInternal ) {
		return hasInternal ? wp.hooks.applyFilters( 'rankMath/analysis/linksHasInternal/score', 5 ) : null
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
			i18n.__( 'You are linking to other resources on your website which is great.', 'rank-math-analyzer' ) :
			i18n.__( 'We couldn\'t find any internal links in your content.', 'rank-math-analyzer' )
	}
}

export default LinksHasInternal
