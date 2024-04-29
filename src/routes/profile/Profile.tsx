import React from "react";

import ProfileMember from "./ProfileMember";
import ProfileMemberEvents from "./ProfileMemberEvents";

const Profile = () => {
    const sampleMemberId = 1;
    return (
        <>
            <h1>Welcome to Your Personal Cabinet</h1>
            <ProfileMember></ProfileMember>
            <ProfileMemberEvents memberId={1}></ProfileMemberEvents>
        </>
    );
}

export default Profile;