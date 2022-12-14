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
exports.isUndefined = exports.isLiveKey = exports.generateRandomNumber = void 0;
/**
 * This module exposes the different domain
 * object on which different API calls can be
 * invoked upon.
 *
 * @class SimplifyUtils
 * @static
 */
var crypto = require("crypto");
/**
 * Function to generate a random number.
 *
 * @method generateRandomNumber
 * @return {String} Returns a generated number
 */
var generateRandomNumber = function () {
    var current_date = (new Date()).valueOf().toString();
    return crypto.createHash('sha256').update(current_date).digest('hex');
};
exports.generateRandomNumber = generateRandomNumber;
/**
 * Function to check whether an API key is live or not.
 *
 * @method isLiveKey
 * @param {String} key API key to check
 * @return {Boolean} Returns true is the key is a public API key
 */
var isLiveKey = function (key) {
    return (key.length >= 4 && key.substring(0, 4) === "lvpb");
};
exports.isLiveKey = isLiveKey;
/**
 * Function to check whether a value/object is undefined.
 *
 * @method isUndefined
 * @param {Object} value Object to check if it's type is 'undefined'
 * @return {Boolean} Returns true if object's type is 'undefined'
 */
var isUndefined = function (value) {
    return typeof value === "undefined";
};
exports.isUndefined = isUndefined;
