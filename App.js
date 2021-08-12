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
  JudoGooglePayConfiguration,
JudoGooglePayEnvironment,
JudoAddressFormat,
  JudoCardNetwork,
JudoBillingAddressParameters,
JudoShippingAddressParameters
} from 'judokit-react-native'
import {JudoUIConfiguration} from "judokit-react-native/types/JudoTypes";

// enum JudoCardNetwork {
//   Visa = 1 << 0,
//     Mastercard = 1 << 1,
//     Maestro = 1 << 2,
//     Amex = 1 << 3,
//     ChinaUnionPay = 1 << 4,
//     JCB = 1 << 5,
//     Discover = 1 << 6,
//     DinersClub = 1 << 7,
//     All = 1 << 8,
// }


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const executePayment =   ()=>{
    console.log('pressed the button');
    const cardNetworks = JudoCardNetwork.Visa | JudoCardNetwork.Mastercard

    var JudoBillingAddressParameters = {
      addressFormat: JudoAddressFormat.MINIMAL,
      isPhoneNumberRequired: true,
    }
    var JudoShippingAddressParameters = {
      allowedCountryCodes: ["GB", "US"],
      isPhoneNumberRequired: false,
    };
    var JudoGooglePayConfiguration = {
      countryCode: 'GB',
      environment: JudoGooglePayEnvironment.TEST,
      isEmailRequired: true,
      isBillingAddressRequired: true,
      billingAddressParameters: JudoBillingAddressParameters,
      isShippingAddressRequired: true,
      shippingAddressParameters: JudoShippingAddressParameters
    }
    var auth = {
      token: '',
      secret:
        '',
    };
    var judo = new Judo(auth);
    judo.isSandboxed = true;
    var amount = {
      value: '0.01',
      currency: 'GBP',
    };
    var reference = {
      consumerReference: 'MY-CONSUMER-REFERENCE-1',
      paymentReference: 'MY-PAYMENT-REFERENCE-1'
    };
    var configuration = {
      judoId: '',
      countryCode: 'GB',
      amount,
      reference,
      uiConfiguration: {
        isAVSEnabled: true,
        shouldPaymentMethodsDisplayAmount: true,
        shouldPaymentButtonDisplayAmount: true,
        shouldPaymentMethodsVerifySecurityCode: true,
      },
      supportedCardNetworks: cardNetworks,
      googlePayConfiguration: JudoGooglePayConfiguration,
      isInitialRecurringPayment: false,
  };

  judo.invokeGooglePay(JudoTransactionMode.Payment, configuration)
      .then( (response) => {
        console.log({response})

  }).catch((error) => {
    console.log({error})

  })



  }

  return (
    <SafeAreaView style={backgroundStyle}>

      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>

            <Button title="Press me" onPress= {executePayment}> press here </Button>


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
