import { fetchClient } from "./client";


export const getProducts =()=>{
    return fetchClient("/products")
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
