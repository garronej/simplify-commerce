/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This class exposes the Simplify domain
 * objects on which different API calls can be
 * invoked upon.
 *
 * @class Simplify
 * @static
 */
import * as Payments from "./lib/payments.ts";

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

export const getClient = function(appKeys?: any) {
	return new Client(appKeys);
}

/**
 * This class contains the Simplify domain objects to execute API calls against.
 *
 * @class Client
 * @param {Object} appKeys Object containing the public & private API keys
 */

function Client(appKeys?: any) {
		this.authorization = new Authorization(appKeys);
	this.cardtoken = new CardToken(appKeys);
	this.coupon = new Coupon(appKeys);
	this.customer = new Customer(appKeys);
	this.fraudcheck = new FraudCheck(appKeys);
	this.invoice = new Invoice(appKeys);
	this.invoiceitem = new InvoiceItem(appKeys);
	this.payment = new Payment(appKeys);
	this.plan = new Plan(appKeys);
	this.refund = new Refund(appKeys);
	this.subscription = new Subscription(appKeys);
	this.tax = new Tax(appKeys);
	this.transactionreview = new TransactionReview(appKeys);
	this.webhook = new Webhook(appKeys);
	this.accesstoken = new AccessToken(appKeys);
	this.event = new Event(appKeys);
}


/**
 * This class is a Simplify domain object used for OAuth transactions.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.accesstoken.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 });
 </code></pre>
 * @class AccessToken
 * @param {Object} appKeys Object containing the public & private API keys
 */

