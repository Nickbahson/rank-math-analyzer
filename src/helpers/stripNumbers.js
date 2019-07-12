/**
 * Removes all words comprised only of numbers.
 *
 * @param {String} text The string to remove from.
 *
 * @return {String} The manipulated text.
 */
export default ( text ) => {
	text = text.replace( /\b[0-9]+\b/g, '' )
	return '.' === text ? '' : text
}
