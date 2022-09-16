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
exports.isJWSHeaderValid = exports.decodeSignature = exports.getJWSSignature = exports.HEADERS = void 0;
/**
 * This module exposes the different domain
 * object on which different API calls can be
 * invoked upon.
 *
 * @class SimplifyJWS
 * @static
 */
var SimplifyError = require("./error");
var simplifyUtils = require("./simplifyUtils");
var jws = require("jws");
/**
 * An object containing the JWS header properties.
 *
 * @property HEADERS
 * @type {Object}
 */
exports.HEADERS = {
    URI: "api.simplifycommerce.com/uri",
    TIMESTAMP: "api.simplifycommerce.com/timestamp",
    NONCE: "api.simplifycommerce.com/nonce",
    TOKEN: "api.simplifycommerce.com/token",
    ALGORITHM: "HS256",
    TYPE: "JWS",
    MAX_TIMESTAMP_DIFF: (1000 * 60 * 5)
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
var getJWSSignature = function (auth, params, uri) {
    var jwsHeader = {
        "typ": exports.HEADERS.TYPE,
        "alg": exports.HEADERS.ALGORITHM,
        "kid": auth.publicKey
    };
    if (!simplifyUtils.isUndefined(params.accessToken)) {
        jwsHeader[exports.HEADERS.TOKEN] = params.accessToken;
    }
    jwsHeader[exports.HEADERS.URI] = uri;
    jwsHeader[exports.HEADERS.TIMESTAMP] = new Date().getTime().toString();
    jwsHeader[exports.HEADERS.NONCE] = simplifyUtils.generateRandomNumber();
    // Private key is already BASE64 encoded, so need to decode it before 
    // it gets re-encoded as part of the JWS signing process
    var privateKey = new Buffer(auth.privateKey, 'base64');
    // User node js 'jws' module to generate the JWS signature 
    return jws.sign({
        header: jwsHeader,
        payload: params,
        secret: privateKey
    });
};
exports.getJWSSignature = getJWSSignature;
/**
 * Function to decode a JWS signature.
 *
 * @method decodeSignature
 * @param {String} signature The JSON Web Signature to decode
 * @return {Object} Returns a decoded JWS object
 */
var decodeSignature = function (signature) {
    return jws.decode(signature);
};
exports.decodeSignature = decodeSignature;
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
var isJWSHeaderValid = function (header, publicKey, url, callback) {
    // Check the signing algorithm
    if (header.alg !== exports.HEADERS.ALGORITHM) {
        callback(new SimplifyError.JWS('Incorrect JWS algorithm found. HS256 is required'), null);
        return false;
    }
    // Check that the correct number of header fields exists
    if (Object.keys(header).length !== 7) {
        callback(new SimplifyError.JWS('Incorrect number of header parameters found'), null);
        return false;
    }
    // Check that a 'kid' header exists
    if (header.typ !== exports.HEADERS.TYPE) {
        callback(new SimplifyError.JWS('Incorrect JWS type found'), null);
        return false;
    }
    // Check that a 'kid' header exists
    if (simplifyUtils.isUndefined(header.kid)) {
        callback(new SimplifyError.JWS('Missing Key ID'), null);
        return false;
    }
    // Check that the key matches and is live
    if (header.kid !== publicKey) {
        if (!simplifyUtils.isLiveKey(publicKey)) {
            callback(new SimplifyError.JWS('Incorrect Key ID'), null);
            return false;
        }
    }
    // Check that a 'uri' header exists
    if (simplifyUtils.isUndefined(exports.HEADERS.URI)) {
        callback(new SimplifyError.JWS('Missing URI'), null);
        return false;
    }
    // Check that a 'uri' header exists
    if (header[exports.HEADERS.URI] !== url) {
        callback(new SimplifyError.JWS('Invalid URI found'), null);
        return false;
    }
    // Check that a 'uname' header exists
    if (simplifyUtils.isUndefined(header.uname)) {
        callback(new SimplifyError.JWS('Missing usename'), null);
        return false;
    }
    // Check that a 'nonce' header exists
    if (simplifyUtils.isUndefined(exports.HEADERS.NONCE)) {
        callback(new SimplifyError.JWS('Missing nonce'), null);
        return false;
    }
    // Check that a 'timestamp' header exists
    if (simplifyUtils.isUndefined(exports.HEADERS.TIMESTAMP)) {
        callback(new SimplifyError.JWS('Missing timestamp'), null);
        return false;
    }
    // Check that a 'timestamp' header is valid (not older than 5 mins)
    if (new Date().getTime() - header[exports.HEADERS.TIMESTAMP] > exports.HEADERS.MAX_TIMESTAMP_DIFF) {
        callback(new SimplifyError.JWS('Timestamp expired'), null);
        return false;
    }
    return true;
};
exports.isJWSHeaderValid = isJWSHeaderValid;
