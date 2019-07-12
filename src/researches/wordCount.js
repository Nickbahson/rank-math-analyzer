import count from '@wordpress/wordcount'

/**
 * Calculates the wordcount of a certain text.
 *
 * @param {String} text The text to be counted.
 *
 * @returns {int} The word count of the given text.
 */
export default text => count( text, 'words' )
