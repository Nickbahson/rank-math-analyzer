import Researcher from './Researcher'
import { filter, has, isUndefined, map, pick } from 'lodash'

// Analyses
import ContentHasAssets from './analysis/contentHasAssets'
import ContentHasShortParagraphs from './analysis/contentHasShortParagraphs'
import ContentHasTOC from './analysis/contentHasTOC'
import FleschReading from './analysis/fleschReading'
import KeywordDensity from './analysis/keywordDensity'
import KeywordIn10Percent from './analysis/keywordIn10Percent'
import KeywordInContent from './analysis/keywordInContent'
import KeywordInImageAlt from './analysis/keywordInImageAlt'
import KeywordInMetaDescription from './analysis/keywordInMetaDescription'
import KeywordInPermalink from './analysis/keywordInPermalink'
import KeywordInSubheadings from './analysis/keywordInSubheadings'
import KeywordInTitle from './analysis/keywordInTitle'
import KeywordNotUsed from './analysis/keywordNotUsed'
import LengthContent from './analysis/lengthContent'
import LengthPermalink from './analysis/lengthPermalink'
import LinksHasExternals from './analysis/linksHasExternals'
import LinksHasInternal from './analysis/linksHasInternal'
import LinksNotAllExternals from './analysis/linksNotAllExternals'
import TitleHasNumber from './analysis/titleHasNumber'
import TitleHasPowerWords from './analysis/titleHasPowerWords'
import TitleSentiment from './analysis/titleSentiment'
import TitleStartWithKeyword from './analysis/titleStartWithKeyword'

/**
 * Creates the Analyzer.
 */
class Analyzer {

	/**
	 * Constructor
	 *
	 * @param {Object} options Options for analyzer.
	 */
	constructor( options ) {
		this.options    = options
		this.researcher = has( options, 'researcher' ) ? options.researcher : new Researcher
		this.setI18n( has( options, 'i18n' ) ? options.i18n : undefined )
		this.setAnalyses()
	}

	/**
	  * Runs the analyses defined in the tasklist or the default analyses.
	  *
	  * @param {Paper} paper The paper to run analyses on.
	  */
	analyze( paper ) {
		this.researcher.setPaper( paper )

		let analyses = filter( this.analyses, ( analysis ) => {
			return analysis.isApplicable( paper, this.researcher )
		})

		this.results = map( analyses, ( analysis ) => {
			return analysis.getResult( paper, this.researcher, this.i18n )
		})
		console.log( this.results )
	}

	/**
	  * Runs the analyses defined.
	  *
	  * @param {Array} analyses List of analyses to run.
	  * @param {Paper} paper    The paper to run analyses on.
	  */
	analyzeSome( analyses, paper ) {
		this.researcher.setPaper( paper )

		analyses = pick( this.defaultAnalyses, analyses )
		analyses = filter( this.analyses, ( analysis ) => {
			return analysis.isApplicable( paper, this.researcher )
		})

		return map( analyses, ( analysis ) => {
			return analysis.getResult( paper, this.researcher, this.i18n )
		})
	}

	/**
	 * Set i18n object.
	 *
	 * @param {Object} i18n The i18n object used for translations.
	 *
	 * @throws {Error} Parameter needs to be a valid i18n object.
	 */
	setI18n( i18n ) {
		if ( isUndefined( i18n ) ) {
			throw new Error( 'The assessor requires an i18n object.' )
		}

		this.i18n = i18n
	}

	/**
	 * Set analyses.
	 */
	setAnalyses() {
		this.defaultAnalyses = {
			contentHasAssets: new ContentHasAssets,
			contentHasShortParagraphs: new ContentHasShortParagraphs,
			contentHasTOC: new ContentHasTOC,
			fleschReading: new FleschReading,
			keywordDensity: new KeywordDensity,
			keywordIn10Percent: new KeywordIn10Percent,
			keywordInContent: new KeywordInContent,
			keywordInImageAlt: new KeywordInImageAlt,
			keywordInMetaDescription: new KeywordInMetaDescription,
			keywordInPermalink: new KeywordInPermalink,
			keywordInSubheadings: new KeywordInSubheadings,
			keywordInTitle: new KeywordInTitle,
			keywordNotUsed: new KeywordNotUsed,
			lengthContent: new LengthContent,
			lengthPermalink: new LengthPermalink,
			linksHasExternals: new LinksHasExternals,
			linksHasInternal: new LinksHasInternal,
			linksNotAllExternals: new LinksNotAllExternals,
			titleHasNumber: new TitleHasNumber,
			titleHasPowerWords: new TitleHasPowerWords,
			titleSentiment: new TitleSentiment,
			titleStartWithKeyword: new TitleStartWithKeyword
		}

		if ( has( this.options, 'analyses' ) && ! isUndefined( this.options.analyses ) ) {
			this.analyses = pick( this.defaultAnalyses, this.options.analyses )
		} else {
			this.analyses = this.defaultAnalyses
		}
	}

	/**
	 * Get results.
	 *
	 * @return {Array}
	 */
	getResults() {
		return this.results
	}
}

export default Analyzer
