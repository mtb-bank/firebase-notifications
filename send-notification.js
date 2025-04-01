const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

/**
 * Firebase Admin SDK initialization
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/** Array of device tokens */
const deviceTokens = [

];

/**
 * Function to send push notifications
 * @async
 * @returns {Promise<void>}
 */
async function sendNotification() {
  const title = "Title from sendNotification";
  const body = "Body from sendNotification";

  /** Example data for sending */
  const data = {
    "interactAction": "RE_IDENTIFICATION_UPDATE_STATUS",
    // other parameters needed for message sending
  };

  const message = {
    tokens: deviceTokens,
    /**
     * Configuration for Android platform
     */
    android: {
      priority: "high",
      data: {
        stringifyNotifee: JSON.stringify({
          title,
          body,
          data,
          android: {
            channelId: "fcm_notification_channel",
            smallIcon: "ic_notification",
            importance: 4,
            vibrationPattern: [300, 500],
            color: "white",
            pressAction: {
              id: "default",
            },
          },
        }),
      },
    },
    /**
     * Configuration for iOS platform
     */
    apns: {
      payload: {
        stringifyNotifee: JSON.stringify({
          title,
          body,
          data,
        }),
        aps: {
          alert: {
            title,
            body,
          },
        },
      },
    },
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log("Successfully sent:", response.successCount);
    console.log("Failures:", response.failureCount);

    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        console.log("Error for token", deviceTokens[idx], ":", resp.error);
      }
    });
  } catch (error) {
    console.error("Error while sending:", error);
  }
}

/** Function call */
sendNotification();
