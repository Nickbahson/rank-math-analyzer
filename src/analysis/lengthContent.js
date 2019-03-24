import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'

class LengthContent extends Analysis {

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
		const analysisResult  = new AnalysisResult
		const wordCount       = researcher.get( 'wordCount' )

		wordCount = wordCount( paper.getTextLower() )
		if ( false === wordCount || 0 === wordCount.length ) {
			return null
		}

		analysisResult.setScore( this.calculateScore( wordCount.length ) )
		analysisResult.setText(
			i18n.sprintf(
				this.translateScore( analysisResult, il8n ),
				wordCount.length
			)
		)

		return analysisResult
	}

	/**
	 * Checks whether the paper has a text.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @return {boolean} True when there is text.
	 */
	isApplicable( paper ) {
		return paper.hasText()
	}

	/**
	 * Calculates the score based on the word count.
	 *
	 * @param {Integer} wordCount Word count.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( wordCount ) {
		scores    = this.getScores()
		boundries = this.getBoundries()

		if ( boundries.recommended <= wordCount ) {
			return scores.recommended
		}

		if ( inRange( wordCount, boundries.belowRecommended, boundries.recommended ) ) {
			return scores.belowRecommended
		}

		if ( inRange( wordCount, boundries.medium, boundries.belowRecommended ) ) {
			return scores.medium
		}

		if ( inRange( wordCount, boundries.belowMedium, boundries.medium ) ) {
			return scores.belowMedium
		}

		if ( inRange( wordCount, boundries.low, boundries.belowMedium ) ) {
			return scores.low
		}

		return 0
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
			i18n.__( 'Your content is %1$s words long. Good job!', 'rank-math-analyzer' ) :
			i18n.__( 'Your content is %1$s words long. Consider using at least 600 words.', 'rank-math-analyzer' )
	}

	getBoundries() {
		return rankMath.hooks.applyFilters(
			'rankMath/analysis/contentLength/boundries',
			{
				recommended: 2500,
				belowRecommended: 2000,
				medium: 1500,
				belowMedium: 1000,
				low: 600
			}
		)
	}

	getScores() {
		return rankMath.hooks.applyFilters(
			'rankMath/analysis/contentLength/scores',
			{
				recommended: 8,
				belowRecommended: 5,
				medium: 4,
				belowMedium: 3,
				low: 2
			}
		)
	}
}
