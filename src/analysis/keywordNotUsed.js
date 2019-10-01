/**
 * External dependencies
 */
import $ from 'jquery'

/**
 * Internal dependencies
 */
import Analysis from '@root/Analysis'
import AnalysisResult from '@root/AnalysisResult'

class KeywordNotUsed extends Analysis {
	/**
	 * Hold checked keywords status
	 *
	 * @type {Object}
	 */
	keywordsChecked = {}

	/**
	 * Create new analysis result instance.
	 *
	 * @param {Jed} i18n The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} New instance.
	 */
	newResult( i18n ) {
		return new AnalysisResult()
			.setEmpty( i18n.__( 'Set a Focus Keyword for this content.', 'rank-math-analyzer' ) )
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
		const keyword = paper.getLower( 'keyword' ).trim()

		if ( 'undefined' !== typeof this.keywordsChecked[ keyword ] ) {
			analysisResult.setText( this.translateScore( this.keywordsChecked[ keyword ], i18n ) )
			return analysisResult
		}

		this.keywordsChecked[ keyword ] = true
		$.ajax(
			{
				url: rankMath.ajaxurl,
				type: 'GET',
				data: {
					keyword,
					action: 'rank_math_is_keyword_new',
					security: rankMath.security,
					objectID: rankMath.objectID,
					objectType: rankMath.objectType,
				},
			}
		).done( ( data ) => {
			this.keywordsChecked[ keyword ] = data.isNew
			analysisResult.setText( this.translateScore( data.isNew, i18n ) )
			const li = $( '.seo-check-KeywordNotUsed' )

			li.removeClass( 'test-ok test-fail test-empty test-looking' )
			this.changeKeywordInLink( keyword )
		} )

		analysisResult.setText( i18n.__( 'We are searching in database.', 'rank-math-analyzer' ) )

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
		return paper.hasKeyword()
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {boolean} isNewKeyword Is the selected keyword new or not.
	 * @param {Jed}     i18n         The i18n-object used for parsing translations.
	 *
	 * @return {string} The translated string.
	 */
	translateScore( isNewKeyword, i18n ) {
		return isNewKeyword ?
			i18n.__( 'You haven\'t used this Focus Keyword before.', 'rank-math-analyzer' ) :
			i18n.sprintf(
				i18n.__( 'You have %1$s this Focus Keyword.', 'rank-math-analyzer' ),
				'<a target="_blank" class="focus-keyword-link" href="' + rankMath.assessor.focusKeywordLink + '">' + i18n.__( 'already used', 'rank-math-analyzer' ) + '</a>'
			)
	}

	changeKeywordInLink( keyword ) {
		const fkLinkElement = $( '.focus-keyword-link' )
		if ( fkLinkElement.length ) {
			fkLinkElement.attr( 'href', fkLinkElement.attr( 'href' )
				.replace( '%focus_keyword%', keyword )
				.replace( '%post_type%', rankMath.objectType )
				.replace( '%yaxonomy%', rankMath.objectType ) )
		}
	}
}

export default KeywordNotUsed
