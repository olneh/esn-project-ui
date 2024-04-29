import React, {useState} from "react";
import {IMember} from "../../entities/IMember";
import {EMonths} from "../../enums/EMonths";

interface MemberBirthdayTableViewProps {
    searchKeyword: string;
    members: IMember[];
}

const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const MemberBirthdayByMonthTableView: React.FC<MemberBirthdayTableViewProps> = ({
                                                                             searchKeyword,
                                                                             members,
                                                                         }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const filteredMembers = members.filter((member) => {
        if (!member.birthday) return false;

        const memberBirthday = new Date(member.birthday);
        if (isNaN(memberBirthday.getTime())) {
            return false;
        }
        const memberMonth = memberBirthday.getMonth();

        return memberMonth === selectedMonth && (
            member.firstName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            member.lastName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            member.phone?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            member.email?.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    });

    return (
        <>
            <h2>🎂🍰🎁Happy Birthday🎈🥳🎉</h2>
            <tr>
                <td> Find members celebrating their birthday in &nbsp; </td>
                <td>
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
                </td>
            </tr>


            {filteredMembers.length > 0 ? (
                <table className="table table-striped table-bordered mt-4">
                    <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Birthday 🎂</th>
                        {/*<th scope="col">Phone Number 📱</th>*/}
                        {/*<th scope="col">Email 💌</th>*/}
                        {/*<th scope="col">Points 🌟</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredMembers.map((member) => (
                        <tr key={member.id}>
                            <td>{member.firstName}</td>
                            <td>{member.lastName}</td>
                            <td>{member.birthday ? `${new Date(member.birthday).getDate()} ${EMonths[new Date(member.birthday).getMonth()]}` : 'N/A'}</td>
                            {/*<td>{member.phone}</td>*/}
                            {/*<td>{member.email}</td>*/}
                            {/*<td>{member.points}</td>*/}
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Looks like there are no birthdays in this month. Try another one! 🕵️‍♂️</p>
            )}
            <br/>
        </>
    );
};

export default MemberBirthdayByMonthTableView;
