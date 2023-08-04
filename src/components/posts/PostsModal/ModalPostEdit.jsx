import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../../redux/slices/postsSlice";

const ModalPostEdit = ({ id, title, body }) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const textAreaRef = useRef(null);

    return (
        <div className="modal__content">
        <form>
            <div>
                <input ref={inputRef} type="text" defaultValue={title}  />
            </div>
            <div>
                <textarea ref={textAreaRef} defaultValue={body}></textarea>
            </div>
            <button className="greenBtn" onClick={() => dispatch(updatePost({
                id: id,
                title: inputRef.current.value,
                body: textAreaRef.current.value,
            }))}>Update post</button>
        </form>
    </div>
    );
}
export default ModalPostEdit;