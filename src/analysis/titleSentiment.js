import Sentiment from 'sentiment'
import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'
import sentimentWords from './config/sentimentWords'

class TitleSentiment extends Analysis {

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
		const sentiment      = new Sentiment
		const sentimentScore = sentiment.analyze( paper.getLower( 'title' ), sentimentWords ).score

		analysisResult.setScore( this.calculateScore( sentimentScore ) )
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
		return rankMath.isUserRegistered && paper.hasTitle() && 'en' === paper.getLocale()
	}

	/**
	 * Calculates the score based on the sentiment score.
	 *
	 * @param {Boolean} sentimentScore Sentiment score.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( sentimentScore ) {
		return 0 !== sentimentScore ? rankMath.hooks.applyFilters( 'rankMath/analysis/titleSentiment/score', 1 ) : null
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
			i18n.__( 'Your title has a positive or a negative sentiment.', 'rank-math-analyzer' ) :
			i18n.sprintf(
				i18n.__( 'Your title doesn\'t contain a %1$s word.', 'rank-math-analyzer' ),
				'<a href="' + rankMath.assessor.sentimentKbLink + '" target="_blank">positive or a negative sentiment</a>'
			)
	}
}

export default TitleSentiment
