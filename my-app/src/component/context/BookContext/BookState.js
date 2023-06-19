import { useEffect, useState } from "react";
import BookContext from "./BookContext";
import GetData from "../../hooks/GetData";
import { useParams } from "react-router-dom";
import $ from 'jquery'
import {toast} from 'react-toastify'
const BookState = (props) => {
  
  const [bookList, setBookList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [status, setStatus] = useState("-1");
  const [genre, setGenre] = useState("-1");
  const [image, setImage] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [id,setId]=useState(null)
  
  const initialValue = {
    BookName: "",
    Auther: "",
    Genre: [],
    Rating: "",
    AgeGroup: "",
    Page: "",
    Quantity: "",
    Status: "1",
    Language: "",
  };
  const [book, setBook] = useState(initialValue);
  const [value, setValue] = useState('');
  useEffect(() => {
    GetBook();
  }, [status, genre]);
  console.log("bookList", bookList);
  const GetBook = () => {
    const dataForm = {
      Type: "GET",
      FetchURL: `https://htdrnl.cyclic.app/api/getBook?UserID=-1&Status=${status}&Genres=${genre}`,
    };
    GetData(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        setBookList(postResult);
        setOriginalList(postResult);
      } else {
        setBookList([]);
        setOriginalList([]);
      }
    });
  };
  useEffect(() => {
    GetBookGenre();
  }, []);
  const GetBookGenre = () => {
    const dataForm = {
      Type: "POST",
      FLAG: "S",
      FetchURL: "https://htdrnl.cyclic.app/api/genre",
    };
    GetData(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        // GetBook()
        setGenreList(postResult);
      } else {
        setGenreList([]);
      }
    });
  };
  ///add book
  const AddGenre = () => {
    const dataForm = {
      Type: "POST",
      FetchURL: "https://htdrnl.cyclic.app/api/book",
      BookName: book.BookName,
      Auther: book.Auther,
      AgeGroup:book.AgeGroup,
      Page:book.Page,
      Genre:book.Genre,
      Quantity: book.Quantity,
      Rating:book.Rating,
      Status:book.Status,
      Language:book.Language,
      Description:value,
      FLAG: "I",
      UserID: "-1",
      Image:image,
    };
    GetData(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        toast.success(result.Message,{theme:"light"})
        // const postResult=result.Values ? result.Values : "";
        $(".addpopupBg").fadeOut(500);
        $(".addpopUp").fadeOut(500);
        
        GetBook();
      } else {
        toast.error(result.Message,{theme:"light"})
      }
    });
  };
 
  const deleteBook=()=>{

  }
  return (
    <BookContext.Provider
      value={{
        bookList,
        originalList,
        setBookList,
        status,
        setStatus,
        genre,
        setGenre,
        genreList,
        setGenreList,
        book,
        setBook,
        AddGenre,
        value, 
        setValue,
        image,
        setImage,
       
        loading, setLoading
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
