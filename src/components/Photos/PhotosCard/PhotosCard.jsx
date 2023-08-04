import "../../../general/styles/card.css";
import { useDispatch } from "react-redux";
import {openModalPhotoInfo, openModalPhotoEdit, openModalPhotoDelete} from "../../../redux/slices/photosSlice";

const PhotosCard = ({ id, title, url }) => {

    const dispatch = useDispatch();

    const changeColor = (e) => {
        if (e.target.parentNode.classList.contains("card--gray")) {
            e.target.parentNode.classList.replace("card--gray", "card--pink");
        } else if (e.target.parentNode.classList.contains("card--pink")) {
            e.target.parentNode.classList.replace("card--pink", "card--aqua");
        } else {
            e.target.parentNode.classList.replace("card--aqua", "card--gray");
        }
        return;
    }

    return (
        <div id="card" className="card card--gray">
            <div className="card__info">
                <h2 className="card__title">{title}</h2>
                <img className="card__image" src={url} alt={url} />
            </div>
            <button onClick={() => dispatch(openModalPhotoInfo(id))}>View</button>
            <button onClick={() => dispatch(openModalPhotoEdit(id))}>Edit</button>
            <button onClick={() => dispatch(openModalPhotoDelete(id))}>Delete</button>
            <button onClick={(e) => changeColor(e)}>Change Color</button>
        </div>
    );
}
export default PhotosCard;