"use strict";
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
exports.__esModule = true;
exports.jwsDecode = exports.execute = exports.OAUTH_BASE_URL = exports.API_BASE_SANDBOX_URL = exports.API_BASE_LIVE_URL = void 0;
/**
 * This module exposes the different domain
 * object on which different API calls can be
 * invoked upon.
 *
 * @class Payments
 * @static
 */
var SimplifyError = require("./error");
var Constants = require("./constants");
var jws = require("./simplifyJws");
var utils = require("./simplifyUtils");
var http = require("http");
var https = require("https");
var url = require("url");
/**
 * My property description.  Like other pieces of your comment blocks,
 * this can span multiple lines.
 *
 * @property API_BASE_LIVE_URL
 * @type {String}
 * @default Constants.API_BASE_LIVE_URL value
 */
exports.API_BASE_LIVE_URL = Constants.API_BASE_LIVE_URL;
/**
 * My property description.  Like other pieces of your comment blocks,
 * this can span multiple lines.
 *
 * @property API_BASE_SANDBOX_URL
 * @type {String}
 * @default Constants.API_BASE_SANDBOX_URL value
 */
exports.API_BASE_SANDBOX_URL = Constants.API_BASE_SANDBOX_URL;
/**
 * My property description.  Like other pieces of your comment blocks,
 * this can span multiple lines.
 *
 * @property OAUTH_BASE_URL
 * @type {String}
 * @default Constants.OAUTH_BASE_URL value
 */
exports.OAUTH_BASE_URL = Constants.OAUTH_BASE_URL;
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
var execute = function (opts, callback) {
    var auth = opts.auth, domainType = opts.domainType, action = opts.action, params = opts.params;
    // Validate that the API keys are set
    if (!areAPIKeysSet(auth, callback)) {
        return;
    }
    var uri, httpMethod;
    if (domainType === "accessToken") {
        uri = getAccessTokenURI(action, params);
        httpMethod = "POST";
        params = getAccessTokenParams(action, params);
    }
    else {
        uri = getURI(auth.publicKey, domainType, action, params);
        httpMethod = getHttpMethod(action);
    }
    var jwsSignature = jws.getJWSSignature(auth, params, uri.href);
    var requestOptions = getRequestOptions(httpMethod, jwsSignature, uri);
    var protocol = http;
    if (uri.protocol === "https:") {
        protocol = https;
    }
    // Exec async API HTTP request
    var httpRequest = protocol.request(requestOptions, function (httpResponse) {
        var httpResponseData = "";
        httpResponse.setEncoding('utf8');
        // Handle successful response
        httpResponse.on('data', function (data) {
            httpResponseData += data;
        });
        httpResponse.on('end', function () {
            var jsonResponse = JSON.parse(httpResponseData);
            if (utils.isUndefined(jsonResponse.error)) {
                callback(null, jsonResponse);
            }
            else {
                callback(new SimplifyError.API('Error executing API call', jsonResponse), null);
            }
        });
    }).on('error', function (errorResponse) {
        // Catch our timeout error thrown below
        if (errorResponse.code === "ECONNRESET") {
            callback(new SimplifyError.API('The API request has timed out', errorResponse), null);
        }
        else {
            // Return error from API call
            callback(new SimplifyError.API('Error executing API call', errorResponse), null);
        }
    }).on('socket', function (socket) {
        // Set timeout on the HTTP request
        socket.setTimeout(30000);
        socket.on('timeout', function () {
            // Killing the request which throws an Error and is caught above in the error block
            httpRequest.abort();
        });
    });
    // If POST request, then write to the body of the request
    if (requestOptions.method === "POST" || requestOptions.method === "PUT") {
        httpRequest.write(jwsSignature);
    }
    httpRequest.end();
};
exports.execute = execute;
/**
 * Function to decode a signature of a Webhook event returned by Simplify.
 *
 * @method jwsDecode
 * @param {Object} auth An object containing the public & private API keys
 * @param {Object} params The request paramaters
 * @param {Function} errorHandler A callback function to handle an success/error responses from the API
 */
var jwsDecode = function (opts, callback) {
    var auth = opts.auth, params = opts.params;
    // Validate that the API keys are set
    if (!areAPIKeysSet(auth, callback)) {
        return;
    }
    if (utils.isUndefined(params.payload)) {
        callback(new SimplifyError.JWS('Missing payload paramater'), null);
        return;
    }
    if (utils.isUndefined(params.url)) {
        callback(new SimplifyError.JWS('Missing url paramater'), null);
        return;
    }
    var decodedPayload = jws.decodeSignature(params.payload);
    if (utils.isUndefined(decodedPayload.payload)) {
        callback(new SimplifyError.JWS('Event data is missing its payload'), null);
        return;
    }
    if (!jws.isJWSHeaderValid(decodedPayload.header, auth.publicKey, params.url, callback)) {
        return;
    }
    var payload = decodedPayload.payload.toString().trim();
    callback(null, JSON.parse(payload));
};
exports.jwsDecode = jwsDecode;
/**
 * Function to check whether the user's API keys are set or not.
 *
 * @method areAPIKeysSet
 * @private
 * @param {Object} auth An object containing the public & private API keys
 * @param {Function} callback A callback function to handle an errors
 * @return {Boolean} Returns true if both public & private API keys are set
 */
