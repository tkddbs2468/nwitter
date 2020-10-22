import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Profile = ({ refreshUser, userObj }) => {
    //const history = useHistory();
    const [newDispalyName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        //history.push("/");
    };

    const getMyNweets = async () => {
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt", "desc")
            .get();
        console.log(nweets.docs.map((doc) => doc.data()));
    };

    useEffect(() => {
        getMyNweets();
    });
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDispalyName) {
            await userObj.updateProfile({
                displayName: newDispalyName,
            });
            refreshUser();
        }
    };
    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Display Name"
                    value={newDispalyName}
                    onChange={onChange}
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <button
                className="formBtn cancelBtn logOut"
                onClick={onLogOutClick}
            >
                Log Out
            </button>
        </div>
    );
};
export default Profile;
