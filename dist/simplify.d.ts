/**
 * Function to get a new Client instance based on a set of
 * Simplify API keys i.e.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });</code></pre>
 *
 * @method getClient
 * @param {Object} appKeys Object containing the public & private API keys
 * @return {Client} New Client instance
 */
export declare const getClient: (appKeys?: any) => any;
