/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Judo, {
  JudoAuthorization,
  JudoTransactionType,
  JudoTransactionMode,
  // JudoGooglePayConfiguration,     
JudoGooglePayEnvironment,     
JudoAddressFormat,     
JudoBillingAddressParameters,     
JudoShippingAddressParameters 
} from 'judokit-react-native'

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
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

  // judo.invokeApplePay(2, configuration)
  // .then((response) => {/* Handle response */})

  // return

  // judo.invokeGooglePay()
  judo.invokeGooglePay(JudoTransactionMode.ServerToServer, configuration)
  .then((response) => {
    /* Handle response */
  console.log("respose from  invokePaymentMethodScreen - ", response)
  })
  .catch((error) => {
    /* Handle error */
    console.log("respose from  invokePaymentMethodScreen CATCH - ", error)
  
  })

  return

  // 4. Invoke a payment transaction and handle the result

  // judo.invokeGooglePay(JudoTransactionMode.Payment, configuration)
  // .then((response) => {/* Handle response */})



  judo.invokeGooglePay(JudoTransactionMode.Payment, configuration)
      .then(function (response) {
        console.log('here is the response for successfull', response)
      // Handle response
  })
  //     .catch(function (error) {
  //       console.log('Opppps man you have an errodjss', error)
  //     // Handle error
  // });


  }

  return (
    <SafeAreaView style={backgroundStyle}>
      
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <Button title="Press me" onPress= {executePayment}> press here </Button>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
