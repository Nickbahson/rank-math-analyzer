import Analysis from '../Analysis'
import AnalysisResult from '../AnalysisResult'
import { includes } from 'lodash'

class KeywordInImageAlt extends Analysis {

	/**
	 * Create new analysis result instance.
	 *
	 * @return {AnalysisResult} New instance.
	 */
	newResult( i18n ) {
		return new AnalysisResult()
			.setEmpty( i18n.__( 'Add an image with your Focus Keyword as alt text.', 'rank-math-analyzer' ) )
			.setTooltip( i18n.__( 'It is recommended to add the focus keyword in the alt attribute of one or more images.', 'rank-math-analyzer' ) )
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
		let keyword          = paper.getLower( 'keyword' )

		// Remove duplicate words from keyword.
		keyword = [ ...new Set( keyword.split( ' ' ) ) ]
		keyword = keyword.join( ' ' )

		let regex = new RegExp( '<img[^>]*alt=[\'"][^\'"]*' + keyword.replace( / /g, '.*' ) + '[^\'"]*[\'"]', 'gi' )
		if ( null !== paper.getTextLower().match( regex ) || keyword === paper.getLower( 'thumbnailAlt' ) ) {
			analysisResult
				.setScore( this.calculateScore( true ) )
				.setText( this.translateScore( analysisResult, i18n ) )

			return analysisResult
		}


		regex = new RegExp( '\\[gallery( [^\\]]+?)?\\]', 'ig' )
		const hasGallery = null !== paper.getTextLower().match( regex )

		if ( hasGallery ) {
			analysisResult
				.setScore( this.calculateScore( true ) )
				.setText( i18n.__( 'We detected a gallery in your content & assuming that you added Focus Keyword in alt in at least one of the gallery images.', 'rank-math-analyzer' ) )
		}

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
		return paper.hasKeyword() && ( paper.hasText() || paper.hasThumbnailAltText() )
	}

	/**
	 * Calculates the score based on the url length.
	 *
	 * @param {Boolean} hasKeyword Title has number or not.
	 *
	 * @return {Integer} The calculated score.
	 */
	calculateScore( hasKeyword ) {
		return hasKeyword ? wp.hooks.applyFilters( 'rankMath/analysis/keywordInImageAlt/score', 2 ) : null
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
			i18n.__( 'Focus Keyword found in image alt attribute(s).', 'rank-math-analyzer' ) :
			i18n.__( 'Focus Keyword not found in image alt attribute(s).', 'rank-math-analyzer' )
	}
}

export default KeywordInImageAlt
