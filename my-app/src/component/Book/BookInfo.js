import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner';
import { useParams } from 'react-router-dom';
import GetData from '../hooks/GetData';
const BookInfo = () => {
  const {id}=useParams()
  
  const [bookInfo,setBookInfo]=useState([])
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    viewBook()
  },[id])
  const viewBook=()=>{
    const dataForm = {
      Type: "POST",
      FetchURL: "https://htdrnl.cyclic.app/api/book",
      FLAG:"SI",
      BookID:id,

    };
    GetData(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
          const postResult = result.Values ? result.Values : ""
          setBookInfo(postResult)
          setLoading(false)
        }else{
          setBookInfo([])
        }
      }
      )}
  return (
    <>{loading?(<Spinner/>):(<>
        <h5>Book Info</h5>
        {
            bookInfo.map((props)=>{
                const{_id,BookName,Auther,Page,Language,Quantity,Rating,AgeGroup,Image,Genre,Description}=props;
                return(
                    <div key={_id}>
                    <img src={Image.url} alt='' style={{height:'100px'}}/>
                     <h4>{BookName}</h4>
                     <h5>{Auther}</h5>
                     <h5>{Page}</h5>
                     <h5>{Language}</h5>
                     <h5>{Quantity}</h5>
                     <h5>{Rating}</h5>
                     <h5>{AgeGroup}</h5>
                     <h5>
                
                     {Genre.map((genre,index)=>{
                      const {title}=genre
                      return (
                        <>
                        {title}
                        {index !== Genre.length - 1 && ","}
                        </>
                      )
                     })}
    
    
                     </h5>
    
                     <h5 dangerouslySetInnerHTML={{__html:Description}}/>
                    </div>
                )
            })
        }
        </>
    
    
    )}
       </>
  )
}

export default BookInfo