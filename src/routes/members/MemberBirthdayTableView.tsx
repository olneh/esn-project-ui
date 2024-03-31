import React, { useState } from "react";
import { IMember } from "../../entities/IMember";

interface MemberBirthdayTableViewProps {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
    members: IMember[];
}

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const MemberBirthdayTableView: React.FC<MemberBirthdayTableViewProps> = ({
                                                                             searchKeyword,
                                                                             setSearchKeyword,
                                                                             members,
                                                                         }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const filteredMembers = members.filter((member) => {
        if (!member.birthday) return false;

        const memberBirthday = new Date(member.birthday);
        // Check if memberBirthday is a valid Date object
        if (isNaN(memberBirthday.getTime())) {
            return false; // Skip this member if the birthday is not a valid date
        }
        const memberMonth = memberBirthday.getMonth();

        const doesMonthMatch = memberMonth === selectedMonth;

        return doesMonthMatch && (
            member.firstName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            member.lastName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            member.phone?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            member.email?.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    });

    return (
        <>
            <div className="month-selector">
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="form-select mb-3"
                >
                    {months.map((month, index) => (
                        <option key={month} value={index}>{month}</option>
                    ))}
                </select>
            </div>

            <table className="table table-striped table-bordered mt-4">
                <thead>
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Points</th>
                </tr>
                </thead>
                <tbody>
                {filteredMembers.map((member) => (
                    <tr key={member.id}>
                        <td>{member.firstName}</td>
                        <td>{member.lastName}</td>
                        <td>{member.birthday ? new Date(member.birthday).toDateString() : 'N/A'}</td>
                        <td>{member.phone}</td>
                        <td>{member.email}</td>
                        <td>{member.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <br/>
        </>
    );
};

export default MemberBirthdayTableView;
