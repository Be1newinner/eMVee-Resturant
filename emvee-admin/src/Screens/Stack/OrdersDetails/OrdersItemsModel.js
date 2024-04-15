export const OrdersItemsModel = ({ OrderDetails = {} }) => {
  return {
    status: OrderDetails?.s.c,
    items: Object.values(OrderDetails?.i) || [],
    subtotal: OrderDetails?.p?.s,
    taxes: OrderDetails?.p?.x,
    delivery: OrderDetails?.p?.c,
    total: OrderDetails?.p?.t,
    saving: 0,
    date: new Date(OrderDetails?.s?.[0]?.seconds * 1000).toLocaleString(),
    deliverBy: new Date(OrderDetails?.s?.t?.seconds * 1000).toLocaleString(),
    contact: OrderDetails?.u?.p,
    reciever: OrderDetails?.u?.n,
    alternate: OrderDetails?.u?.u,
    deliver: OrderDetails?.u?.a,
    deliveredTime: OrderDetails?.s?.[3]?.seconds || 0,
    willBeDeliveredTime: OrderDetails?.s?.t?.seconds || 0,
  };
};
