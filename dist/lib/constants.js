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
exports.OAUTH_BASE_URL = exports.API_BASE_SANDBOX_URL = exports.API_BASE_LIVE_URL = void 0;
/**
* The URL for all LIVE API requests
*
* @property API_BASE_LIVE_URL
* @type {Object}
*/
exports.API_BASE_LIVE_URL = "https://api.simplify.com/v1/api";
/**
* The URL for all SANDBOX API requests
*
* @property API_BASE_SANDBOX_URL
* @type {Object}
*/
exports.API_BASE_SANDBOX_URL = "https://sandbox.simplify.com/v1/api";
/**
* The URL for all OAuth API requests
*
* @property OAUTH_BASE_URL
* @type {Object}
*/
exports.OAUTH_BASE_URL = "https://www.simplify.com/commerce/oauth";
