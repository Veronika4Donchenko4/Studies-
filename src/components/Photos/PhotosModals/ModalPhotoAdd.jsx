import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addPhoto } from "../../../redux/slices/photosSlice";

const ModalPhotoAdd = ({countPhotos}) => {
    const dispatch = useDispatch();
    const inputTitleRef = useRef(null);
    const inputUrlRef = useRef(null);

    return (
        <div className="modal__content">
            <form>
                <div>
                    <input ref={inputTitleRef} type="text" placeholder="Input photo title" required  />
                </div>
                <div>
                    <input ref={inputUrlRef} type="url" placeholder="Input photo url" required  />
                </div>
                <button className="greenBtn" onClick={() => dispatch(addPhoto({
                    id: countPhotos + 1,
                    title: inputTitleRef.current.value,
                    url: inputUrlRef.current.value,
                }))}>Create photo</button>
            </form>
        </div>
    );
}
export default ModalPhotoAdd;