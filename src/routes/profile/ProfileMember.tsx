import React, { useState } from 'react';
import PointsUtility from '../../components/PointsUtility';
import EncouragementUtility from '../../components/EncouragementUtility';
import EditProfileForm from './EditProfileForm';
import {MemberService} from "../../services/MemberService";
import ProfileDetails from "./ProfileDetails";

const ProfileMember = () => {
    const [member, setMember] = useState({
        id: 3,
        firstName: 'Marc',
        lastName: 'Dolcet Sadurni',
        birthday: new Date('1990-05-15'),
        phone: '+1234567890',
        email: 'marc.dolcet@example.com',
        memberEvents: [],
        points: 20 // Change this value to test different scenarios
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const memberService = new MemberService();

    const handleEditButtonClick = () => {
        setShowEditModal(true);
    };

    const handleModalClose = () => {
        setShowEditModal(false);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMember(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = () => {
        setShowEditModal(false);
        memberService.updateMemberById(member.id.toString(), member)
            .then(() => {
                console.log("Member information updated successfully.");
            })
            .catch((error) => {
                console.error("Error updating member information:", error);
            });
    };

        const getRandomEncouragement = () => {
            const {expressionsOfEncouragement} = EncouragementUtility;
            const randomIndex = Math.floor(Math.random() * expressionsOfEncouragement.length);
            return expressionsOfEncouragement[randomIndex];
        };

        const profileMessage = () => {
            if (member.points > 0) {
                return (
                    <div>
                        <p className="font-weight-bold mb-0">You have:</p>
                        <h4 className="mb-3">
                            {member.points} {member.points === 1 ? 'point' : 'points'}
                        </h4>
                        <p className="font-weight-bold mb-0">Current point level:</p>
                        {PointsUtility.getLevel(member.points ?? 0)}
                    </div>
                );
            } else {
                return (
                    <>
                        <p>
                            {member.firstName}! You don't have any points yet 🙁
                            <br/>
                            {getRandomEncouragement()}
                        </p>
                        <p>{PointsUtility.getLevel(member.points ?? 0)}</p>
                    </>
                );
            }
        };

        return (
            <>
                <ProfileDetails
                    member={member}
                    handleEditButtonClick={handleEditButtonClick}
                    profileMessage={profileMessage}
                />
                <EditProfileForm
                    show={showEditModal}
                    handleClose={handleModalClose}
                    handleFormChange={handleFormChange}
                    handleFormSubmit={handleFormSubmit}
                    member={member}
                />
            </>
        );
    };

export default ProfileMember;
