/**
 * Internal dependencies
 */
import Analysis from '@root/Analysis'
import AnalysisResult from '@root/AnalysisResult'
import Analyzer from '@root/Analyzer'
import Paper from '@root/Paper'
import Researcher from '@root/Researcher'

/**
 * Helpers
 */
import wordCount from '@researches/wordCount'
import matchParagraphs from '@helpers/matchParagraphs'

const Helpers = {
	matchParagraphs,
	wordCount,
}

window.rankMathAnalyzer = {
	Analysis,
	AnalysisResult,
	Analyzer,
	Paper,
	Researcher,
	Helpers,
}
