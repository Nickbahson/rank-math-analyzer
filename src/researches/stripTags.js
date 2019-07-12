/**
 * Strip HTML-tags from text
 *
 * @param {String} text The string being counted.
 *
 * @return {String} The manipulated text.
 */
export default text => text.replace( /<\/?[a-z][^>]*?>/gi, '\n' )
