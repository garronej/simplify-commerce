/**
 * My property description.  Like other pieces of your comment blocks,
 * this can span multiple lines.
 *
 * @property API_BASE_LIVE_URL
 * @type {String}
 * @default Constants.API_BASE_LIVE_URL value
 */
export declare const API_BASE_LIVE_URL = "https://api.simplify.com/v1/api";
/**
 * My property description.  Like other pieces of your comment blocks,
 * this can span multiple lines.
 *
 * @property API_BASE_SANDBOX_URL
 * @type {String}
 * @default Constants.API_BASE_SANDBOX_URL value
 */
export declare const API_BASE_SANDBOX_URL = "https://sandbox.simplify.com/v1/api";
/**
 * My property description.  Like other pieces of your comment blocks,
 * this can span multiple lines.
 *
 * @property OAUTH_BASE_URL
 * @type {String}
 * @default Constants.OAUTH_BASE_URL value
 */
export declare const OAUTH_BASE_URL = "https://www.simplify.com/commerce/oauth";
/**
 * Function to execute an API call.
 *
 * @method execute
 * @param {Object} auth An object containing the public & private API keys
 * @param {String} domainType The type of domain object e.g. 'payment'
 * @param {String} action The type of action being invoked on the domain object
 * @param {Object} params The request paramaters
 * @param {Function} callback A callback function to handle an success/error responses from the API
 */
export declare const execute: (opts: {
    auth: Record<string, unknown>;
    domainType: string;
    action: string;
    params: Record<string, unknown>;
}, callback: (...args: any[]) => void) => void;
/**
 * Function to decode a signature of a Webhook event returned by Simplify.
 *
 * @method jwsDecode
 * @param {Object} auth An object containing the public & private API keys
 * @param {Object} params The request paramaters
 * @param {Function} errorHandler A callback function to handle an success/error responses from the API
 */
export declare const jwsDecode: (opts: {
    auth: Record<string, unknown>;
    params: Record<string, unknown>;
}, callback: (...args: any[]) => void) => void;
