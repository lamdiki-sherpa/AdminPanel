import React, { useContext, useState, useEffect } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import BookContext from "../context/BookContext/BookContext";
import imageplus from "../../image/plus.png";
import $ from "jquery";
import "./book.css";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const BookPopUp = () => {
  const { book, setBook, AddGenre, genreList,value, setValue,image, setImage } = useContext(BookContext);
  const [isUploaded, setIsUploaded] = useState(false);
 
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [imageError, setImageError] = useState("");
  console.log("image", image);
  //   const splitImage=image.split(",")[1]
  //   console.log("split",splitImage);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setBook({ ...book, [name]: value });
  };
  const validate = (values) => {
    const error = {};
    if (!values.BookName) {
      error.BookName = "required";
    }
    if (!values.Auther) {
      error.Auther = "required";
    }
    if (!values.Status) {
      error.Status = "required";
    }
    if (!values.Rating) {
      error.Rating = "required";
    } else if (values.Rating > 5) {
      error.Rating = "Rating must be less than 5";
    } else if (values.Rating < 0) {
      error.Rating = "Rating must be more than 0";
    }
    // if(image===null){
    //     error.Image="required"
    // }

    return error;
  };

  const handleCancel = () => {
    $(".addpopupBg").fadeOut(1000);
    $(".addpopUp").fadeOut(1000);
    setError({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(book));
    setSubmit(true);
    if (!image) {
      setImageError("Image is required");
    } else {
      setImageError("");
    }
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      AddGenre()
      setSubmit(false);
     } else {
      setSubmit(false);
    }
  }, [error]);
  const handleChanges = (e, value) => {
    e.preventDefault()
    setBook((prev) => ({
      ...prev,
      Genre: value,
    }));
  };
  console.log(book);
  return (
    <div className="popupBg addpopupBg">
      <div className="popUp addpopUp">
        <div className="header">Add Book</div>
        <div className="body">
          <div>
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="BookName"
              value={book.BookName}
              onChange={handleChange}
            />
            {error.BookName && <div>{error.BookName}</div>}
          </div>
          <div>
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              name="Auther"
              value={book.Auther}
              onChange={handleChange}
            />
            {error.Auther && <div>{error.Auther}</div>}
          </div>
          <div>
            <label>Age Group</label>
            <select
              className="form-select"
              name="AgeGroup"
              value={book.AgeGroup}
              onChange={handleChange}
            >
              <option value="4-8">4-8</option>
              <option value="9-12">9-12</option>
              <option value="13-19">13-19</option>
              <option value="20+">20+</option>
            </select>
          </div>
          <div>
            <label>Rating</label>
            <input
              type="number"
              className="form-control"
              name="Rating"
              value={book.Rating}
              onChange={handleChange}
            />
            {error.Rating && <div>{error.Rating}</div>}
          </div>
          <div>
            <label>Pages</label>
            <input
              type="number"
              className="form-control"
              name="Page"
              value={book.Page}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="text"
              className="form-control"
              name="Quantity"
              value={book.Quantity}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Language</label>
            <select
              className="form-select"
              name="Language"
              value={book.Language}
              onChange={handleChange}
            >
              <option value="np">Nepali</option>
              <option value="en">English</option>
              <option value="tr">Translated</option>
            </select>
          </div>
          <div>
            <label>Genre</label>

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={genreList}
              disableCloseOnSelect
              value={book.Genre}
              name="Genre"
              onChange={handleChanges}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label="Genre" />}
            />
          </div>
          <div>
            <label>Status</label>
            <select
              className="form-select"
              name="Status"
              value={book.Status}
              onChange={handleChange}
            >
              <option value="1">Available</option>
              <option value="2">Unavailable</option>
            </select>
            {error.Status && <div>{error.Status}</div>}
          </div>
          <div>
            <label>Description</label>
            {/* <textarea
              name="Description"
              value={book.Description}
              onChange={handleChange}
              className="form-control"
            ></textarea> */}
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </div>
          <div className="imageUpload">
            {isUploaded ? (
              <div className="image_box">
                <img src={image} alt="" style={{ height: "100px" }} />
                <span
                  className="close"
                  onClick={() => {
                    setImage("");
                    setIsUploaded(false);
                    setImageError("");
                  }}
                >
                  <AiFillCloseSquare />
                </span>
              </div>
            ) : (
              <div className="inputField">
                <input type="file" onChange={handleChange} id="image" />
                <label className="image_box" htmlFor="image">
                  <img src={imageplus} alt="" style={{ height: "100px" }} />
                </label>
              </div>
            )}
            {imageError && <div>{imageError}</div>}
          </div>
        </div>
        <div className="buttons">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Add
          </button>
          <button className="btn btn-danger mx-1" onClick={handleCancel}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookPopUp;
