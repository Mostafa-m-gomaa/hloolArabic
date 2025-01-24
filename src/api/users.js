import { fetchClient } from "./client";


export const login =(credentials)=>{
    return fetchClient("/auth/login",{
        method:"POST",
        body:JSON.stringify(credentials)
    })
}

export const getUsers =(parms = {} , page)=>{
    const filteredParams = Object.fromEntries(
        Object.entries(parms).filter(([_, value]) => value) // Remove empty values
      );
      const queryString = new URLSearchParams(filteredParams).toString();
      const url = queryString ? `/users?page=${page}&&${queryString}` : `/users?page=${page}`;
      return fetchClient(url);
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
export const getSuperVisors =()=>{
    return fetchClient(`/users/supervisors`)
}