function AccessToken(appKeys?: any) {
	this.appKeys = appKeys;

	/**
	 * Function to create an access token.
	 *
	 * @method create
	 * @param {Object} params A map of parameters to create an access token.<br/><br/> Valid parameters include:
	 * <ul>
	 * <li>authCode : Code return from a successful OAuth authorization <b>(REQUIRED)</b></li>
	 * <li>redirectUri : URI that must match the URI saved on account <b>(REQUIRED)</b></li>
	 * </ul>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys,
			domainType: "accessToken",
			action: "create",
			params: params
		}, callback);
	}

	/**
	 * Function to refresh an access token.
	 *
	 * @method refresh
	 * @param {String} refreshToken A refresh token returned with an oauth response
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.refresh = function(refreshToken, callback) {
		Payments.execute({
			auth: this.appKeys,
			domainType: "accessToken",
			action: "refresh",
			params: refreshToken
		}, callback);
	}

	/**
	 * Function to revoke an access token.
	 *
	 * @method revoke
	 * @param {String} accessToken The access token to revoke
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.revoke = function(accessToken, callback) {
		Payments.execute({
			auth: this.appKeys,
			domainType: "accessToken",
			action: "revoke",
			params: accessToken
		}, callback);
	}
};

/**
 * This class is a Simplify domain object for handling events.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.event.create(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class Event
 * @param {Object} appKeys Object containing the public & private API keys
 */

function Event(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to handle a Webhook event sent from Simplify.
	 *
	 * @method create
	 * @param {Object} params A map of parameters to create an event with
	 * <br/><ul>
	 * <li>payload : The payload of the webhook event <b>(REQUIRED)</b></li>
	 * <li>url : The url of the webhook for this event <b>(REQUIRED)</b></li>
	 * </ul>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.jwsDecode({
			auth: this.appKeys,
			params: params
		}, callback);
	};
};

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.authorization.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class Authorization
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function Authorization(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a Authorization object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the Authorization from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>amount : Amount of the payment (in the smallest unit of your currency). Example: 100 = $1.00 <b>(REQUIRED)</b></li></li>
	 *				<li>card.addressCity : City of the cardholder. [max length: 50, min length: 2] </li>
	 *				<li>card.addressCountry : Country code (ISO-3166-1-alpha-2 code) of residence of the cardholder. [max length: 2, min length: 2] </li>
	 *				<li>card.addressLine1 : Address of the cardholder. [max length: 255] </li>
	 *				<li>card.addressLine2 : Address of the cardholder if needed. [max length: 255] </li>
	 *				<li>card.addressState : State of residence of the cardholder. State abbreviations should be used. [max length: 255] </li>
	 *				<li>card.addressZip : Postal code of the cardholder. The postal code size is between 5 and 9 characters in length and only contains numbers or letters. [max length: 32] </li>
	 *				<li>card.cvc : CVC security code of the card. This is the code on the back of the card. Example: 123 </li>
	 *				<li>card.expMonth : Expiration month of the card. Format is MM. Example: January = 01 [min value: 1, max value: 12] </li>
	 *				<li>card.expYear : Expiration year of the card. Format is YY. Example: 2013 = 13 [min value: 0, max value: 99] </li>
	 *				<li>card.name : Name as it appears on the card. [max length: 50, min length: 2] </li>
	 *				<li>card.number : Card number as it appears on the card. [max length: 19, min length: 13] </li>
	 *				<li>currency : Currency code (ISO-4217) for the transaction. Must match the currency associated with your account. [default: USD] <b>(REQUIRED)</b></li>
	 *				<li>customer : ID of customer. If specified, card on file of customer will be used. </li>
	 *				<li>description : Free form text field to be used as a description of the payment. This field is echoed back with the payment on any find or list operations. [max length: 1024] </li></li>
	 *				<li>order.commodityCode : Standard classification code for products and services. [max length: 5] </li>
	 *				<li>order.customer : ID of the customer associated with the order. </li>
	 *				<li>order.customerEmail : Customer email address. </li>
	 *				<li>order.customerName : Customer name. </li>
	 *				<li>order.customerNote : Additional notes provided by the customer. [max length: 255] </li>
	 *				<li>order.customerReference : A merchant reference for the customer. </li></li>
	 *				<li>order.items.amount : Cost of the item. </li>
	 *				<li>order.items.description : Description of the item. </li>
	 *				<li>order.items.name : Item name. </li>
	 *				<li>order.items.product : Product information associated with the item. </li>
	 *				<li>order.items.quantity : Quantity of the item contained in the order [min value: 1, max value: 999999, default: 1] <b>(REQUIRED)</b></li>
	 *				<li>order.items.reference : A merchant reference for the item. [max length: 255] </li>
	 *				<li>order.items.tax : Taxes associated with the item. </li>
	 *				<li>order.merchantNote : Additional notes provided by the merchant. [max length: 255] </li>
	 *				<li>order.payment : ID of the payment associated with the order. </li>
	 *				<li>order.reference : A merchant reference for the order. [max length: 255] </li></li>
	 *				<li>order.shippingAddress.city : City, town, or municipality. [max length: 255, min length: 2] </li>
	 *				<li>order.shippingAddress.country : 2-character country code. [max length: 2, min length: 2] </li>
	 *				<li>order.shippingAddress.line1 : Street address. [max length: 255] </li>
	 *				<li>order.shippingAddress.line2 : (Opt) Street address continued. [max length: 255] </li>
	 *				<li>order.shippingAddress.name : Name of the entity being shipped to. [max length: 255] </li>
	 *				<li>order.shippingAddress.state : State or province. [max length: 255] </li>
	 *				<li>order.shippingAddress.zip : Postal code. [max length: 32] </li></li>
	 *				<li>order.shippingFromAddress.city : City, town, or municipality. [max length: 255, min length: 2] </li>
	 *				<li>order.shippingFromAddress.country : 2-character country code. [max length: 2, min length: 2] </li>
	 *				<li>order.shippingFromAddress.line1 : Street address. [max length: 255] </li>
	 *				<li>order.shippingFromAddress.line2 : (Opt) Street address continued. [max length: 255] </li>
	 *				<li>order.shippingFromAddress.name : Name of the entity performing the shipping. [max length: 255] </li>
	 *				<li>order.shippingFromAddress.state : State or province. [max length: 255] </li>
	 *				<li>order.shippingFromAddress.zip : Postal code. [max length: 32] </li>
	 *				<li>order.shippingName : Name of the entity being shipped to. </li>
	 *				<li>order.source : Order source. [default: WEB] <b>(REQUIRED)</b></li>
	 *				<li>order.status : Status of the order. [default: INCOMPLETE] <b>(REQUIRED)</b></li>
	 *				<li>reference : Custom reference field to be used with outside systems. </li>
	 *				<li>replayId : An identifier that can be sent to uniquely identify a payment request to facilitate retries due to I/O related issues. This identifier must be unique for your account (sandbox or live) across all of your payments. If supplied, we will check for a payment on your account that matches this identifier, and if one is found we will attempt to return an identical response of the original request. [max length: 50, min length: 1] </li></li>
	 *				<li>statementDescription.name : Merchant name <b>(REQUIRED)</b></li>
	 *				<li>statementDescription.phoneNumber : Merchant contact phone number. </li>
	 *				<li>token : If specified, card associated with card token will be used. [max length: 255] </li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "authorization", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to delete a Authorization object.
	 *
	 * @method delete
	 * @param 	A string ID of the Authorization to delete.
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.delete = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "authorization", 
			action: "delete", 
			params: id
		}, callback);
	}

	/**
	 * Function to retrieve a list Authorization objects.
	 *
	 * @method list
	 * @param {Object} params A map of parameters in which to define the Authorization list from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>filter : <table class="filter_list"><tr><td>filter.id</td><td>Filter by the Authorization Id</td></tr><tr><td>filter.replayId</td><td>Filter by the compoundReplayId</td></tr><tr><td>filter.last4</td><td>Filter by the card number (last 4 digits)</td></tr><tr><td>filter.amount</td><td>Filter by the transaction amount (in the smallest unit of your currency)</td></tr><tr><td>filter.text</td><td>Filter by the description of the authorization</td></tr><tr><td>filter.amountMin & filter.amountMax</td><td>The filter amountMin must be used with amountMax to find authorizations with authorization values between the min and max</td></tr><tr><td>filter.dateCreatedMin<sup>*</sup></td><td>Filter by the minimum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.dateCreatedMax<sup>*</sup></td><td>Filter by the maximum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.deposit</td><td>Filter by the deposit id</td></tr><tr><td>filter.customer</td><td>Filter using the Id of the customer to find the authorizations for that customer</td></tr><tr><td>filter.status</td><td>Filter by the authorization status text</td></tr><tr><td>filter.authCode</td><td>Filter by the authorization code (Not the authorization ID)</td></tr><tr><td>filter.q</td><td>You can use this to filter by the ID, the authCode or the amount of the authorization</td></tr></table><br><sup>*</sup>Use dateCreatedMin with dateCreatedMax in the same filter if you want to search between two created dates </li>
	 *				<li>max : Allows up to a max of 50 list items to return. [min value: 0, max value: 50, default: 20] </li>
	 *				<li>offset : Used in pagination of the list. This is the start offset of the page. [min value: 0, default: 0] </li>
	 *				<li>sorting : Allows for ascending or descending sorting of the list. The value maps properties to the sort direction (either 'asc' for ascending or 'desc' for descending).<br/>Sortable properties are: <ul><li>dateCreated<li>amount<li>id<li>description<li>paymentDate</li></ul></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.list = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "authorization", 
			action: "list", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a Authorization object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the Authorization to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "authorization", 
			action: "show", 
			params: id
		}, callback);
	}

}

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.cardtoken.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class CardToken
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function CardToken(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a CardToken object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the CardToken from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>authenticatePayer : Set as true to create CardToken for EMV 3DS transaction. [default: false] </li>
	 *				<li>callback : The URL callback for the cardtoken </li></li>
	 *				<li>card.addressCity : City of the cardholder. [max length: 50, min length: 2] </li>
	 *				<li>card.addressCountry : Country code (ISO-3166-1-alpha-2 code) of residence of the cardholder. [max length: 2, min length: 2] </li>
	 *				<li>card.addressLine1 : Address of the cardholder. [max length: 255] </li>
	 *				<li>card.addressLine2 : Address of the cardholder if needed. [max length: 255] </li>
	 *				<li>card.addressState : State of residence of the cardholder. State abbreviations should be used. [max length: 255] </li>
	 *				<li>card.addressZip : Postal code of the cardholder. The postal code size is between 5 and 9 in length and only contain numbers or letters. [max length: 32] </li>
	 *				<li>card.cvc : CVC security code of the card. This is the code on the back of the card. Example: 123 </li>
	 *				<li>card.expMonth : Expiration month of the card. Format is MM. Example: January = 01 [min value: 1, max value: 12] </li>
	 *				<li>card.expYear : Expiration year of the card. Format is YY. Example: 2013 = 13 [min value: 0, max value: 99] </li>
	 *				<li>card.name : Name as appears on the card. [max length: 50, min length: 2] </li>
	 *				<li>card.number : Card number as it appears on the card. [max length: 19, min length: 13] </li>
	 *				<li>key : Key used to create the card token. </li></li>
	 *				<li>secure3DRequestData.amount : Amount of the subsequent transaction in the smallest unit of your currency. Example: 100 = $1.00 <b>(REQUIRED)</b></li>
	 *				<li>secure3DRequestData.authOnly : Specifies if the subsequent transaction is going to be a Payment or an Authorization (to be Captured later). If false or not specified, it refers to a Payment, otherwise it refers to an Authorization. </li>
	 *				<li>secure3DRequestData.currency : Currency code (ISO-4217). Must match the currency associated with your account. <b>(REQUIRED)</b></li>
	 *				<li>secure3DRequestData.description : A description of the transaction. [max length: 256] </li>
	 *				<li>secure3DRequestData.id : 3D Secure data ID. </li>
	 *				<li>source : Card Token Source [default: API] </li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "cardToken", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a CardToken object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the CardToken to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "cardToken", 
			action: "show", 
			params: id
		}, callback);
	}

	/**
	 * Function to update a CardToken object.
	 *
	 * @method update
	 * @param {Object} params A map of parameters on which to update the CardToken object.<br/><br/>
	 *			Valid parameters include:<ul> 
	 *				<li>id : A string ID of the CardToken object to update</li> </li>
	 *				<li>device.browser : The User-Agent header of the browser the customer used to place the order <b>(REQUIRED)</b></li>
	 *				<li>device.ipAddress : The IP address of the device used by the payer, in nnn.nnn.nnn.nnn format. <b>(REQUIRED)</b></li>
	 *				<li>device.language : The language supported for the payer's browser as defined in IETF BCP47.</li>
	 *				<li>device.screenHeight : The total height of the payer's browser screen in pixels.</li>
	 *				<li>device.screenWidth : The total width of the payer's browser screen in pixels.</li>
	 *				<li>device.timeZone : The timezone of the device used by the payer, in Zone ID format. Example: "Europe/Dublin" <b>(REQUIRED)</b></li>
	 *				</li>
	 *				<li>key : The public key of the merchant to be used for the token</li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.update = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "cardToken", 
			action: "update", 
			params: params
		}, callback);
	}

}

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.coupon.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class Coupon
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function Coupon(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a Coupon object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the Coupon from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>amountOff : Amount off of the price of the product in the smallest units of the currency of the merchant. While this field is optional, you must provide either amountOff or percentOff for a coupon. Example: 100 = $1.00 [min value: 1] </li>
	 *				<li>couponCode : Code that identifies the coupon to be used. [min length: 2] <b>(REQUIRED)</b></li>
	 *				<li>description : A brief section that describes the coupon. </li>
	 *				<li>durationInMonths : DEPRECATED - Duration in months that the coupon will be applied after it has first been selected. [min value: 1, max value: 9999] </li>
	 *				<li>endDate : Last date of the coupon in UTC millis that the coupon can be applied to a subscription. This ends at 23:59:59 of the merchant timezone. </li>
	 *				<li>maxRedemptions : Maximum number of redemptions allowed for the coupon. A redemption is defined as when the coupon is applied to the subscription for the first time. [min value: 1] </li>
	 *				<li>numTimesApplied : The number of times a coupon will be applied on a customer's subscription. [min value: 1, max value: 9999] </li>
	 *				<li>percentOff : Percentage off of the price of the product. While this field is optional, you must provide either amountOff or percentOff for a coupon. The percent off is a whole number. [min value: 1, max value: 100] </li>
	 *				<li>startDate : First date of the coupon in UTC millis that the coupon can be applied to a subscription. This starts at midnight of the merchant timezone. <b>(REQUIRED)</b></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "coupon", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to delete a Coupon object.
	 *
	 * @method delete
	 * @param 	A string ID of the Coupon to delete.
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.delete = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "coupon", 
			action: "delete", 
			params: id
		}, callback);
	}

	/**
	 * Function to retrieve a list Coupon objects.
	 *
	 * @method list
	 * @param {Object} params A map of parameters in which to define the Coupon list from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>filter : <table class="filter_list"><tr><td>filter.id</td><td>Filter by the coupon Id</td></tr><tr><td>filter.text</td><td>Filter by the coupon code</td></tr><tr><td>filter.dateCreatedMin<sup>*</sup></td><td>Filter by the minimum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.dateCreatedMax<sup>*</sup></td><td>Filter by the maximum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.startDateMin</td><td>Filter by the minimum coupon start date you are searching for - Date in UTC millis</td></tr><tr><td>filter.startDateMax</td><td>Filter by the maximum coupon start date you are searching for - Date in UTC millis</td></tr><tr><td>filter.endDateMin</td><td>Filter by the minimum coupon end date you are searching for - Date in UTC millis</td></tr><tr><td>filter.endDateMax</td><td>Filter by the maximum coupon end date you are searching for - Date in UTC millis</td></tr></table><br><sup>*</sup>Use dateCreatedMin with dateCreatedMax in the same filter if you want to search between two created dates </li>
	 *				<li>max : Allows up to a max of 50 list items to return. [min value: 0, max value: 50, default: 20] </li>
	 *				<li>offset : Used in paging of the list.  This is the start offset of the page. [min value: 0, default: 0] </li>
	 *				<li>sorting : Allows for ascending or descending sorting of the list. The value maps properties to the sort direction (either 'asc' for ascending or 'desc' for descending).<br/>Sortable properties are: <ul><li>dateCreated<li>maxRedemptions<li>timesRedeemed<li>id<li>startDate<li>endDate<li>percentOff<li>couponCode<li>durationInMonths<li>numTimesApplied<li>amountOff</li></ul></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.list = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "coupon", 
			action: "list", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a Coupon object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the Coupon to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "coupon", 
			action: "show", 
			params: id
		}, callback);
	}

	/**
	 * Function to update a Coupon object.
	 *
	 * @method update
	 * @param {Object} params A map of parameters on which to update the Coupon object.<br/><br/>
	 *			Valid parameters include:<ul> 
	 *				<li>id : A string ID of the Coupon object to update</li> 
	 *				<li>endDate : The ending date in UTC millis for the coupon. This must be after the starting date of the coupon.</li>
	 *				</li>
	 *				<li>maxRedemptions : Maximum number of redemptions allowed for the coupon. A redemption is defined as when the coupon is applied to the subscription for the first time. [min value: 1]</li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.update = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "coupon", 
			action: "update", 
			params: params
		}, callback);
	}

}

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.customer.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class Customer
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function Customer(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a Customer object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the Customer from.<br/><br/>
	 *			Valid parameters include: <ul></li>
	 *				<li>card.addressCity : City of the cardholder. <b>(REQUIRED)</b></li>
	 *				<li>card.addressCountry : Country code (ISO-3166-1-alpha-2 code) of residence of the cardholder. <b>(REQUIRED)</b></li>
	 *				<li>card.addressLine1 : Address of the cardholder <b>(REQUIRED)</b></li>
	 *				<li>card.addressLine2 : Address of the cardholder if needed. <b>(REQUIRED)</b></li>
	 *				<li>card.addressState : State of residence of the cardholder. State abbreviations should be used. <b>(REQUIRED)</b></li>
	 *				<li>card.addressZip : Postal code of the cardholder. The postal code size is between 5 and 9 in length and only contain numbers or letters. <b>(REQUIRED)</b></li>
	 *				<li>card.cvc : CVC security code of the card. This is the code on the back of the card. Example: 123 <b>(REQUIRED)</b></li>
	 *				<li>card.expMonth : Expiration month of the card. Format is MM. Example: January = 01 <b>(REQUIRED)</b></li>
	 *				<li>card.expYear : Expiration year of the card. Format is YY. Example: 2013 = 13 <b>(REQUIRED)</b></li>
	 *				<li>card.id : ID of card. Unused during customer create. </li>
	 *				<li>card.name : Name as appears on the card. <b>(REQUIRED)</b></li>
	 *				<li>card.number : Card number as it appears on the card. [max length: 19, min length: 13] </li>
	 *				<li>email : Email address of the customer <b>(REQUIRED)</b></li>
	 *				<li>name : Customer name [max length: 50, min length: 2] <b>(REQUIRED)</b></li>
	 *				<li>reference : Reference field for external applications use. </li></li>
	 *				<li>subscriptions.amount : Amount of payment in the smallest unit of your currency. Example: 100 = $1.00 </li>
	 *				<li>subscriptions.billingCycle : How the plan is billed to the customer. Values must be AUTO (indefinitely until the customer cancels) or FIXED (a fixed number of billing cycles). [default: AUTO] </li>
	 *				<li>subscriptions.billingCycleLimit : The number of fixed billing cycles for a plan. Only used if the billingCycle parameter is set to FIXED. Example: 4 </li>
	 *				<li>subscriptions.coupon : Coupon associated with the subscription for the customer. </li>
	 *				<li>subscriptions.currency : Currency code (ISO-4217). Must match the currency associated with your account. </li>
	 *				<li>subscriptions.currentPeriodEnd : End date of subscription's current period </li>
	 *				<li>subscriptions.currentPeriodStart : Start date of subscription's current period </li>
	 *				<li>subscriptions.customer : The customer ID to create the subscription for. Do not supply this when creating a customer. </li>
	 *				<li>subscriptions.frequency : Frequency of payment for the plan. Used in conjunction with frequencyPeriod. Valid values are "DAILY", "WEEKLY", "MONTHLY" and "YEARLY". </li>
	 *				<li>subscriptions.frequencyPeriod : Period of frequency of payment for the plan. Example: if the frequency is weekly, and periodFrequency is 2, then the subscription is billed bi-weekly. </li>
	 *				<li>subscriptions.name : Name describing subscription [max length: 50] </li>
	 *				<li>subscriptions.plan : The plan ID that the subscription should be created from. </li>
	 *				<li>subscriptions.quantity : Quantity of the plan for the subscription. [min value: 1] </li>
	 *				<li>subscriptions.renewalReminderLeadDays : If set, how many days before the next billing cycle that a renewal reminder is sent to the customer. If null, then no emails are sent. Minimum value is 7 if set. </li>
	 *				<li>subscriptions.source : Source of where subscription was created </li>
	 *				<li>token : If specified, card associated with card token will be used </li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "customer", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to delete a Customer object.
	 *
	 * @method delete
	 * @param 	A string ID of the Customer to delete.
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.delete = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "customer", 
			action: "delete", 
			params: id
		}, callback);
	}

	/**
	 * Function to retrieve a list Customer objects.
	 *
	 * @method list
	 * @param {Object} params A map of parameters in which to define the Customer list from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>filter : <table class="filter_list"><tr><td>filter.id</td><td>Filter by the customer Id</td></tr><tr><td>filter.text</td><td>Can use this to filter by the name, email or reference for the customer</td></tr><tr><td>filter.dateCreatedMin<sup>*</sup></td><td>Filter by the minimum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.dateCreatedMax<sup>*</sup></td><td>Filter by the maximum created date you are searching for - Date in UTC millis</td></tr></table><br><sup>*</sup>Use dateCreatedMin with dateCreatedMax in the same filter if you want to search between two created dates </li>
	 *				<li>max : Allows up to a max of 50 list items to return. [min value: 0, max value: 50, default: 20] </li>
	 *				<li>offset : Used in paging of the list.  This is the start offset of the page. [min value: 0, default: 0] </li>
	 *				<li>sorting : Allows for ascending or descending sorting of the list. The value maps properties to the sort direction (either 'asc' for ascending or 'desc' for descending).<br/>Sortable properties are: <ul><li>dateCreated<li>id<li>name<li>email<li>reference</li></ul></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.list = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "customer", 
			action: "list", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a Customer object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the Customer to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "customer", 
			action: "show", 
			params: id
		}, callback);
	}

	/**
	 * Function to update a Customer object.
	 *
	 * @method update
	 * @param {Object} params A map of parameters on which to update the Customer object.<br/><br/>
	 *			Valid parameters include:<ul> 
	 *				<li>id : A string ID of the Customer object to update</li> </li>
	 *				<li>card.addressCity : City of the cardholder. <b>(REQUIRED)</b></li>
	 *				<li>card.addressCountry : Country code (ISO-3166-1-alpha-2 code) of residence of the cardholder. <b>(REQUIRED)</b></li>
	 *				<li>card.addressLine1 : Address of the cardholder. <b>(REQUIRED)</b></li>
	 *				<li>card.addressLine2 : Address of the cardholder if needed. <b>(REQUIRED)</b></li>
	 *				<li>card.addressState : State of residence of the cardholder. State abbreviations should be used. <b>(REQUIRED)</b></li>
	 *				<li>card.addressZip : Postal code of the cardholder. The postal code size is between 5 and 9 in length and only contain numbers or letters. <b>(REQUIRED)</b></li>
	 *				<li>card.cvc : CVC security code of the card. This is the code on the back of the card. Example: 123 <b>(REQUIRED)</b></li>
	 *				<li>card.expMonth : Expiration month of the card. Format is MM.  Example: January = 01 <b>(REQUIRED)</b></li>
	 *				<li>card.expYear : Expiration year of the card. Format is YY. Example: 2013 = 13 <b>(REQUIRED)</b></li>
	 *				<li>card.id : ID of card. If present, card details for the customer will not be updated. If not present, the customer will be updated with the supplied card details.</li>
	 *				<li>card.name : Name as appears on the card. <b>(REQUIRED)</b></li>
	 *				<li>card.number : Card number as it appears on the card. [max length: 19, min length: 13]</li>
	 *				<li>email : Email address of the customer <b>(REQUIRED)</b></li>
	 *				</li>
	 *				<li>name : Customer name [max length: 50, min length: 2] <b>(REQUIRED)</b></li>
	 *				<li>reference : Reference field for external applications use.</li>
	 *				<li>token : If specified, card associated with card token will be added to the customer</li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.update = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "customer", 
			action: "update", 
			params: params
		}, callback);
	}

}

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.fraudcheck.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class FraudCheck
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function FraudCheck(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a FraudCheck object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the FraudCheck from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>amount : Amount of the transaction to be checked for fraud (in the smallest unit of your currency). Example: 100 = $1.00. This field is required if using ???full??? or ???advanced??? mode. </li></li>
	 *				<li>card.addressCity : City of the cardholder. [max length: 50, min length: 2] </li>
	 *				<li>card.addressCountry : Country code (ISO-3166-1-alpha-2 code) of residence of the cardholder. [max length: 2, min length: 2] </li>
	 *				<li>card.addressLine1 : Address of the cardholder. [max length: 255] </li>
	 *				<li>card.addressLine2 : Address of the cardholder if needed. [max length: 255] </li>
	 *				<li>card.addressState : State of residence of the cardholder. State abbreviations should be used. [max length: 255] </li>
	 *				<li>card.addressZip : Postal code of the cardholder. The postal code size is between 5 and 9 characters in length and only contains numbers or letters. [max length: 32] </li>
	 *				<li>card.cvc : CVC security code of the card. This is the code on the back of the card. Example: 123 </li>
	 *				<li>card.expMonth : Expiration month of the card. Format is MM. Example: January = 01 [min value: 1, max value: 12] </li>
	 *				<li>card.expYear : Expiration year of the card. Format is YY. Example: 2013 = 13 [min value: 0, max value: 99] </li>
	 *				<li>card.name : Name as it appears on the card. [max length: 50, min length: 2] </li>
	 *				<li>card.number : Card number as it appears on the card. [max length: 19, min length: 13] </li>
	 *				<li>currency : Currency code (ISO-4217) for the transaction to be checked for fraud. This field is required if using ???full??? or ???advanced??? mode. </li>
	 *				<li>description : - Description of the fraud check. [max length: 255] </li>
	 *				<li>ipAddress : IP Address of the customer for which the fraud check is to be done. [max length: 45] </li>
	 *				<li>mode : Fraud check mode.  ???simple??? only does an AVS and CVC check; ???advanced??? does a complete fraud check, running the input against the set up rules. [valid values: simple, advanced, full, SIMPLE, ADVANCED, FULL] <b>(REQUIRED)</b></li>
	 *				<li>sessionId : Session ID used during data collection. [max length: 255] </li>
	 *				<li>token : Card token representing card details for the card to be checked. [max length: 255] </li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "fraudCheck", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a list FraudCheck objects.
	 *
	 * @method list
	 * @param {Object} params A map of parameters in which to define the FraudCheck list from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>filter : Filters to apply to the list. </li>
	 *				<li>max : Allows up to a max of 50 list items to return. [min value: 0, max value: 50, default: 20] </li>
	 *				<li>offset : Used in paging of the list.  This is the start offset of the page. [min value: 0, default: 0] </li>
	 *				<li>sorting : Allows for ascending or descending sorting of the list. The value maps properties to the sort direction (either 'asc' for ascending or 'desc' for descending).<br/>Sortable properties are: <ul><li>amount<li>dateCreated<li>fraudResult</li></ul></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.list = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "fraudCheck", 
			action: "list", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a FraudCheck object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the FraudCheck to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "fraudCheck", 
			action: "show", 
			params: id
		}, callback);
	}

	/**
	 * Function to update a FraudCheck object.
	 *
	 * @method update
	 * @param {Object} params A map of parameters on which to update the FraudCheck object.<br/><br/>
	 *			Valid parameters include:<ul> 
	 *				<li>id : A string ID of the FraudCheck object to update</li> 
	 *				</li>
	 *				<li>integratorAuthCode : Authorization code for the transaction. [max length: 255]</li>
	 *				<li>integratorAvsAddressResponse : AVS address response. [max length: 255]</li>
	 *				<li>integratorAvsZipResponse : AVS zip response. [max length: 255]</li>
	 *				<li>integratorCvcResponse : CVC response. [max length: 255]</li>
	 *				<li>integratorDeclineReason : Reason for the decline if applicable. [max length: 255]</li>
	 *				<li>integratorTransactionRef : Reference id for the transaction. [max length: 255] <b>(REQUIRED)</b></li>
	 *				<li>integratorTransactionStatus : Status of the transaction, valid values are "APPROVED", "DECLINED", "SETTLED", "REFUNDED" or "VOIDED".</li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.update = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "fraudCheck", 
			action: "update", 
			params: params
		}, callback);
	}

}

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.invoice.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class Invoice
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function Invoice(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a Invoice object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the Invoice from.<br/><br/>
	 *			Valid parameters include: <ul></li>
	 *				<li>billingAddress.city : Billing address city of the location where the goods or services were supplied. [max length: 255, min length: 2] </li>
	 *				<li>billingAddress.country : Billing address country of the location where the goods or services were supplied. [max length: 2, min length: 2] </li>
	 *				<li>billingAddress.line1 : Billing address line 1 of the location where the goods or services were supplied. [max length: 255] </li>
	 *				<li>billingAddress.line2 : Billing address line 2 of the location where the goods or services were supplied. [max length: 255] </li>
	 *				<li>billingAddress.name : Billing address name of the location where the goods or services were supplied. Will use the customer name if not provided. [max length: 255] </li>
	 *				<li>billingAddress.state : Billing address state of the location where the goods or services were supplied. [max length: 255] </li>
	 *				<li>billingAddress.zip : Billing address zip of the location where the goods or services were supplied. [max length: 32] </li></li>
	 *				<li>businessAddress.city : Address city of the business that is sending the invoice. [max length: 255, min length: 2] </li>
	 *				<li>businessAddress.country : Address country of the business that is sending the invoice. [max length: 2, min length: 2] </li>
	 *				<li>businessAddress.line1 : Address line 1 of the business that is sending the invoice. [max length: 255] </li>
	 *				<li>businessAddress.line2 : Address line 2 of the business that is sending the invoice. [max length: 255] </li>
	 *				<li>businessAddress.name : The name of the business that is sending the invoice. [max length: 255] </li>
	 *				<li>businessAddress.state : Address state of the business that is sending the invoice. [max length: 255] </li>
	 *				<li>businessAddress.zip : Address zip of the business that is sending the invoice. [max length: 32] </li>
	 *				<li>currency : Currency code (ISO-4217). Must match the currency associated with your account. [max length: 3, min length: 3] </li>
	 *				<li>customer : The customer ID of the customer we are invoicing.  This is optional if invoiceToCopy or a name and email are provided </li>
	 *				<li>customerTaxNo : The tax number or VAT id of the person to whom the goods or services were supplied. [max length: 255] </li>
	 *				<li>discountRate : The discount percent as a decimal e.g. 12.5.  This is used to calculate the discount amount which is subtracted from the total amount due before any tax is applied. [max length: 6] </li>
	 *				<li>dueDate : The date invoice payment is due.  If a late fee is provided this will be added to the invoice total is the due date has past. </li>
	 *				<li>email : The email of the customer we are invoicing.  This is optional if customer or invoiceToCopy is provided.  A new customer will be created using the the name and email. </li>
	 *				<li>invoiceId : User defined invoice id. If not provided the system will generate a numeric id. [max length: 255] </li>
	 *				<li>invoiceLanguage : The language in which invoice will be displayed. [max length: 5, min length: 5] </li>
	 *				<li>invoiceToCopy : The id of an existing invoice to be copied.  This is optional if customer or a name and email are provided </li></li>
	 *				<li>items.amount : Amount of the invoice item (the smallest unit of your currency). Example: 100 = $1.00 <b>(REQUIRED)</b></li>
	 *				<li>items.description : The description of the invoice item. [max length: 1024] </li>
	 *				<li>items.invoice : The ID of the invoice this item belongs to. </li>
	 *				<li>items.product : The product this invoice item refers to. </li>
	 *				<li>items.quantity : Quantity of the item.  This total amount of the invoice item is the amount * quantity. [min value: 1, max value: 999999, default: 1] </li>
	 *				<li>items.reference : User defined reference field. [max length: 255] </li>
	 *				<li>items.tax : The tax ID of the tax charge in the invoice item. </li>
	 *				<li>lateFee : The late fee amount that will be added to the invoice total is the due date is past due.  Value provided must be in the smallest unit of your currency. Example: 100 = $1.00 </li>
	 *				<li>memo : A memo that is displayed to the customer on the invoice payment screen. [max length: 4000] </li>
	 *				<li>name : The name of the customer we are invoicing.  This is optional if customer or invoiceToCopy is provided.  A new customer will be created using the the name and email. [max length: 50, min length: 2] </li>
	 *				<li>note : This field can be used to store a note that is not displayed to the customer. [max length: 4000] </li>
	 *				<li>reference : User defined reference field. [max length: 255] </li></li>
	 *				<li>shippingAddress.city : Address city of the location where the goods or services were supplied. [max length: 255, min length: 2] </li>
	 *				<li>shippingAddress.country : Address country of the location where the goods or services were supplied. [max length: 2, min length: 2] </li>
	 *				<li>shippingAddress.line1 : Address line 1 of the location where the goods or services were supplied. [max length: 255] </li>
	 *				<li>shippingAddress.line2 : Address line 2 of the location where the goods or services were supplied. [max length: 255] </li>
	 *				<li>shippingAddress.name : Address name of the location where the goods or services were supplied. [max length: 255] </li>
	 *				<li>shippingAddress.state : Address state of the location where the goods or services were supplied. [max length: 255] </li>
	 *				<li>shippingAddress.zip : Address zip of the location where the goods or services were supplied. [max length: 32] </li>
	 *				<li>suppliedDate : The date on which the goods or services were supplied. </li>
	 *				<li>taxNo : The tax number or VAT id of the person who supplied the goods or services. [max length: 255] </li>
	 *				<li>type : The type of invoice.  One of WEB or MOBILE. [valid values: WEB, MOBILE, default: WEB] </li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "invoice", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to delete a Invoice object.
	 *
	 * @method delete
	 * @param 	A string ID of the Invoice to delete.
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.delete = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "invoice", 
			action: "delete", 
			params: id
		}, callback);
	}

	/**
	 * Function to retrieve a list Invoice objects.
	 *
	 * @method list
	 * @param {Object} params A map of parameters in which to define the Invoice list from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>filter : <table class="filter_list"><tr><td>filter.id</td><td>Filter by the invoice Id</td></tr><tr><td>filter.amount</td><td>Filter by the invoice amount (in the smallest unit of your currency)</td></tr><tr><td>filter.text</td><td>Filter by the name of the invoice</td></tr><tr><td>filter.dateCreatedMin<sup>*</sup></td><td>Filter by the minimum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.dateCreatedMax<sup>*</sup></td><td>Filter by the maximum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.datePaidMin<sup>*</sup></td><td>Filter by the minimum invoice paid date you are searching for - Date in UTC millis</td></tr><tr><td>filter.datePaidMax<sup>*</sup></td><td>Filter by the maximum invoice paid date you are searching for - Date in UTC millis</td></tr><tr><td>filter.status</td><td>Filter by the status of the invoice</td></tr><tr><td>filter.statuses</td><td>Filter by multiple statuses of different invoices</td></tr><tr><td>filter.customer</td><td>Filter using the Id of the customer linked to the invoice</td></tr><tr><td>filter.type</td><td>Filter by the invoice type</td></tr><tr><td>filter.types</td><td>Filter by multiple invoice types</td></tr><tr><td>filter.invoiceId</td><td>Filter by the user defined invoice id</td></tr><tr><td>filter.reference</td><td>Filter by the invoice reference text</td></tr></table><br><sup>*</sup>The filters datePaidMin and datePaidMax can be used in the same filter if you want to search between the two dates. The same is for dateCreatedMin/dateCreatedMax. </li>
	 *				<li>max : Allows up to a max of 50 list items to return. [min value: 0, max value: 50, default: 20] </li>
	 *				<li>offset : Used in paging of the list.  This is the start offset of the page. [min value: 0, default: 0] </li>
	 *				<li>sorting : Allows for ascending or descending sorting of the list. The value maps properties to the sort direction (either 'asc' for ascending or 'desc' for descending).<br/>Sortable properties are: <ul><li>id<li>invoiceDate<li>dueDate<li>datePaid<li>customer<li>status<li>dateCreated</li></ul></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.list = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "invoice", 
			action: "list", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a Invoice object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the Invoice to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "invoice", 
			action: "show", 
			params: id
		}, callback);
	}

	/**
	 * Function to update a Invoice object.
	 *
	 * @method update
	 * @param {Object} params A map of parameters on which to update the Invoice object.<br/><br/>
	 *			Valid parameters include:<ul> 
	 *				<li>id : A string ID of the Invoice object to update</li> </li>
	 *				<li>billingAddress.city : Billing address city of the location where the goods or services were supplied. [max length: 255, min length: 2]</li>
	 *				<li>billingAddress.country : Billing address country of the location where the goods or services were supplied. [max length: 2, min length: 2]</li>
	 *				<li>billingAddress.line1 : Billing address line 1 of the location where the goods or services were supplied. [max length: 255]</li>
	 *				<li>billingAddress.line2 : Billing address line 2 of the location where the goods or services were supplied. [max length: 255]</li>
	 *				<li>billingAddress.name : Billing address name of the location where the goods or services were supplied. [max length: 255]</li>
	 *				<li>billingAddress.state : Billing address state of the location where the goods or services were supplied. [max length: 255]</li>
	 *				<li>billingAddress.zip : Billing address zip of the location where the goods or services were supplied. [max length: 32]</li></li>
	 *				<li>businessAddress.city : Business address city of the business that is sending the invoice. [max length: 255, min length: 2]</li>
	 *				<li>businessAddress.country : Business address country of the business that is sending the invoice. [max length: 2, min length: 2]</li>
	 *				<li>businessAddress.line1 : Business address line 1 of the business that is sending the invoice. [max length: 255]</li>
	 *				<li>businessAddress.line2 : Business address line 2 of the business that is sending the invoice. [max length: 255]</li>
	 *				<li>businessAddress.name : Business address name of the business that is sending the invoice. [max length: 255]</li>
	 *				<li>businessAddress.state : Business address state of the business that is sending the invoice. [max length: 255]</li>
	 *				<li>businessAddress.zip : Business address zip of the business that is sending the invoice. [max length: 32]</li>
	 *				<li>currency : Currency code (ISO-4217). Must match the currency associated with your account. [max length: 3, min length: 3]</li>
	 *				<li>customerTaxNo : The tax number or VAT id of the person to whom the goods or services were supplied. [max length: 255]</li>
	 *				<li>datePaid : This is the date the invoice was PAID in UTC millis.</li>
	 *				<li>discountRate : The discount percent as a decimal e.g. 12.5.  This is used to calculate the discount amount which is subtracted from the total amount due before any tax is applied. [max length: 6]</li>
	 *				<li>dueDate : The date invoice payment is due.  If a late fee is provided this will be added to the invoice total is the due date has past.</li>
	 *				<li>email : The email of the customer we are invoicing.  This is optional if customer or invoiceToCopy is provided.  A new customer will be created using the the name and email.</li>
	 *				</li>
	 *				<li>invoiceId : User defined invoice id. If not provided the system will generate a numeric id. [max length: 255]</li>
	 *				<li>invoiceLanguage : The language in which invoice will be displayed. [max length: 5, min length: 5]</li></li>
	 *				<li>items.amount : Amount of the invoice item in the smallest unit of your currency. Example: 100 = $1.00 <b>(REQUIRED)</b></li>
	 *				<li>items.description : The description of the invoice item. [max length: 1024]</li>
	 *				<li>items.invoice : The ID of the invoice this item belongs to.</li>
	 *				<li>items.product : The Id of the product this item refers to.</li>
	 *				<li>items.quantity : Quantity of the item.  This total amount of the invoice item is the amount * quantity. [min value: 1, max value: 999999, default: 1]</li>
	 *				<li>items.reference : User defined reference field. [max length: 255]</li>
	 *				<li>items.tax : The tax ID of the tax charge in the invoice item.</li>
	 *				<li>lateFee : The late fee amount that will be added to the invoice total is the due date is past due.  Value provided must be in the smallest unit of your currency. Example: 100 = $1.00</li>
	 *				<li>memo : A memo that is displayed to the customer on the invoice payment screen. [max length: 4000]</li>
	 *				<li>name : The name of the customer we are invoicing.  This is optional if customer or invoiceToCopy is provided.  A new customer will be created using the the name and email. [max length: 50, min length: 2]</li>
	 *				<li>note : This field can be used to store a note that is not displayed to the customer. [max length: 4000]</li>
	 *				<li>payment : The ID of the payment.  Use this ID to query the /payment API. [max length: 255]</li>
	 *				<li>reference : User defined reference field. [max length: 255]</li>
	 *				<li>sendMail : Boolean flag.  If true the invoice will be sent to the customer if the invoice is in an OPEN state. [default: false] <b>(REQUIRED)</b></li></li>
	 *				<li>shippingAddress.city : Address city of the location where the goods or services were supplied. [max length: 255, min length: 2]</li>
	 *				<li>shippingAddress.country : Address country of the location where the goods or services were supplied. [max length: 2, min length: 2]</li>
	 *				<li>shippingAddress.line1 : Address line 1 of the location where the goods or services were supplied. [max length: 255]</li>
	 *				<li>shippingAddress.line2 : Address line 2 of the location where the goods or services were supplied. [max length: 255]</li>
	 *				<li>shippingAddress.name : Address name of the location where the goods or services were supplied. [max length: 255]</li>
	 *				<li>shippingAddress.state : Address state of the location where the goods or services were supplied. [max length: 255]</li>
	 *				<li>shippingAddress.zip : Address zip of the location where the goods or services were supplied. [max length: 32]</li>
	 *				<li>status : New status of the invoice.</li>
	 *				<li>suppliedDate : The date on which the goods or services were supplied.</li>
	 *				<li>taxNo : The tax number or VAT id of the person who supplied the goods or services. [max length: 255]</li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.update = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "invoice", 
			action: "update", 
			params: params
		}, callback);
	}

}

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.invoiceitem.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class InvoiceItem
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function InvoiceItem(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a InvoiceItem object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the InvoiceItem from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>amount : Amount of the invoice item in the smallest unit of your currency. Example: 100 = $1.00 <b>(REQUIRED)</b></li>
	 *				<li>description : Individual items of an invoice [max length: 1024] </li>
	 *				<li>invoice : The ID of the invoice this item belongs to. </li>
	 *				<li>product : Product ID this item relates to. </li>
	 *				<li>quantity : Quantity of the item.  This total amount of the invoice item is the amount * quantity. [min value: 1, max value: 999999, default: 1] </li>
	 *				<li>reference : User defined reference field. [max length: 255] </li>
	 *				<li>tax : The tax ID of the tax charge in the invoice item. </li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "invoiceItem", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to delete a InvoiceItem object.
	 *
	 * @method delete
	 * @param 	A string ID of the InvoiceItem to delete.
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.delete = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "invoiceItem", 
			action: "delete", 
			params: id
		}, callback);
	}

	/**
	 * Function to retrieve a InvoiceItem object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the InvoiceItem to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "invoiceItem", 
			action: "show", 
			params: id
		}, callback);
	}

	/**
	 * Function to update a InvoiceItem object.
	 *
	 * @method update
	 * @param {Object} params A map of parameters on which to update the InvoiceItem object.<br/><br/>
	 *			Valid parameters include:<ul> 
	 *				<li>id : A string ID of the InvoiceItem object to update</li> 
	 *				<li>amount : Amount of the invoice item in the smallest unit of your currency. Example: 100 = $1.00 [min value: 1]</li>
	 *				<li>description : Individual items of an invoice</li>
	 *				</li>
	 *				<li>quantity : Quantity of the item.  This total amount of the invoice item is the amount * quantity. [min value: 1, max value: 999999]</li>
	 *				<li>reference : User defined reference field.</li>
	 *				<li>tax : The tax ID of the tax charge in the invoice item.</li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.update = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "invoiceItem", 
			action: "update", 
			params: params
		}, callback);
	}

}

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.payment.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class Payment
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function Payment(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a Payment object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the Payment from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>amount : Amount of the payment (in the smallest unit of your currency). Example: 100 = $1.00 </li>
	 *				<li>authorization : The ID of the authorization being used to capture the payment. </li></li>
	 *				<li>card.addressCity : City of the cardholder. [max length: 50, min length: 2] </li>
	 *				<li>card.addressCountry : Country code (ISO-3166-1-alpha-2 code) of residence of the cardholder. [max length: 2, min length: 2] </li>
	 *				<li>card.addressLine1 : Address of the cardholder. [max length: 255] </li>
	 *				<li>card.addressLine2 : Address of the cardholder if needed. [max length: 255] </li>
	 *				<li>card.addressState : State of residence of the cardholder. State abbreviations should be used. [max length: 255] </li>
	 *				<li>card.addressZip : Postal code of the cardholder. The postal code size is between 5 and 9 in length and only contain numbers or letters. [max length: 32] </li>
	 *				<li>card.cvc : CVC security code of the card. This is the code on the back of the card. Example: 123 </li>
	 *				<li>card.expMonth : Expiration month of the card. Format is MM. Example: January = 01 [min value: 1, max value: 12] </li>
	 *				<li>card.expYear : Expiration year of the card. Format is YY. Example: 2013 = 13 [min value: 0, max value: 99] </li>
	 *				<li>card.name : Name as it appears on the card. [max length: 50, min length: 2] </li>
	 *				<li>card.number : Card number as it appears on the card. [max length: 19, min length: 13] </li>
	 *				<li>currency : Currency code (ISO-4217) for the transaction. Must match the currency associated with your account. [default: USD] <b>(REQUIRED)</b></li>
	 *				<li>customer : ID of customer. If specified, card on file of customer will be used. </li>
	 *				<li>description : Free form text field to be used as a description of the payment. This field is echoed back with the payment on any find or list operations. [max length: 1024] </li>
	 *				<li>invoice : ID of invoice for which this payment is being made. </li></li>
	 *				<li>order.commodityCode : Standard classification code for products and services. [max length: 5] </li>
	 *				<li>order.customer : ID of the customer associated with the order. </li>
	 *				<li>order.customerEmail : Customer email address. </li>
	 *				<li>order.customerName : Customer name. </li>
	 *				<li>order.customerNote : Additional notes provided by the customer. [max length: 255] </li>
	 *				<li>order.customerReference : A merchant reference for the customer. </li></li>
	 *				<li>order.items.amount : Cost of the item. </li>
	 *				<li>order.items.description : Description of the item. </li>
	 *				<li>order.items.name : Item name. </li>
	 *				<li>order.items.product : Product information associated with the item. </li>
	 *				<li>order.items.quantity : Quantity of the item contained in the order [min value: 1, max value: 999999, default: 1] <b>(REQUIRED)</b></li>
	 *				<li>order.items.reference : A merchant reference for the item. [max length: 255] </li>
	 *				<li>order.items.tax : Taxes associated with the item. </li>
	 *				<li>order.merchantNote : Additional notes provided by the merchant. [max length: 255] </li>
	 *				<li>order.payment : ID of the payment associated with the order. </li>
	 *				<li>order.reference : A merchant reference for the order. [max length: 255] </li></li>
	 *				<li>order.shippingAddress.city : City, town, or municipality. [max length: 255, min length: 2] </li>
	 *				<li>order.shippingAddress.country : 2-character country code. [max length: 2, min length: 2] </li>
	 *				<li>order.shippingAddress.line1 : Street address. [max length: 255] </li>
	 *				<li>order.shippingAddress.line2 : (Opt) Street address continued. [max length: 255] </li>
	 *				<li>order.shippingAddress.name : Name of the entity being shipped to. [max length: 255] </li>
	 *				<li>order.shippingAddress.state : State or province. [max length: 255] </li>
	 *				<li>order.shippingAddress.zip : Postal code. [max length: 32] </li></li>
	 *				<li>order.shippingFromAddress.city : City, town, or municipality. [max length: 255, min length: 2] </li>
	 *				<li>order.shippingFromAddress.country : 2-character country code. [max length: 2, min length: 2] </li>
	 *				<li>order.shippingFromAddress.line1 : Street address. [max length: 255] </li>
	 *				<li>order.shippingFromAddress.line2 : (Opt) Street address continued. [max length: 255] </li>
	 *				<li>order.shippingFromAddress.name : Name of the entity performing the shipping. [max length: 255] </li>
	 *				<li>order.shippingFromAddress.state : State or province. [max length: 255] </li>
	 *				<li>order.shippingFromAddress.zip : Postal code. [max length: 32] </li>
	 *				<li>order.shippingName : Name of the entity being shipped to. </li>
	 *				<li>order.source : Order source. [default: WEB] <b>(REQUIRED)</b></li>
	 *				<li>order.status : Status of the order. [default: INCOMPLETE] <b>(REQUIRED)</b></li>
	 *				<li>reference : Custom reference field to be used with outside systems. </li>
	 *				<li>replayId : An identifier that can be sent to uniquely identify a payment request to facilitate retries due to I/O related issues. This identifier must be unique for your account (sandbox or live) across all of your payments. If supplied, we will check for a payment on your account that matches this identifier. If found will attempt to return an identical response of the original request. [max length: 50, min length: 1] </li></li>
	 *				<li>statementDescription.name : Merchant name. <b>(REQUIRED)</b></li>
	 *				<li>statementDescription.phoneNumber : Merchant contact phone number. </li>
	 *				<li>taxExempt : Specify true to indicate that the payment is tax-exempt. </li>
	 *				<li>token : If specified, card associated with card token will be used. [max length: 255] </li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "payment", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a list Payment objects.
	 *
	 * @method list
	 * @param {Object} params A map of parameters in which to define the Payment list from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>filter : <table class="filter_list"><tr><td>filter.id</td><td>Filter by the payment Id</td></tr><tr><td>filter.replayId</td><td>Filter by the compoundReplayId</td></tr><tr><td>filter.last4</td><td>Filter by the card number (last 4 digits)</td></tr><tr><td>filter.amount</td><td>Filter by the payment amount (in the smallest unit of your currency)</td></tr><tr><td>filter.text</td><td>Filter by the description of the payment</td></tr><tr><td>filter.amountMin & filter.amountMax</td><td>The filter amountMin must be used with amountMax to find payments with payments amounts between the min and max figures</td></tr><tr><td>filter.dateCreatedMin<sup>*</sup></td><td>Filter by the minimum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.dateCreatedMax<sup>*</sup></td><td>Filter by the maximum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.deposit</td><td>Filter by the deposit id connected to the payment</td></tr><tr><td>filter.customer</td><td>Filter using the Id of the customer to find the payments for that customer</td></tr><tr><td>filter.status</td><td>Filter by the payment status text</td></tr><tr><td>filter.reference</td><td>Filter by the payment reference text</td></tr><tr><td>filter.authCode</td><td>Filter by the payment authorization code (Not the authorization ID)</td></tr><tr><td>filter.q</td><td>You can use this to filter by the Id, the authCode or the amount of the payment</td></tr></table><br><sup>*</sup>Use dateCreatedMin with dateCreatedMax in the same filter if you want to search between two created dates </li>
	 *				<li>max : Allows up to a max of 50 list items to return. [min value: 0, max value: 50, default: 20] </li>
	 *				<li>offset : Used in paging of the list.  This is the start offset of the page. [min value: 0, default: 0] </li>
	 *				<li>sorting : Allows for ascending or descending sorting of the list. The value maps properties to the sort direction (either 'asc' for ascending or 'desc' for descending).<br/>Sortable properties are: <ul><li>dateCreated<li>createdBy<li>amount<li>id<li>description<li>paymentDate</li></ul></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.list = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "payment", 
			action: "list", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a Payment object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the Payment to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "payment", 
			action: "show", 
			params: id
		}, callback);
	}

	/**
	 * Function to update a Payment object.
	 *
	 * @method update
	 * @param {Object} params A map of parameters on which to update the Payment object.<br/><br/>
	 *			Valid parameters include:<ul> 
	 *				<li>id : A string ID of the Payment object to update</li> 
	 *				</li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.update = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "payment", 
			action: "update", 
			params: params
		}, callback);
	}

}

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.plan.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class Plan
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function Plan(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a Plan object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the Plan from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>amount : Amount of payment for the plan in the smallest unit of your currency. Example: 100 = $1.00 <b>(REQUIRED)</b></li>
	 *				<li>billingCycle : How the plan is billed to the customer. Values must be AUTO (indefinitely until the customer cancels) or FIXED (a fixed number of billing cycles). [default: AUTO] </li>
	 *				<li>billingCycleLimit : The number of fixed billing cycles for a plan. Only used if the billingCycle parameter is set to FIXED. Example: 4 </li>
	 *				<li>currency : Currency code (ISO-4217) for the plan. Must match the currency associated with your account. [default: USD] <b>(REQUIRED)</b></li>
	 *				<li>frequency : Frequency of payment for the plan. Used in conjunction with frequencyPeriod. Valid values are "DAILY", "WEEKLY", "MONTHLY" and "YEARLY". [default: MONTHLY] <b>(REQUIRED)</b></li>
	 *				<li>frequencyPeriod : Period of frequency of payment for the plan. Example: if the frequency is weekly, and periodFrequency is 2, then the subscription is billed bi-weekly. [min value: 1, default: 1] <b>(REQUIRED)</b></li>
	 *				<li>name : Name of the plan [max length: 50, min length: 2] <b>(REQUIRED)</b></li>
	 *				<li>renewalReminderLeadDays : If set, how many days before the next billing cycle that a renewal reminder is sent to the customer. If null, then no emails are sent. Minimum value is 7 if set. </li>
	 *				<li>trialPeriod : Plan free trial period selection.  Must be Days, Weeks, or Month [default: NONE] <b>(REQUIRED)</b></li>
	 *				<li>trialPeriodQuantity : Quantity of the trial period.  Must be greater than 0 and a whole number. [min value: 1] </li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "plan", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to delete a Plan object.
	 *
	 * @method delete
	 * @param 	A string ID of the Plan to delete.
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.delete = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "plan", 
			action: "delete", 
			params: id
		}, callback);
	}

	/**
	 * Function to retrieve a list Plan objects.
	 *
	 * @method list
	 * @param {Object} params A map of parameters in which to define the Plan list from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>filter : <table class="filter_list"><tr><td>filter.id</td><td>Filter by the plan Id</td></tr><tr><td>filter.text</td><td>Filter by the name of the plan</td></tr><tr><td>filter.frequency</td><td>Filter by the frequency of the plan</td></tr><tr><td>filter.amountMin & filter.amountMax</td><td>The filter amountMin must be used with amountMax to find plans with plan values between the min and max figures</td></tr><tr><td>filter.dateCreatedMin<sup>*</sup></td><td>Filter by the minimum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.dateCreatedMax<sup>*</sup></td><td>Filter by the maximum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.q</td><td>You can use this to filter by the Id, the name or the amount of the plan</td></tr></table><br><sup>*</sup>Use dateCreatedMin with dateCreatedMax in the same filter if you want to search between two created dates </li>
	 *				<li>max : Allows up to a max of 50 list items to return. [min value: 0, max value: 50, default: 20] </li>
	 *				<li>offset : Used in paging of the list.  This is the start offset of the page. [min value: 0, default: 0] </li>
	 *				<li>sorting : Allows for ascending or descending sorting of the list. The value maps properties to the sort direction (either 'asc' for ascending or 'desc' for descending).<br/>Sortable properties are: <ul><li>dateCreated<li>amount<li>frequency<li>name<li>id</li></ul></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.list = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "plan", 
			action: "list", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a Plan object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the Plan to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "plan", 
			action: "show", 
			params: id
		}, callback);
	}

	/**
	 * Function to update a Plan object.
	 *
	 * @method update
	 * @param {Object} params A map of parameters on which to update the Plan object.<br/><br/>
	 *			Valid parameters include:<ul> 
	 *				<li>id : A string ID of the Plan object to update</li> 
	 *				</li>
	 *				<li>name : Name of the plan. [min length: 2] <b>(REQUIRED)</b></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.update = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "plan", 
			action: "update", 
			params: params
		}, callback);
	}

}

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.refund.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class Refund
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function Refund(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a Refund object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the Refund from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>amount : Amount of the refund in the smallest unit of your currency. Example: 100 = $1.00 <b>(REQUIRED)</b></li>
	 *				<li>payment : ID of the payment for the refund </li>
	 *				<li>reason : Reason for the refund </li>
	 *				<li>reference : Custom reference field to be used with outside systems. </li>
	 *				<li>replayId : An identifier that can be sent to uniquely identify a refund request to facilitate retries due to I/O related issues. This identifier must be unique for your account (sandbox or live) across all of your refunds. If supplied, we will check for a refund on your account that matches this identifier. If found we will return an identical response to that of the original request. [max length: 50, min length: 1] </li></li>
	 *				<li>statementDescription.name : Merchant name. <b>(REQUIRED)</b></li>
	 *				<li>statementDescription.phoneNumber : Merchant contact phone number. </li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "refund", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a list Refund objects.
	 *
	 * @method list
	 * @param {Object} params A map of parameters in which to define the Refund list from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>filter : <table class="filter_list"><tr><td>filter.id</td><td>Filter by the refund Id</td></tr><tr><td>filter.text</td><td>Filter by the refund description text</td></tr><tr><td>filter.replayId</td><td>Filter by the compoundReplayId</td></tr><tr><td>filter.authCode</td><td>Filter by the authorization code (Not authorization ID)</td></tr><tr><td>filter.amount</td><td>Filter by the refund amount (in the smallest unit of your currency)</td></tr><tr><td>filter.dateCreatedMin<sup>*</sup></td><td>Filter by the minimum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.dateCreatedMax<sup>*</sup></td><td>Filter by the maximum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.deposit</td><td>Filter by the deposit id</td></tr><tr><td>filter.q</td><td>You can use this to filter by the Id, the authCode or the amount of the refund</td></tr></table><br><sup>*</sup>Use dateCreatedMin with dateCreatedMax in the same filter if you want to search between two created dates </li>
	 *				<li>max : Allows up to a max of 50 list items to return. [min value: 0, max value: 50, default: 20] </li>
	 *				<li>offset : Used in paging of the list.  This is the start offset of the page. [min value: 0, default: 0] </li>
	 *				<li>sorting : Allows for ascending or descending sorting of the list. The value maps properties to the sort direction (either 'asc' for ascending or 'desc' for descending).<br/>Sortable properties are: <ul><li>id<li>amount<li>description<li>dateCreated<li>paymentDate</li></ul></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.list = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "refund", 
			action: "list", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a Refund object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the Refund to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "refund", 
			action: "show", 
			params: id
		}, callback);
	}

}

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.subscription.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class Subscription
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function Subscription(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a Subscription object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the Subscription from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>amount : Amount of the payment in the smallest unit of your currency. Example: 100 = $1.00 </li>
	 *				<li>billingCycle : How the plan is billed to the customer. Values must be AUTO (indefinitely until the customer cancels) or FIXED (a fixed number of billing cycles). [default: AUTO] </li>
	 *				<li>billingCycleLimit : The number of fixed billing cycles for a plan. Only used if the billingCycle parameter is set to FIXED. Example: 4 </li>
	 *				<li>coupon : Coupon ID associated with the subscription </li>
	 *				<li>currency : Currency code (ISO-4217). Must match the currency associated with your account. </li>
	 *				<li>currentPeriodEnd : End date of subscription's current period </li>
	 *				<li>currentPeriodStart : Start date of subscription's current period </li>
	 *				<li>customer : Customer that is enrolling in the subscription. </li>
	 *				<li>frequency : Frequency of payment for the plan. Used in conjunction with frequencyPeriod. Valid values are "DAILY", "WEEKLY", "MONTHLY" and "YEARLY". </li>
	 *				<li>frequencyPeriod : Period of frequency of payment for the plan. Example: if the frequency is weekly, and periodFrequency is 2, then the subscription is billed bi-weekly. </li>
	 *				<li>name : Name describing subscription [max length: 50] </li>
	 *				<li>plan : The ID of the plan that should be used for the subscription. </li>
	 *				<li>quantity : Quantity of the plan for the subscription. [min value: 1] </li>
	 *				<li>renewalReminderLeadDays : If set, how many days before the next billing cycle that a renewal reminder is sent to the customer. If null, then no emails are sent. Minimum value is 7 if set. </li>
	 *				<li>source : Source of where subscription was created </li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "subscription", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to delete a Subscription object.
	 *
	 * @method delete
	 * @param 	A string ID of the Subscription to delete.
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.delete = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "subscription", 
			action: "delete", 
			params: id
		}, callback);
	}

	/**
	 * Function to retrieve a list Subscription objects.
	 *
	 * @method list
	 * @param {Object} params A map of parameters in which to define the Subscription list from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>filter : <table class="filter_list"><tr><td>filter.customer</td><td>Filter by the Id of the customer with the subscription</td></tr><tr><td>filter.plan</td><td>Filter by the Id of the plan linked to the subscription</td></tr><tr><td>filter.dateCreatedMin<sup>*</sup></td><td>Filter by the minimum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.dateCreatedMax<sup>*</sup></td><td>Filter by the maximum created date you are searching for - Date in UTC millis</td></tr><tr><td>filter.q</td><td>You can use this to filter by the Id, the name or the amount of the subscription</td></tr></table><br><sup>*</sup>Use dateCreatedMin with dateCreatedMax in the same filter if you want to search between two created dates </li>
	 *				<li>max : Allows up to a max of 50 list items to return. [min value: 0, max value: 50, default: 20] </li>
	 *				<li>offset : Used in paging of the list.  This is the start offset of the page. [min value: 0, default: 0] </li>
	 *				<li>sorting : Allows for ascending or descending sorting of the list. The value maps properties to the sort direction (either 'asc' for ascending or 'desc' for descending).<br/>Sortable properties are: <ul><li>dateCreated<li>id<li>plan</li></ul></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.list = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "subscription", 
			action: "list", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a Subscription object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the Subscription to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "subscription", 
			action: "show", 
			params: id
		}, callback);
	}

	/**
	 * Function to update a Subscription object.
	 *
	 * @method update
	 * @param {Object} params A map of parameters on which to update the Subscription object.<br/><br/>
	 *			Valid parameters include:<ul> 
	 *				<li>id : A string ID of the Subscription object to update</li> 
	 *				<li>amount : Amount of the payment in the smallest unit of your currency. Example: 100 = $1.00</li>
	 *				<li>billingCycle : How the plan is billed to the customer. Values must be AUTO (indefinitely until the customer cancels) or FIXED (a fixed number of billing cycles). [default: AUTO]</li>
	 *				<li>billingCycleLimit : The number of fixed billing cycles for a plan. Only used if the billingCycle parameter is set to FIXED. Example: 4</li>
	 *				<li>coupon : Coupon being assigned to this subscription</li>
	 *				<li>currency : Currency code (ISO-4217). Must match the currency associated with your account.</li>
	 *				<li>currentPeriodEnd : End date of subscription's current period</li>
	 *				<li>currentPeriodStart : Start date of subscription's current period</li>
	 *				<li>frequency : Frequency of payment for the plan. Used in conjunction with frequencyPeriod. Valid values are "DAILY", "WEEKLY", "MONTHLY" and "YEARLY".</li>
	 *				<li>frequencyPeriod : Period of frequency of payment for the plan. Example: if the frequency is weekly, and periodFrequency is 2, then the subscription is billed bi-weekly. [min value: 1]</li>
	 *				</li>
	 *				<li>name : Name describing subscription</li>
	 *				<li>plan : Plan that should be used for the subscription.</li>
	 *				<li>prorate : Whether to prorate existing subscription. [default: true] <b>(REQUIRED)</b></li>
	 *				<li>quantity : Quantity of the plan for the subscription. [min value: 1]</li>
	 *				<li>renewalReminderLeadDays : If set, how many days before the next billing cycle that a renewal reminder is sent to the customer. If null or 0, no emails are sent. Minimum value is 7 if set.</li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.update = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "subscription", 
			action: "update", 
			params: params
		}, callback);
	}

}

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.tax.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class Tax
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function Tax(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a Tax object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the Tax from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>label : The label of the tax object. [max length: 255] <b>(REQUIRED)</b></li>
	 *				<li>rate : The tax rate.  Decimal value up three decimal places.  e.g 12.501. [max length: 6] <b>(REQUIRED)</b></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "tax", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to delete a Tax object.
	 *
	 * @method delete
	 * @param 	A string ID of the Tax to delete.
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.delete = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "tax", 
			action: "delete", 
			params: id
		}, callback);
	}

	/**
	 * Function to retrieve a list Tax objects.
	 *
	 * @method list
	 * @param {Object} params A map of parameters in which to define the Tax list from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>filter : <table class="filter_list"><tr><td>filter.id</td><td>Filter by the Id of the tax</td></tr><tr><td>filter.label</td><td>Filter by the label(name) of the tax</td></tr></table> </li>
	 *				<li>max : Allows up to a max of 50 list items to return. [min value: 0, max value: 50, default: 20] </li>
	 *				<li>offset : Used in paging of the list.  This is the start offset of the page. [min value: 0, default: 0] </li>
	 *				<li>sorting : Allows for ascending or descending sorting of the list. The value maps properties to the sort direction (either 'asc' for ascending or 'desc' for descending).<br/>Sortable properties are: <ul><li>id<li>label</li></ul></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.list = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "tax", 
			action: "list", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a Tax object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the Tax to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "tax", 
			action: "show", 
			params: id
		}, callback);
	}

}

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.transactionreview.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class TransactionReview
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function TransactionReview(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a TransactionReview object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the TransactionReview from.<br/><br/>
	 *			Valid parameters include: <ul></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "transactionReview", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to delete a TransactionReview object.
	 *
	 * @method delete
	 * @param 	A string ID of the TransactionReview to delete.
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.delete = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "transactionReview", 
			action: "delete", 
			params: id
		}, callback);
	}

	/**
	 * Function to retrieve a list TransactionReview objects.
	 *
	 * @method list
	 * @param {Object} params A map of parameters in which to define the TransactionReview list from.<br/><br/>
	 *			Valid parameters include: <ul></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.list = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "transactionReview", 
			action: "list", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a TransactionReview object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the TransactionReview to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "transactionReview", 
			action: "show", 
			params: id
		}, callback);
	}

	/**
	 * Function to update a TransactionReview object.
	 *
	 * @method update
	 * @param {Object} params A map of parameters on which to update the TransactionReview object.<br/><br/>
	 *			Valid parameters include:<ul> 
	 *				<li>id : A string ID of the TransactionReview object to update</li> </ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.update = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "transactionReview", 
			action: "update", 
			params: params
		}, callback);
	}

}

/*
 * Copyright (c) 2013 - 2022 MasterCard International Incorporated
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * This is a Simplify domain object.
 * In order to get access to a domain object, a client needs to be created.
 * The client is then used to invoke the different methods e.g.
 *
 * <pre><code>var client = Simplify.getClient({
 *	publicKey: 'YOUR_PUBLIC_API_KEY',
 *	privateKey: 'YOUR_PRIVATE_API_KEY'
 * });
 * 
 * client.webhook.METHOD_NAME(params, function(error, data){
 *	if(error){
 *		// handle the error
 * 	}
 * 
 * 	// Awesome...no error, handle the data
 * });
 * </code></pre>
 *
 * @class Webhook
 * @constructor
 * @param {Object} appKeys Object containing the public & private API keys
 */
