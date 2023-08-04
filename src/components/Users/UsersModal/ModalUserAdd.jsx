import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/slices/usersSlice";

const ModalUserAdd = ({countUsers}) => {
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
                    <input ref={inputNameRef} type="text" placeholder="Input name" required  />
                </div>
                <div>
                    <input ref={inputUsernameRef} type="text" placeholder="Input username" required  />
                </div>
                <div>
                    <input ref={inputEmailRef} type="email" placeholder="Input email" required  />
                </div>
                <div>
                    <input ref={inputPhoneRef} type="text" placeholder="Input phone" required  />
                </div>
                <div>
                    <input ref={inputWebsiteRef} type="url" placeholder="Input website" required  />
                </div>
                <button className="greenBtn" onClick={() => dispatch(addUser({
                    id: countUsers + 1,
                    name: inputNameRef.current.value,
                    username: inputUsernameRef.current.value,
                    email: inputEmailRef.current.value,
                    phone: inputPhoneRef.current.value,
                    website: inputWebsiteRef.current.value,
                }))}>Create user</button>
            </form>
        </div>
    );
}
export default ModalUserAdd;