/**
 * Normalizes whitespace and &nbsp; in a string.
 *
 * @param {string} text Text to normalize.
 *
 * @return {string} The normalized text.
 */
export default ( text ) => {
    return text.replace( /&nbsp;/g, ' ' ).replace( /\s+/g, ' ' )
}
