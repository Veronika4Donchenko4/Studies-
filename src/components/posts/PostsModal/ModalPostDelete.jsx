import { useDispatch } from "react-redux";
import { deletePost, closeModalPost } from "../../../redux/slices/postsSlice";

const ModalPostDelete = ({id}) => {
    const dispatch = useDispatch();

    return (
        <div className="modal__content">
            <h3>Are you sure you want to delete this entry?</h3>
            <div className="groupBtn">
                <button className="greenBtn" onClick={() => dispatch(deletePost(id))}>Yes</button>
                <button className="redBtn" onClick={() => dispatch(closeModalPost())}>No</button>
            </div>
        </div>
    );
}
export default ModalPostDelete;