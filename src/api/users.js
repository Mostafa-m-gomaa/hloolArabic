import { fetchClient } from "./client";


export const login =(credentials)=>{
    return fetchClient("/auth/login",{
        method:"POST",
        body:JSON.stringify(credentials)
    })
}

export const getUsers =()=>{
    return fetchClient("/users")
}
export const CretaUser =(credentials)=>{
    return fetchClient("/users" , {
        method:"POST",
        body:JSON.stringify(credentials)
    })
}

export const deleteUser =(id)=>{
return fetchClient(`/users/${id}` ,{
    method :"DELETE"
})
}

export const updateUser =(id , credentials)=>{
   
    return fetchClient(`/users/${id}` , {
        method:"PUT",
        body:JSON.stringify(credentials)
    })
}

export const getOneUser =(id)=>{
    return fetchClient(`/users/${id}`)
}