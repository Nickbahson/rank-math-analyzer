import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'

class ContentHasAssets extends Analysis {

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

		// Has no content.
		if ( ! paper.hasText() ) {

			// But has thumbnail.
			if ( paper.hasThumbnail() ) {
				analysisResult.setScore( 1 )
				analysisResult.setText( this.translateScore( analysisResult, i18n ) )
			} else {
				analysisResult.setText( i18n.__( 'Add a few images and/or videos to make your content appealing.', 'rank-math-analyzer' ) )
			}

			return analysisResult
		}

		analysisResult.setScore(
			this.calculateScore(
				this.getImages( paper ).length,
				this.getVideos( paper ).length
			)
		)
		analysisResult.setText( this.translateScore( analysisResult, i18n ) )

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
		return paper.hasText() || paper.hasThumbnail()
	}

	/**
	 * Calculates the score based on the url length.
	 *
	 * @param {Integer} images Total number of images.
	 * @param {Integer} videos Total number of videos.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( images, videos ) {
		let score = 0

		if ( 1 === images ) {
			score += 1
		} else if ( 2 === images ) {
			score += 2
		} else if ( 3 === images ) {
			score += 4
		} else if ( 3 < images ) {
			score += 6
		}

		if ( 1 === videos ) {
			score += 1
		} else if ( 1 < videos ) {
			score += 2
		}

		return Math.min( wp.hooks.applyFilters( 'rankMath/analysis/contentHasAssets/score', 6 ), score )
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
			i18n.__( 'Your content contains images and/or video(s).', 'rank-math-analyzer' ) :
			i18n.__( 'You are not using rich media like images or videos.', 'rank-math-analyzer' )
	}

	/**
	 * Get all the images.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @return {Array} The matched set.
	 */
	getImages( paper ) {
		let images  = this.match( paper, '<img(?:[^>]+)?>' ),
			gallery = this.match( paper, '\\[gallery( [^\\]]+?)?\\]' )

		return [].concat( images, gallery )
	}

	/**
	 * Get all the videos.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @return {Array} The matched set.
	 */
	getVideos( paper ) {
		let videos  = this.match( paper, '<iframe(?:[^>]+)?>' ),
			embeds  = this.match( paper, '\\[video( [^\\]]+?)?\\]' ),
			embeds2 = this.match( paper, /(http:\/\/|https:\/\/|)(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/ )

		return [].concat( videos, embeds, embeds2 )
	}

	/**
	 * Match the assets.
	 *
	 * @param {Paper}  paper       The paper to use for the assessment.
	 * @param {String} regexString The regex to test the text against.
	 *
	 * @return {Array} The matched set.
	 */
	match( paper, regexString ) {
		let regex = new RegExp( regexString, 'ig' )
		let matches = paper.getText().match( regex )

		return null === matches ? [] : matches
	}
}

export default ContentHasAssets
