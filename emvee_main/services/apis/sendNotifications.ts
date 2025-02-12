export const sendNotificationToAdmin = async ({
  token,
  orderData,
}: {
  token: string;
  orderData?: any;
}) => {
  if (!token) return null;
  try {
    await fetch("https://e-m-vee-resturant.vercel.app/api/send-pn", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: token,
        title: "New Order Recieved!",
        message: "You have a new Order",
        scopeKey: "@be1newinner/emvee-admin",
        experienceId: "@be1newinner/emvee-admin",
        channelId: "default",
      }),
    });
  } catch (error) {
    console.log("UNABLE TO SEND NOTIFICATION TO ADMIN => ", error);
  }
};
