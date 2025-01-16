import { fetchClient } from "./client";

// export const getOrders =()=>{
//     return fetchClient("/orders")
// }


// export const getOrders = (product) => {
//     const url = product
//       ? `/orders?product=${encodeURIComponent(product)}`
//       : "/orders";
//     return fetchClient(url);
//   };

// export const getOrders = (params = {}) => {
//     const queryString = new URLSearchParams(params).toString();
//     console.log(queryString)
//     const url = queryString ? `/orders?${queryString}` : "/orders";
//     return fetchClient(url);
//   };


export const getOrders = (params = {}) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value) // Remove empty values
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = queryString ? `/orders?${queryString}` : "/orders";
    return fetchClient(url);
  };