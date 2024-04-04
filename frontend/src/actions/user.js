import axios from 'axios'


export const login =(email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:'LoginRequest'
        })
        
        const {data} = await axios.post('/api/v1/login',{email,password})
        console.log(data)
        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:'LoginFailure',
            payload:error.response.data.message
        })
    }
}

export const otp = (name,email,photo)=>async(dispatch)=>{
    try {
        console.log({name,email,photo})
        dispatch({
            type:'OTP_Request'
        })
        const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('avatar', photo);
        const {data} = await axios.post('/api/v1/getotp',formData)
        
        dispatch({
            type:'OTP_Success',
            payload:data.success,
            id:data.id
        })
    } catch (error) {
        dispatch({
            type:'OTP_Failure',
            payload:error.response.data.success
        })
    }
}

export  const register = (otp,password,email)=>async(dispatch)=>{
    try {
        dispatch({
            type:'Register_Request'
        })
        const {data} = await axios.post(`/api/v1/register?email=${email}`,{otp,password})
        dispatch({
            type:'Register_Success',
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:'Register_Failure',
            payload:error.response.data.success
        })
    }
}

export const loadUser = ()=> async(dispatch)=>{
    try{
        dispatch({
            type:"LoadUserRequest",
        })
        const {data} = await axios.get("/api/v1/me");
   
        dispatch({
            type:"LoadUserSuccess",
            payload:data,
            isAuthenticated:true
            
        })
    }
    catch(error){
        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data.message
        })
    }
}

export const logout = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LogoutUserRequest"
        })
        await axios.get("/api/v1/logout");
        dispatch({
            type:"LogoutUserSuccess",
            paylaod:false
        })

    } catch (error) {
        dispatch({
            type:"LogoutUserFailure",
            payload:true
        })
    }
}

export const deleteProfile = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:'DeleteProfileRequest'
        })
        await axios.delete("/api/v1/delete/profile")
        dispatch({
            type:'DeleteProfileSuccess'
        })
    } catch (error) {
        dispatch({
            type:'DeleteProfileFailure'
        })
    }
}