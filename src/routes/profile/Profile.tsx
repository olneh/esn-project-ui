import React, { useEffect, useState } from "react";

import ProfileMember from "./ProfileMember";
import ProfileMemberEvents from "./ProfileMemberEvents";
import { MemberService } from "../../services/MemberService";
import { IMember } from "../../entities/IMember";

const Profile = () => {
    const sampleMemberId = '1';
    const memberService = new MemberService();
    const [member, setMember] = useState<IMember | null>(null);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const fetchedMember = await memberService.getMemberById(sampleMemberId);
                setMember(fetchedMember);
            } catch (error) {
                console.error('Failed to get user data', error);
            }
        };
        fetchMember();
    }, [sampleMemberId]);

    return (
        <>
            <h1>👤 Your Personal Cabinet</h1>
            <ProfileMember></ProfileMember>
            <ProfileMemberEvents member={member}></ProfileMemberEvents>
        </>
    );
}

export default Profile;