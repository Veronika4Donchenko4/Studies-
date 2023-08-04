import "./Modal.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { closeModalPost } from "../../redux/slices/postsSlice"
import { closeModalUser } from "../../redux/slices/usersSlice"
import { closeModalPhoto } from "../../redux/slices/photosSlice"

const Modal = ({title, modalContent, dataType}) => {

    const dispatch = useDispatch();

    const closeModal = () => {
        if (dataType === "posts") {
            return closeModalPost();
        } else if (dataType === "users") {
            return closeModalUser();
        } else if (dataType === "photos") {
            return closeModalPhoto();
        }
    }

    return !modalContent ? "" : (
        <div className="modal">
            <div className="modal__body">
                <div className="modal__header"> 
                    <h2>{title}</h2>
                    <button className="header__btn" onClick={() => dispatch(closeModal())}>X</button>
                </div>
                {modalContent}
            </div>
        </div>
    );
}
export default Modal;