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
 * Module for custom error objects
 */
import * as util from "https://deno.land/std@0.156.0/node/util.ts";

/**
 * Abstract error object that others will inherit from.
 */
const AbstractError = function(msg?: any, constr?: any) {
	Error.captureStackTrace(this, constr || this);
	this.message = msg || 'Error';
};


util.inherits(AbstractError, Error);
AbstractError.prototype.name = 'Abstract Error';

/**
 * Error object for any API related issues.
 */
var APIError = function(msg?: any, payload?: any) {
	this.data = payload;
	(APIError as any).super_.call(this, msg, this.constructor);
}

util.inherits(APIError, AbstractError);
APIError.prototype.name = 'API Error';

/**
 * Error object for any JWS related issues.
 */
var JWSError = function(msg?: any) {
	(JWSError as any).super_.call(this, msg, this.constructor);
}

util.inherits(JWSError, AbstractError);
JWSError.prototype.name = 'JWS Error';

export const API= APIError;
export const JWS= JWSError;
