import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'

class ContentHasTOC extends Analysis {

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
		const hasTOCPlugin   = rankMath.assessor.hasTOCPlugin

		analysisResult.setScore( this.calculateScore( hasTOCPlugin ) )
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
		return paper.hasTitle()
	}

	/**
	 * Calculates the score based on the url length.
	 *
	 * @param {Boolean} hasTOCPlugin Title has number or not.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( hasTOCPlugin ) {
		return hasTOCPlugin ? wp.hooks.applyFilters( 'rankMath/analysis/contentHasTOC/score', 2 ) : null
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
			i18n.sprintf(
				i18n.__( 'You seem to be using a %1$s to break-down your text.', 'rank-math-analyzer' ),
				'<a href="' + rankMath.assessor.tocKbLink + '" target="_blank">Table of Contents plugin</a>'
			) :
			i18n.sprintf(
				i18n.__( 'You don\'t seem to be using a %1$s.', 'rank-math-analyzer' ),
				'<a href="' + rankMath.assessor.tocKbLink + '" target="_blank">Table of Contents plugin</a>'
			)
	}
}

export default ContentHasTOC
