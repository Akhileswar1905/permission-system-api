import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "srp-project-a990e",
    private_key_id: "0336e0620a9c1080586ea905f7ea47dfc8aaa5b1",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDC9hUR/jKeKvzX\nWcabG7AdfrY3GxSf6XrfyZyEt+8rx40rcH+9Yuy8RChs8ZF0tXjYfM0sK3H1CgjK\nRz9V7VDvRXiaLY76S4OL0B7T1LISbjoZFxs8tjpwWiGBC8W3R6MWhIK9c7lPUUqH\n5Qc8nWKbPqcA0ksc+Ajaogvp+ZY/1xcAvGnHlAI+m9VMylLSQkvy1ngXftyTUGIQ\nVAEGciTcVoVAeCzY4o2urCBmtChMS54QR/fHyaq0HV3RErRHZTZYfIn9+eaD9Jqf\nojCeAWyq5SMYBrpWj8ACqzwptpkQd6qZVrgPpNBcO+bi1bEFvOhwog7NuXDFAXlG\n3onKFQizAgMBAAECggEAOLQD2tDY/gG4uhWlWvWJmnqBGrPoor3we+gSetNYX55R\nY8H7lSSRgAw+ybjUumIRfL2HmwIjycYaWmKwfBhiwsSs2ALKI+gUoXRtkuS4yf1/\nLk73IAhMJONB/VtkLPNL7r+pmtpumjAlgjLNkQahaE+nmOiQ6iMFyDj7SBjMZ1Jw\nrPNh7J1lh5lIi2XcoGHIk6l59G6vfoGZUBA7rCUiHlru9Beebsf33E3LAMLKd1Xn\nc75x6nKuO6KpIP+JOpEz/amEBvDhIOqtC7zyGGWPc00GNj4rqQga9yLFxDKQIuFm\nnvUZmjRVR9F00EE8dqm/5fCl9v6q+1FLMOqS0Y4dIQKBgQDf7wda8483LYOY6xon\nLdfKCLeOJ2sPH+f93TeCXVjwTtuqNqw3ICzOv9tsAIQ2HUM6zHstBac41NmbSpjX\nvi6Pew/rQVT5kqpP5VJtk1NAailUuAuaK/eOKHwlcmkK+ce7Orbkd0nnX4pOAAeH\nEq++ebenzhikqWCKY22TubesUQKBgQDe4Pr6p9B+H4WIKT9aeKrM1nG7WTCV0Z83\np65ocPmIUAHsM8Jxp0WNPHLVl5MBv4AY5B87wElbgYjBfufa0MQHIxTzEx/5t74r\n29kJtXDx6ZAYoQGxypGxwwGdOTnOwDbMTDAahJKgg4NmqNadj6KxOlfZaxdLpQ9W\nyNM1lrmXwwKBgQCD0F7DAdVOhIMPE2zMnSaFbUYm7jsNpxlXDM1s9mew5KpW8mHC\n/TSC6tpNI6yvceAuD0l+QfKh+GCzEWEQtYkQuj6vm0BavCN2biVsDKmXpCX6EW/6\n62CIFHqnTEZayJbyNeiMaU9eW5W8vjWwI6bBd0JNC3rkCjOiok5RA6QDUQKBgGYT\nRf8MYomQ6DgvI+vMffUodZgnRgAnrDLyIgeFTlNmySqjnfctc8Y2nCVEsThIu2Mq\n/z7/VtmI3tg3xfpKSK04HP0iki9tPrSZkLJInfy9SphtDPifXNC8Df4y2k3dbHtu\nnU1X0EuhT8nxo7EvuoROwzM5P8cORpMpkMnnSQK/AoGBAM14onO79b5bS3jTQGa4\ntlZ7m/flm1rF59zH6ydVZR1o5275DiWR2NzfFSoyLM1S2NCH5DZBJByfr7DKyrvl\nMKshL+lqk6nRjb9btGn+9MxgfCLrAQiLod90hQGS2ay+WlB49/tVziPMLL4hWV25\njDMvTdUBDY3W0wFg/A4C37aU\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-d5txh@srp-project-a990e.iam.gserviceaccount.com",
    client_id: "114360901202743281455",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d5txh%40srp-project-a990e.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
  databaseURL:
    "https://console.firebase.google.com/u/2/project/srp-project-a990e/database/srp-project-a990e-default-rtdb/data/~2F",
});

export const sendNotification = async (token, title, body) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
