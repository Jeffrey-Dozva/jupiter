const executePayment =   ()=>{
    console.log('pressed the button')
  
  
    var JudoBillingAddressParameters = {     
      addressFormat: JudoAddressFormat.MINIMAL,     
      isPhoneNumberRequired: true, 
      } 
       
      var JudoShippingAddressParameters = {    
      allowedCountryCodes: ["GB", "US"],     
      isPhoneNumberRequired: false, 
      } 
       
     var JudoGooglePayConfiguration = {     
      countryCode: 'GB',     
      environment: JudoGooglePayEnvironment.TEST,     
      isEmailRequired: true,     
      isBillingAddressRequired: true,     
      billingAddressParameters: JudoBillingAddressParameters,     
      isShippingAddressRequired: true,     
      shippingAddressParameters: JudoShippingAddressParameters 
      }
  
    var auth = { token: '', secret: '' };
    var judo = new Judo(auth);
    // 2. Set the Judo session to sandbox mode for testing
    judo.isSandboxed = true;
    // 3. Create a Judo configuration to setup your payment flow
    var amount = {
        value: '0.01',
        currency: 'GBP',
    };
    var reference = {
        consumerReference: 'MY-CONSUMER-REFERENCE',
        paymentReference: 'MY-PAYMENT-REFERENCE'
    };
    var configuration = {
        judoId: '100177237',
        countryCode: 'GB',
        amount,
        reference,
        googlePayConfiguration: JudoGooglePayConfiguration
    };
  

    judo.invokeGooglePay(JudoTransactionMode.Payment, configuration)
    .then((response) => {
      /* Handle response */
    console.log("respose from  invokePaymentMethodScreen - ", response)
    })
    .catch((error) => {
      /* Handle error */
      console.log("respose from  invokePaymentMethodScreen CATCH - ", error)
    
    })  
  
    }

    executePayment()