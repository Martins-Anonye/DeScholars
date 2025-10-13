const admin = require('firebase-admin');
admin.initializeApp();

async function sendCustomVerificationEmail(email) {
  try {
    const actionCodeSettings = {
      url: 'https://www.example.com/finishSignUp?cartId=1234', // Optional: Custom continue URL
      handleCodeInApp: true, // Optional: Handle link in your app if applicable
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      },
      dynamicLinkDomain: 'example.page.link' // Optional: If using Firebase Dynamic Links
    };

    const link = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings);
    // Now 'link' contains the email verification URL
    return link;
  } catch (error) {
    console.error('Error generating email verification link:', error);
    throw error;
  }
}