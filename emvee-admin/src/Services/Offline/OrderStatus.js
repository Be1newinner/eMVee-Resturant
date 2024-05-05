export default OrderStatus = {
  "-1": {
    title: "Failed",
    color: "rgba(0,0,0,0.5)",
  },
  "-2": {
    title: "Canceled",
    color: "rgba(0,0,0,0.5)",
  },
  "-3": {
    title: "Rejected",
    color: "rgba(0,0,0,0.5)",
  },
  0: {
    title: "Pending",
    color: "#55d",
    next: 1,
    mark: "Accepted",
  },
  1: {
    title: "Processing",
    color: "rgba(0,200,205,1)",
    next: 2,
    mark: "OFD",
  },
  2: {
    title: "Out for Delivery",
    color: "#f00",
    next: 3,
    mark: "Delivered",
  },
  3: {
    title: "Delivered",
    color: "#5c5",
  },
};
