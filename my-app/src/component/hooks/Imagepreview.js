import {AiFillCloseSquare} from 'react-icons/ai'
import './imagepreview.css'
export const ShowImgpreview=(props)=>{
return (
    <>
    <div className="imgPrv-popup">
        <div className="imgprv-popup-inner">
            <div className="Imgpreview">
                <AiFillCloseSquare  onClick={()=>props.setTrigger(false)} className='close__one'/>
                <img src={props.img} className="image__one"
                alt=""/>
            </div>
        </div>
    </div>
    </>
)
}