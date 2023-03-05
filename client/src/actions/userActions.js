import axios from 'axios'

export const loginUser = (email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:"loginUserRequest"
        })
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} =await axios.post(`/api/v1/user/login`,{email,password},config)
        console.log(data);
        dispatch({
            type:"loginUserSuccess",
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:"loginUserFailure",
            payload:error.response.data.message
        })        
    }
}

export const registerUser = (userData)=>async(dispatch)=>{
    try {
        dispatch({
            type:"registerUserRequest"
        })
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.post(`http://localhost:5000/api/v1/user/register`,userData,config)
        dispatch({
            type:"registerUserSuccess",
            payload:data.user
        }) 
    } catch (error) {
        dispatch({
            type:"registerUserFailure",
            payload:error.response.data.message
        })       
    }
}

export const loadUser = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"loadUserRequest"
        })
        const {data} = await axios.get('/api/v1/user/me')
        dispatch({
            type:"loadUserSuccess",
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:"loadUserFailure",
            payload:error.response.data.message
        })
    }
}

export const logout = ()=>async(dispatch)=>{
    try {
        await axios.get('/api/v1/logout')
        dispatch({
            type:'logoutUserSuccess'
        })
    } catch (error) {
        dispatch({
            type:"logoutUserFailure",
            payload:error.response.data.message
        })
    }
}

export const clearErrors = ()=>async(dispatch)=>{
    dispatch({type:"clearErrors"})
}