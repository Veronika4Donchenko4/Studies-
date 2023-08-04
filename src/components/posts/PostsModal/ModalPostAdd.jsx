import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../../redux/slices/postsSlice";

const ModalPostAdd = ({countPosts}) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const textAreaRef = useRef(null);

    return (
        <div className="modal__content">
            <form>
                <div>
                    <input ref={inputRef} type="text" placeholder="Input post title" required  />
                </div>
                <div>
                    <textarea ref={textAreaRef} placeholder="Input post text" required></textarea>
                </div>
                <button className="greenBtn" onClick={() => dispatch(addPost({
                    id: countPosts + 1,
                    title: inputRef.current.value,
                    body: textAreaRef.current.value,
                }))}>Create post</button>
            </form>
        </div>
    );
}
export default ModalPostAdd;