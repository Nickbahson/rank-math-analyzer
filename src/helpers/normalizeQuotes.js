/**
 * Normalizes quotes to 'regular' quotes.
 *
 * @param {String} text Text to normalize.
 *
 * @return {String} The normalized text.
 */
export default ( text ) => {
	return text.replace( /[‘’‛`]/g, '\'' ).replace( /[“”〝〞〟‟„]/g, '"' )
}