function Webhook(appKeys) {
	this.appKeys = appKeys;

	/**
	 * Function to create a Webhook object.
	 *
	 * @method create
	 * @param {Object} params A map of parameters in which to create the Webhook from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>url : Endpoint URL <b>(REQUIRED)</b></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.create = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "webhook", 
			action: "create", 
			params: params
		}, callback);
	}

	/**
	 * Function to delete a Webhook object.
	 *
	 * @method delete
	 * @param 	A string ID of the Webhook to delete.
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.delete = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "webhook", 
			action: "delete", 
			params: id
		}, callback);
	}

	/**
	 * Function to retrieve a list Webhook objects.
	 *
	 * @method list
	 * @param {Object} params A map of parameters in which to define the Webhook list from.<br/><br/>
	 *			Valid parameters include: <ul>
	 *				<li>filter : Filters to apply to the list. </li>
	 *				<li>max : Allows up to a max of 50 list items to return. [min value: 0, max value: 50, default: 20] </li>
	 *				<li>offset : Used in paging of the list.  This is the start offset of the page. [min value: 0, default: 0] </li>
	 *				<li>sorting : Allows for ascending or descending sorting of the list. The value maps properties to the sort direction (either 'asc' for ascending or 'desc' for descending).<br/>Sortable properties are: <ul><li>dateCreated</li></ul></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.list = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "webhook", 
			action: "list", 
			params: params
		}, callback);
	}

	/**
	 * Function to retrieve a Webhook object from the API.
	 *
	 * @method find
	 * @param {String} id The ID of the Webhook to retrieve
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.find = function(id, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "webhook", 
			action: "show", 
			params: id
		}, callback);
	}

	/**
	 * Function to update a Webhook object.
	 *
	 * @method update
	 * @param {Object} params A map of parameters on which to update the Webhook object.<br/><br/>
	 *			Valid parameters include:<ul> 
	 *				<li>id : A string ID of the Webhook object to update</li> 
	 *				</li>
	 *				<li>url : Endpoint URL <b>(REQUIRED)</b></li></ul><br/>
	 *			<b>NOTE:</b> Any parameters with a sub-parameter (e.g. param.subParam) need to be nested when passed as an argument in e.g. 
	 *<pre><code>{
		param: {
	 *		subParam1: 'value', 
	 *		subParam2: 'value'
	 *	}
	 *}</code></pre>
	 * @param {Function} callback A function to handle success/error responses from the API.<br/>
	 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
	 */
	this.update = function(params, callback) {
		Payments.execute({
			auth: this.appKeys, 
			domainType: "webhook", 
			action: "update", 
			params: params
		}, callback);
	}

}

