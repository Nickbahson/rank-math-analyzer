import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'
import { inRange } from 'lodash'

class KeywordDensity extends Analysis {

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
		const analysisResult = new AnalysisResult
		const stripTags      = researcher.getResearch( 'stripTags' )
		let wordCount        = researcher.getResearch( 'wordCount' )

		wordCount = wordCount( paper.getTextLower() )
		if ( false === wordCount || 0 === wordCount.length  || paper.getKeywordCombination( researcher ) ) {
			return null
		}

		// Keyword Density & Focus Keyword occurrences
		const regex          = new RegExp( paper.getKeywordCombination( researcher ).join( '|' ), 'gi' )
		const count          = ( stripTags( paper.getText() ).match( regex ) || []).length
		const keywordDensity = ( ( count / words.length ) * 100 ).toFixed( 2 )

		analysisResult.setScore( this.calculateScore( keywordDensity ) )
		analysisResult.setText(
			i18n.sprintf(
				i18n.__( 'Keyword Density is %1$s, the Focus Keyword and combination appears %2$s times.', 'rank-math-analyzer' ),
				keywordDensity,
				count
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
	 * @param {Boolean} keywordDensity Title has number or not.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( keywordDensity ) {
		const scores = this.getScores()

		if ( 0.5 > keywordDensity || 2.5 < keywordDensity ) {
			return scores.fail
		}

		if ( inRange( keywordDensity, 0.5, 0.75 ) ) {
			return scores.fair
		}

		if ( inRange( keywordDensity, 0.76, 1.0 ) ) {
			return scores.good
		}

		return scores.best
	}

	getScores() {
		return wp.hooks.applyFilters(
			'rankMath/analysis/keywordDensity/score',
			{
				fail: 0,
				fair: 2,
				good: 3,
				best: 6
			}
		)
	}
}

export default KeywordDensity
