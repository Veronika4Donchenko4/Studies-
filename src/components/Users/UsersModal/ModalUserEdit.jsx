import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slices/usersSlice";

const ModalUserEdit = ({ id, name, username, email, phone, website }) => {
    const dispatch = useDispatch();
    const inputNameRef = useRef(null);
    const inputUsernameRef = useRef(null);
    const inputEmailRef = useRef(null);
    const inputPhoneRef = useRef(null);
    const inputWebsiteRef = useRef(null);

    return (
        <div className="modal__content">
            <form>
                <div>
                    <input ref={inputNameRef} type="text" placeholder="Input name" defaultValue={name} required  />
                </div>
                <div>
                    <input ref={inputUsernameRef} type="text" placeholder="Input username" defaultValue={username} required  />
                </div>
                <div>
                    <input ref={inputEmailRef} type="email" placeholder="Input email" defaultValue={email} required  />
                </div>
                <div>
                    <input ref={inputPhoneRef} type="text" placeholder="Input phone" defaultValue={phone} required  />
                </div>
                <div>
                    <input ref={inputWebsiteRef} type="url" placeholder="Input website" defaultValue={website} required  />
                </div>
                <button className="greenBtn" onClick={() => dispatch(updateUser({
                    id: id,
                    name: inputNameRef.current.value,
                    username: inputUsernameRef.current.value,
                    email: inputEmailRef.current.value,
                    phone: inputPhoneRef.current.value,
                    website: inputWebsiteRef.current.value,
                }))}>Update user</button>
            </form>
        </div>
    );
}
export default ModalUserEdit;