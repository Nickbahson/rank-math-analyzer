import Sentiment from 'sentiment'
import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'
import sentimentWords from '../config/sentimentWords'

class TitleSentiment extends Analysis {
	/**
	 * Create new analysis result instance.
	 *
	 * @param {Jed} i18n The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} New instance.
	 */
	newResult( i18n ) {
		return new AnalysisResult()
			.setEmpty( i18n.__( 'Titles with positive or negative sentiment work best for higher CTR.', 'rank-math-analyzer' ) )
			.setTooltip( i18n.__( 'Headlines with a strong emotional sentiment (positive or negative) tend to receive more clicks.', 'rank-math-analyzer' ) )
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
		const sentiment = new Sentiment
		const sentimentScore = sentiment.analyze( paper.getLower( 'title' ), sentimentWords ).score

		analysisResult
			.setScore( this.calculateScore( sentimentScore ) )
			.setText( this.translateScore( analysisResult, i18n ) )

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
	 * @param {boolean} sentimentScore Sentiment score.
	 *
	 * @return {number} The calculated score.
	 */
	calculateScore( sentimentScore ) {
		return 0 !== sentimentScore ? wp.hooks.applyFilters( 'rankMath/analysis/titleSentiment/score', 1 ) : null
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
		if ( false === rankMath.isUserRegistered ) {
			return i18n.sprintf(
				i18n.__( 'Please connect your %s to calculate the Sentiments of the content.', 'rank-math-analyzer' ),
				'<a href="' + rankMath.assessor.registrationUrl + '" target="_blank">Rank Math account</a>'
			)
		}

		return analysisResult.hasScore() ?
			i18n.__( 'Your title has a positive or a negative sentiment.', 'rank-math-analyzer' ) :
			i18n.sprintf(
				i18n.__( 'Your title doesn\'t contain a %1$s word.', 'rank-math-analyzer' ),
				'<a href="' + rankMath.assessor.registrationUrl + '" target="_blank">positive or a negative sentiment</a>'
			)
	}
}

export default TitleSentiment