function areAPIKeysSet(auth, callback) {
    if (utils.isUndefined(auth.publicKey)) {
        callback(new SimplifyError.API('Missing API Key - Simplify.PUBLIC_KEY'), null);
        return false;
    }
    if (utils.isUndefined(auth.privateKey)) {
        callback(new SimplifyError.API('Missing API Key - Simplify.PRIVATE_KEY'), null);
        return false;
    }
    return true;
}
/**
 * Function to get the Oauth params.
 *
 * @method getAccessTokenParams
 * @private
 * @param {String} action The type of action being invoked on the domain object
 * @param {Object} params The request paramaters
 * @return {String} Returns url query parameter string
 */
function getAccessTokenParams(action, params) {
    var tokenParams;
    switch (action) {
        case "create":
            tokenParams = "grant_type=authorization_code&code=" + params.authCode + "&redirect_uri=" + params.redirectUri;
            break;
        case "refresh":
            tokenParams = "grant_type=refresh_token&refresh_token=" + params;
            break;
        case "revoke":
            tokenParams = "token=" + params;
            break;
    }
    return tokenParams;
}
/**
 * Function to build up the URI endpoint to use in the request
 * for all AccessToken functionality.
 *
 * @method getAccessTokenURI
 * @private
 * @param {String} action The type of action being invoked on the domain object
 * @return {Object} Returns a URI object neeeded for a HTTP request
 */
function getAccessTokenURI(action) {
    var _args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        _args[_i - 1] = arguments[_i];
    }
    var uri = Constants.OAUTH_BASE_URL;
    switch (action) {
        case "create":
        case "refresh":
            uri += "/token";
            break;
        case "revoke":
            uri += "/revoke";
            break;
    }
    // Use node js 'url' module to create URI object
    return url.parse(uri);
}
/**
 * Function to build up the URI endpoint to use in the request.
 *
 * @method getURI
 * @private
 * @param {String} publicKey The public API key of the user
 * @param {String} domainType The type of domain object e.g. 'payment'
 * @param {String} action The type of action being invoked on the domain object
 * @param {Object} params The request paramaters
 * @return {Object} Returns a URI object neeeded for a HTTP request
 */
function getURI(publicKey, domainType, action, params) {
    var uri = exports.API_BASE_SANDBOX_URL;
    var query = [];
    // Check if a live key is used & update the API endpoint accordingly
    if (utils.isLiveKey(publicKey)) {
        uri = exports.API_BASE_LIVE_URL;
    }
    // Modify URI to point to the correct domain object
    uri += ("/" + domainType);
    switch (action) {
        case "create":
            break;
        case "show":
        case "delete":
            // This is the domain's ID e.g. https://sandbox.simplify.com/v1/api/customer/dczrbi
            uri += "/" + params;
            break;
        case "update":
            uri += "/" + params.id;
            break;
        case "list":
            // URL e.g. https://sandbox.simplify.com/v1/api/customer?max=10
            if (!utils.isUndefined(params.max)) {
                query.push("max=" + params.max);
            }
            // URL e.g. https://sandbox.simplify.com/v1/api/customer?offset=0
            if (!utils.isUndefined(params.offset)) {
                query.push("offset=" + params.offset);
            }
            // URL e.g. https://sandbox.simplify.com/v1/api/customer?filter['text']=John
            if (!utils.isUndefined(params.filter)) {
                for (var filterProp in params.filter) {
                    query.push("filter[" + filterProp + "]=" + params.filter[filterProp]);
                }
            }
            // URL e.g. https://sandbox.simplify.com/v1/api/customer?sorting['id']=asc
            if (!utils.isUndefined(params.sorting)) {
                for (var sortableProp in params.sorting) {
                    query.push("sorting[" + sortableProp + "]=" + params.sorting[sortableProp]);
                }
            }
            break;
    }
    // Add query params to URI if any
    if (query.length > 0) {
        uri += "?" + query.join("&");
    }
    // Use node js 'url' module to create URI object
    return url.parse(uri);
}
/**
 * Function to construct the opitons map needed for the
 * API request.
 *
 * @method getRequestOptions
 * @private
 * @param {String} httpMethod The type of HTTP request being made e.g. 'POST'
 * @param {String} signature A generated JSON Web Signature
 * @param {Object} uri An object containing the properties of a URI
 * @return {Object} Returns an object with the option paramaters neeeded for a HTTP request
 */
function getRequestOptions(httpMethod, signature, uri) {
    var options = {
        host: uri.hostname,
        port: uri.port,
        path: uri.path,
        method: httpMethod,
        headers: {
            "Accept": "application/json",
            "User-Agent": "NodeJS-SDK"
        }
    };
    // Check what additional header needs to be set
    if (httpMethod === "POST" || httpMethod === "PUT") {
        options.headers["Content-Type"] = "application/json";
        options.headers["Content-length"] = signature.length;
    }
    else {
        options.headers["authorization"] = "JWS " + signature;
    }
    return options;
}
/**
 * Function to choose the appropiate HTTP method
 * based on the API action.
 *
 * @method getHTTPMethod
 * @private
 * @param {String} action The type of action being invoked on the domain object
 * @return {String} Returns a HTTP request type e.g. 'POST'
 */
function getHttpMethod(action) {
    var httpMethod;
    if (action === "create") {
        httpMethod = "POST";
    }
    else if (action === "delete") {
        httpMethod = "DELETE";
    }
    else if (action === "update") {
        httpMethod = "PUT";
    }
    else if (action === "show" || action === "list") {
        httpMethod = "GET";
    }
    return httpMethod;
}
