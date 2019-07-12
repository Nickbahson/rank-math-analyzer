const shortcodeNameMatcher = '[^<>&/\\[\\]\x00-\x20=]+?'
const shortcodeStartRegex  = new RegExp( '\\[' + shortcodeNameMatcher + '( [^\\]]+?)?\\]', 'g' )
const shortcodeEndRegex    = new RegExp( '\\[/' + shortcodeNameMatcher + '\\]', 'g' )

/**
 * Strip shortcodes and oprhan shortcodes from text
 *
 * @param {String} text The text to strip shortcodes from.
 *
 * @returns {String} The text without shortcodes
 */
export default text => text
	.replace( shortcodeStartRegex, '' )
	.replace( shortcodeEndRegex, '' )
