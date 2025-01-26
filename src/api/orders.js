import { fetchClient } from "./client";


export const getOrders = (params = {} , page) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value) // Remove empty values
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = queryString ? `/orders?page=${page}&&${queryString}` : `/orders?page=${page}`;
    return fetchClient(url);
  };


export const getMyOrders = (params = {} , page) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value) // Remove empty values
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = queryString ? `/orders/mine?page=${page}&&${queryString}` : `/orders/mine?page=${page}`;
    return fetchClient(url);
  };

  export const makeOrderReady =(id , params)=>{

    const url = `/orders/${id}/ready`
    return fetchClient(url , {
        method:"PUT",
        body:JSON.stringify(params)
    })
  }
  export const createOrder =(params)=>{
    const url = `/orders`
    return fetchClient(url , {
        method:"POST",
        body:JSON.stringify(params)
    })
  }

  export const getOneOrder = (id) => {
    return fetchClient(`/orders/${id}`);
  }


  // reports side 
  export const getReports = (params = {} , page) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value) // Remove empty values
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = queryString ? `/reports?page=${page}&&${queryString}` : `/reports?page=${page}`;
    return fetchClient(url);
  };
export const getMyReports = (params = {} , page) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value) // Remove empty values
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const url = queryString ? `/reports/mine?page=${page}&&${queryString}` : `/reports/mine?page=${page}`;
    return fetchClient(url);
  }; 
  export const createReport =(params)=>{
    const url = `/reports`
    return fetchClient(url , {
        method:"POST",
        body:JSON.stringify(params)
    })
  }