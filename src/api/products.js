import { fetchClient } from "./client";


// export const getProducts =()=>{
//     return fetchClient("/products")
// }
export const getProducts =(page ,params={})=>{

    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value) // Remove empty values
      );
      const queryString = new URLSearchParams(filteredParams).toString();
      const url = queryString ? `/products?limit=250 &&page=${page}&&${queryString}` : `/products?limit=250 &&page=${page}`;
      return fetchClient(url);
}
export const getAvailableProducts =()=>{
      const url ="/products/available"
      return fetchClient(url);
}
export const getOneProduct =(id)=>{
    return fetchClient(`/products/${id}`)
}
export const deleteProduct =(id)=>{
return fetchClient(`/products/${id}` ,{
    method :"DELETE"
})
}

export const updateProduct =(id , credentials)=>{
   
    return fetchClient(`/products/${id}` , {
        method:"PUT",
        body:JSON.stringify(credentials)
    })
}

export const createProduct =(credentials)=>{
    return fetchClient("/products" , {
        method:"POST",
        body:JSON.stringify(credentials)
    })
}
