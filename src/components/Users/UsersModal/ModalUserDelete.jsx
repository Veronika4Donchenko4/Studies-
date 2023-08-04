import { useDispatch } from "react-redux";
import { deleteUser, closeModalUser } from "../../../redux/slices/usersSlice";

const ModalUserDelete = ({id}) => {
    const dispatch = useDispatch();

    return (
        <div className="modal__content">
            <h3>Do you really want to delete this card?</h3>
            <div className="groupBtn">
                <button className="greenBtn" onClick={() => dispatch(deleteUser(id))}>Yes</button>
                <button className="redBtn" onClick={() => dispatch(closeModalUser())}>No</button>
            </div>
        </div>
    );
}
export default ModalUserDelete;