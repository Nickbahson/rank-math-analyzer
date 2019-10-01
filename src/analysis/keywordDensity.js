import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'
import { inRange } from 'lodash'

class KeywordDensity extends Analysis {
	/**
	 * Create new analysis result instance.
	 *
	 * @param {Jed} i18n The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} New instance.
	 */
	newResult( i18n ) {
		return new AnalysisResult()
			.setEmpty( i18n.__( 'Keyword Density is 0. Aim for around 1% Keyword Density.', 'rank-math-analyzer' ) )
			.setTooltip( i18n.__( 'There is no ideal keyword density percentage, but it should not be too high. The most important thing is to keep the copy natural.', 'rank-math-analyzer' ) )
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
		/* eslint @wordpress/no-unused-vars-before-return: 0*/
		const analysisResult = this.newResult( i18n )
		let wordCount = researcher.getResearch( 'wordCount' )

		wordCount = wordCount( paper.getTextLower() )
		if ( false === wordCount || 0 === wordCount.length || paper.getKeywordCombination( researcher ) ) {
			return analysisResult
		}

		// Keyword Density & Focus Keyword occurrence
		const getWords = researcher.getResearch( 'getWords' )
		const words = getWords( paper.getTextLower() )
		const stripTags = researcher.getResearch( 'stripTags' )
		const regex = new RegExp( paper.getKeywordCombination( researcher ).join( '|' ), 'gi' )
		const count = ( stripTags( paper.getText() ).match( regex ) || [] ).length
		const keywordDensity = ( ( count / words.length ) * 100 ).toFixed( 2 )

		analysisResult
			.setScore( this.calculateScore( keywordDensity ) )
			.setText(
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
	 * @param {boolean} keywordDensity Title has number or not.
	 *
	 * @return {number} The calculated score.
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
				best: 6,
			}
		)
	}
}

export default KeywordDensity
