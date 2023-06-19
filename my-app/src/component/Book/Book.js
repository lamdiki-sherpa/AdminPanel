import React, { useContext, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import BookContext from "../context/BookContext/BookContext";
import DataTable from "react-data-table-component";
import { ShowImgpreview } from "../hooks/Imagepreview";
import $ from 'jquery'
import BookPopUp from "./BookPopUp";
import { AiOutlineDelete} from 'react-icons/ai'
import { GrFormView } from 'react-icons/gr'
const Book = () => {
  const navigate=useNavigate()
  const { bookList, originalList, setBookList, status, setStatus
    ,genre,setGenre ,genreList} =
    useContext(BookContext);
  const [imgPreview, setImgPreview] = useState("");
  const [prv, setPrv] = useState(false);
  const columns = [
    {
      name: "S.N",
      width: "70px",
      selector: (row, index) => index + 1,
    },
    {
      name: "Image",
      width: "100px",
      selector: (row) => (
        <img
          src={row.Image.url}
          alt=""
          onClick={() => handleImage(row)}
          style={{
            height: "40px",
            width: "40px",
            padding: "5px",
            objectFit: "contain",
          }}
        />
      ),
    },
    {
      name: "Book Name",
      selector: (row) => row.BookName,
    },
    {
      name: "Author",
      selector: (row) => row.Auther,
    },
    {
      name: "Genre",
      selector: (row) =>(
        row.Genre.map((item)=>(
            item.title
        )

        ).join(', ')
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <button className="border-0">
          <span>{checkStatus(row.Status)}</span>
        </button>
      ),
    },
    {
      name:"Action",
      selector:(row)=>(
        <>
        <span onClick={()=>handleView(row._id)}><GrFormView/></span>
        <span className="mx-1" onClick={()=>handleDelete(row._id)}><AiOutlineDelete/></span>
        </>
      )
    }
  ];
  const checkStatus = (status) => {
    if (status === "1") {
      return <span className="badge bg-success">Available</span>;
    } else if (status === "2") {
      return <span className=" badge bg-danger">Out of stock</span>;
    }
  };
  const handleView=(id)=>{
  // setId(id)
  navigate(`/bookinfo/${id}`)
  }
  const handleDelete=(id)=>{
  // setId(id)
  }
  const handleImage = (row) => {
    setImgPreview(row.Image.url);
    setPrv(true);
  };
  const searchInput = useRef("");
  const handleSearch = (e) => {
    e.preventDefault();
    const searchResult = searchInput.current.value.toLowerCase();
    if (searchResult) {
      const searchOutput = originalList.filter(
        (list) =>
          list["BookName"].toLowerCase().includes(searchResult) ||
          list["Auther"].toLowerCase().includes(searchResult)
      );
      if (searchOutput) {
        setBookList(searchOutput);
      } else {
        setBookList({});
      }
    } else {
      setBookList(originalList);
    }
  };
  const handleAdd=()=>{
    $(".addpopupBg").fadeIn(1000)
    $(".addpopUp").fadeIn(1000)
  }
  return (
    <>
      {prv &&
        ShowImgpreview({
          img: imgPreview,
          setTrigger: setPrv,
        })}
      <div className="d-flex justify-content-between">
        <div>
          <div className="d-flex">
            <div>
              <label className="d-block">status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" selected disabled>
                  select status
                </option>
                <option value="-1">All</option>
                <option value="1">Available</option>
                <option value="2">Out of stock</option>
              </select>
            </div>
            <div>
              <label className="d-block">Genre</label>
              <select
                value={genre}
                onChange={(e) =>setGenre(e.target.value)}>
                <option value="" selected disabled>
                  select genre
                </option>
                <option value="-1">All</option>
                {/* <option value="1">Available</option>
                <option value="2">Out of stock</option> */}
                {genreList.map((genres)=>{
                  return <option value={genres.title} key={genres._id}>{genres.title}</option>
                })}
              </select>
            </div>
            <div>
              <label className="d-block">search</label>
              <input
                type="text"
                className="mx-1"
                onChange={handleSearch}
                ref={searchInput}
              />
            </div>
          </div>

          {/* <input type='text'/> */}
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleAdd}>Add</button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={bookList}
        pagination
        fixedHeader
        highlightOnHover
        pointerOnHover
        responsive
        dense
        striped
      />
      <BookPopUp/>
    </>
  );
};

export default Book;
