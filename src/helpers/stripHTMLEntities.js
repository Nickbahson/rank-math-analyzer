/**
 * Removes items matched in the regex.
 *
 * @param {String} text The string being counted.
 *
 * @return {String} The manipulated text.
 */
export default text => text.replace( /&\S+?;/g, '' )
