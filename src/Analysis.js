/**
 * Abstract layer for single analysis.
 */
class Analysis {

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
		throw new Error( 'The method getResult is not implemented' )
	}

	/**
	 * Check whether thr assessment is applicable
	 *
	 * @param  {Paper}  paper The paper to use for the assessment.
	 *
	 * @return {Boolean}
	 */
	isApplicable( paper ) {
		return true
	}
}

export default Analysis
