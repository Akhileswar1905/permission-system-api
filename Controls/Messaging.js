import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "permitportal-9fc39",
    private_key_id: "b3120213a6f7659e9c0cbadd9084840fc281dba7",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDK4+4oR9ud/Rer\ntl0XF4M4CstkWPmlMBRuq9WYl+ZYK65kiaKMv+q8Ln6+Ir3pcdu93wXZLcfA9v9j\nI3vyf4P36QAc+bjfR9xM5md49CJGr9os800PQeStGprrEtNaqwQflgV3/YXc49wA\nucc6i3i+I0AwtFEa20jYsyfaofG5TzKtsggknH244eubSUCWho36VIR4OHFbmJJ9\nUFAgYdPN3xZQpDlNYLwfPHRb8IjvTwGDnLqp8SZMAXxw+sjjpxliRtwf5jT4+hP+\n18mJ1QpRNjBuWWpFfcoECRADeVfuLZU0lexntEToMuer+uqK7qmO5BakJP9CtxJ4\nB+SCNpZ3AgMBAAECggEAOS+VaPUYCafUjCmSg3e1HI6uVVJeyxiKKcd1JNVrr15g\ngSXqExHk77WLM7xHGw1kilfaJiSpMNJtmVvfC7K1V6LszT31xblTdrlaYNUu9A2M\nyS6qgapo8gGVuLxNpjidqOl4ESH8IQ54bBvw86dsGOuGpDOuyIsWNT4J9a2/nCMd\nmCoAqug9+poHyW9A6S+O/6qRtfcO4BqGN/feGvLxtzCAmaIqKBFJah3JAjvNXFsc\nnVyp8rMV6JwFJs1JcbaJsN/dIV+yb8ARVuDs7EaQQqvKM+6YiA6a6Qo0eqc8m9F8\nHytfjQ4uNVipR5Cyw5+OLi4J3Vq7fWcsIMgRnCF7wQKBgQD3J2ADra18wPTh9Xgq\nILlce+C9NwBk5iftNO2+EyoGEw+5Wd7d9XEDd25eSnVFD9z/cYeHeWgIAmBpV9cq\nGZVF81gMO+XkkM03kaxGecvkzloNVxja5l4nSyyMuuvwZJJwOYiRNb5iXvmM6Ow4\nYwvhDCEClCwiFyVmeq1XHC3DcwKBgQDSJvoyTAOdCOOUoZ3xpSMBKkeh/q+cYVpi\nSEz6OxqUfbCLRzl/H61mdAoifEtDibxjhO1Lz8lqLsWU/9Ot4a9vxNYBNfp++u7e\njC6srYjOdfFbTlgAsyzmIuTAaqYjiBSMae3/Y3CvJ3OxBBxpXWd4Yf8raLc3hxx1\n4q/HU12H7QKBgGK/x7wQg5Wp3u39TuK+KnGKSVQwiqbF0sQS9r6QF6VPrmOnRcW3\nUE1LRbzE0TAj02/4o2b8mhVBJdZRM3XtvNezD8XrlMILHQOL36JU/aNQ02grGZI0\nov/eKFGeSbDF7kCKrEcgiw3w1pJ3ahJpeJCVcQb/vtZsGxRkBagdaSeDAoGAN5Vj\nm6YLVp+hQhC1K9LXvVkndStd22jMdS5WXeEAGMJdzZjbFkqUnIKYo6Jobcaic1gX\nQ3QD+/e+/rfjjxwgQNm5GLzkMm3AfFBrj/SeOK1tVw8Tq6u4dm5IPrR2mPNHLBRg\nhKoSheFTckB6G0w/L9ILobmirCcqWevJPllIZckCgYAcVijLwTa0b51owiQDUMR+\nQ3GFKHhP9nNNm3zqiY4PMtSVN+NUWzeP7rasUSRCveYpJJYva1a7TKJ3plVY5c12\ny3I07MjkTbHi6Wy/IcCEOjeCjcp+bqGXF+3n041/c34+HjUs6cX8/9Fe3m44fF+3\nAgvsiOP0MZxR8x3G6ebq2w==\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-lpr4f@permitportal-9fc39.iam.gserviceaccount.com",
    client_id: "111352757607055247944",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lpr4f%40permitportal-9fc39.iam.gserviceaccount.com",
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
