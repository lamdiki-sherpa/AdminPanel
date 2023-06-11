import React, { useState } from "react"
const AuthContext = React.createContext()

export const AuthContextProvider=(props)=>{
const initialToken=localStorage.getItem("value")
const userData=JSON.parse(initialToken)
const[userId,setUserId]=useState(userData)
const userIsLogin=!!userId;
const loginHandler=(token)=>{
setUserId(token)
localStorage.setItem("token",JSON.stringify(token));
}
const logoutHandler=()=>{
setUserId(null)
}
const contextValue={
    user:userId,
    isLogin:userIsLogin,
    login:loginHandler,
    logout:logoutHandler
}
return(
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>

)
}
export default AuthContext