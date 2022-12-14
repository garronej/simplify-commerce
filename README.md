
                 Node.js Module for Simplify Commerce


  What is it?
  ------------

  A Node.js module for the Simplify Commerce payments platform. If you have
  not already got an account sign up at https://www.simplify.com/commerce.


  Installation
  ------------

  If you haven't done so, you first need to install the Simplify module.
  You can either download it at https://www.simplify.com/commerce/docs/sdk/nodejs and install it from 
  the binary.
  More easily, you can install it using node's package manager.
  
  You can do so with the following command:

    npm install simplify-commerce


  Using the SDK
  --------------

  To run a payment though Simplify Commerce use the following
  script substituting your public and private API keys:

    
    var Simplify = require("simplify-commerce"),
        client = Simplify.getClient({
          publicKey: 'YOUR_PUBLIC_API_KEY',
          privateKey: 'YOUR_PRIVATE_API_KEY'
        });

    client.payment.create({
      amount: "123123",
      description: "Node.js Sample Payment",
      card: {
        expMonth: "11",
        expYear: "25",
        cvc: "123",
        number: "5555555555554444"
      },
      currency: "USD"
    }, function(error, data) {

      if (error) {
        console.error(JSON.stringify(error.data));
        return;
      }

      console.log("Payment Status: " + data.paymentStatus);
    });


  For more examples see https://www.simplify.com/commerce/docs/sdk/nodejs


  Licensing
  ---------

  Please see LICENSE.txt for details.

  Documentation
  -------------

  For more detailed information on the API with examples visit the online
  documentation at https://www.simplify.com/commerce/docs/api/index

  Support
  -------

  Please see https://www.simplify.com/commerce/support for information.

  Copyright
  ---------

  Copyright (c) 2013 - 2022 MasterCard International Incorporated
  All rights reserved.

