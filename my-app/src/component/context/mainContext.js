import React from "react"
const MainContext = React.createContext()
export const MainContextProvider =(props)=>{
const url=process.env.REACT_APP_URL
const value=JSON.parse(localStorage.getItem("value"))
return (
    <MainContext.Provider value={{url,value}}>
        {props.children}
    </MainContext.Provider>

)
}
export default MainContext