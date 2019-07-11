import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'
import { inRange } from 'lodash'

class FleschReading extends Analysis {

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
		const fleschReading   = researcher.getResearch( 'fleschReading' )
		const fleschScore     = fleschReading.calculate( paper.getText() ).ease
		const calculatedScore = this.calculateScore( fleschScore )

		analysisResult.setScore( calculatedScore.score )
		analysisResult.setText(
			il8n.sprintf(
				il8n.__( 'Your Flesch Readability score is %1$s and is regarded as %2$s', 'rank-math-analyzer' ),
				fleschScore,
				calculatedScore.note
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
	 * @param {Boolean} hasNumber Title has number or not.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( hasNumber ) {
		const scores     = this.getScores()
		const boundaries = this.getBoundaries()

		if ( boundaries.veryEasy < score ) {
			return { score: scores.veryEasy, note: 'very easy' }
		}

		if ( inRange( score, boundaries.easy, 91 ) ) {
			return { score: scores.easy, note: 'easy' }
		}

		if ( inRange( score, boundaries.fairlyEasy, boundaries.easy ) ) {
			return { score: scores.fairlyEasy, note: 'fairly easy' }
		}

		if ( inRange( score, boundaries.okay, boundaries.fairlyEasy ) ) {
			return { score: scores.okay, note: 'okay' }
		}

		if ( inRange( score, boundaries.fairlyDifficult, boundaries.okay ) ) {
			return { score: scores.fairlyDifficult, note: 'fairly difficult' }
		}

		if ( inRange( score, boundaries.difficult, boundaries.fairlyDifficult ) ) {
			return { score: scores.difficult, note: 'difficult' }
		}

		return { score: scores.veryDifficult, note: 'very difficult' }
	}

	getBoundaries() {
		return wp.hooks.applyFilters(
			'rankMath/analysis/fleschReading/boundaries',
			{
				veryEasy: 90,
				easy: 80,
				fairlyEasy: 70,
				okay: 60,
				fairlyDifficult: 50,
				difficult: 30,
				veryDifficult: 0
			}
		)
	}

	getScores() {
		return wp.hooks.applyFilters(
			'rankMath/analysis/fleschReading/score',
			{
				veryEasy: 6,
				easy: 5,
				fairlyEasy: 5,
				okay: 4,
				fairlyDifficult: 3,
				difficult: 2,
				veryDifficult: 1
			}
		)
	}
}

export default FleschReading
