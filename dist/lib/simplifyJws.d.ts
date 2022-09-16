/**
 * An object containing the JWS header properties.
 *
 * @property HEADERS
 * @type {Object}
 */
export declare const HEADERS: {
    URI: string;
    TIMESTAMP: string;
    NONCE: string;
    TOKEN: string;
    ALGORITHM: string;
    TYPE: string;
    MAX_TIMESTAMP_DIFF: number;
};
/**
 * Function to get the JWS Signature for our API call.
 *
 * @method getJWSSignature
 * @param {Object} auth An object containing the public & private API keys
 * @param {Object} params The request paramaters to be used in the payload
 * @param {String} uri The JSON Web Signature to decode
 * @return {Object} Returns a JWS object
 */
export declare const getJWSSignature: (auth?: any, params?: any, uri?: any) => any;
/**
 * Function to decode a JWS signature.
 *
 * @method decodeSignature
 * @param {String} signature The JSON Web Signature to decode
 * @return {Object} Returns a decoded JWS object
 */
export declare const decodeSignature: (signature?: any) => any;
/**
 * Function to check if a JWS header is valid or not.
 *
 * @method isJWSHeaderValid
 * @param {String} header The JSON Web Signature header
 * @param {String} publicKey The user's public API key
 * @param {String} url The url which was used as a header in the JWS object
 * @param {Function} callback A callback function to handle an errors
 * @return {Boolean} Returns true if the JWS header values are set correctly
 */
export declare const isJWSHeaderValid: (header?: any, publicKey?: any, url?: any, callback?: any) => boolean;
