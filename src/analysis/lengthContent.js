import Analysis from '../Analysis'

class LengthContent extends Analysis {

	/**
	 * Analysis id.
	 *
	 * @type {String}
	 */
	id = 'lengthContent'

	/**
	 * Executes the assessment and return its result
	 *
	 * @param  {Paper}      paper      The paper to run this assessment on.
	 * @param  {Researcher} researcher The researcher used for the assessment.
	 * @param  {Object}     il8n       The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} The result of the assessment.
	 */
	getResult( paper, researcher, il8n ) {
		let words = paper.getContentWords()
		if ( false === words || 0 === words.length ) {
			return
		}

		let length = words.length,
			score = Math.min( this.calculateScore( length ), this.getScore( 'lengthContent' ) )
		return this.announce( 0 < score, score, [ length ])
	}
}
