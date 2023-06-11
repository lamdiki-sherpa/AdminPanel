import React from 'react'

const GetData =async (dataTosend) => {
    if(dataTosend.Type==="POST"){
        const response=await fetch(dataTosend.FetchURL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(dataTosend)
        });
        const data=await response.json()
        return data;
    }else{
        const response=await fetch(dataTosend.FetchURL);
        const data=await response.json()
        return data;
    }
}

export default GetData