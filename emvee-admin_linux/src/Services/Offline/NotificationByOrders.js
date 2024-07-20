export const NotificationByOrders = ({ time, status }) => {
  const data = {
    "-3": {
      title: "Your Order is Rejected by admin.",
    },
    "-2": {
      title: "Your Order is cancelled by admin.",
    },
    "-1": {
      title: "Your Order status is failed!",
    },
    1: {
      title: "Your Order is Accepted!",
      body: `Hey! we will try to deliver your order within ${time} minutes!`,
    },
    2: {
      title: "Your Order is Out for Delivery!",
      body: "Hey! Your order is about to be delivered! Be ready with your Cash at your delivery location!",
    },
    3: {
      title: "Your Order is Delivered!",
      body: "We are pleased to inform you, Your Order is delivered!",
    },
  };

  return data[status];
};
