import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updatePhoto } from "../../../redux/slices/photosSlice";

const ModalPhotoEdit = ({ id, title, url }) => {
    const dispatch = useDispatch();
    const inputTitleRef = useRef(null);
    const inputUrlRef = useRef(null);

    return (
        <div className="modal__content">
        <form>
            <div>
                <input ref={inputTitleRef} type="text" defaultValue={title}  />
            </div>
            <div>
                <input ref={inputUrlRef} type="url" defaultValue={url}  />
            </div>
            <button className="greenBtn" onClick={() => dispatch(updatePhoto({
                id: id,
                title: inputTitleRef.current.value,
                url: inputUrlRef.current.value,
            }))}>Update photo</button>
        </form>
    </div>
    );
}
export default ModalPhotoEdit;