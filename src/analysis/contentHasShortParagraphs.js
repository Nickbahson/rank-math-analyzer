import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'

class ContentHasShortParagraphs extends Analysis {

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
		const analysisResult   = new AnalysisResult
		const getParagraphs    = researcher.get( 'getParagraphs' )
		const paragraphs       = getParagraphs( paper.getText() )
		const hasBigParagraphs = paragraphs.some( ( paragraph ) => {
			return 120 < paragraph.wordCount
		})

		analysisResult.setScore( this.calculateScore( hasBigParagraphs ) )
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
		return paper.hasText()
	}

	/**
	 * Calculates the score based on the url length.
	 *
	 * @param {Boolean} hasBigParagraphs Title has number or not.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( hasBigParagraphs ) {
		return hasBigParagraphs ? null : rankMath.hooks.applyFilters( 'rankMath/analysis/contentHasShortParagraphs/score', 3 )
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
			i18n.__( 'Kudos! You are using short paragraphs.', 'rank-math-analyzer' ) :
			i18n.__( 'At least one paragraph is long. Consider using short paragraphs.', 'rank-math-analyzer' )
	}
}

export default ContentHasShortParagraphs
