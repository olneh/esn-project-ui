import React, { useState } from 'react';
import { IMember } from "../../entities/IMember";
import {EMonths} from "../../enums/EMonths";

interface MemberTableViewProps {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
    members: IMember[];
}

const MemberTableView: React.FC<MemberTableViewProps> = ({ searchKeyword, setSearchKeyword, members }) => {
    const [sortAscending, setSortAscending] = useState<boolean>(true);

    const toggleSort = () => {
        setSortAscending(!sortAscending);
    };

    const filteredMembers = members.filter(member => {
        return member.firstName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        member.phone?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        member.points?.toString().includes(searchKeyword);
    });

    return (
        <>
            <table className="table table-striped table-bordered mt-4">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email</th>
                    <th scope="col" style={{cursor: 'pointer'}} onClick={toggleSort}>
                        ⭐ Points {sortAscending ? '↑' : '↓'}
                    </th>
                </tr>
                </thead>
                <tbody>
                {filteredMembers.map(member => (
                    <tr key={member.id}>
                        <td><strong>{member.firstName}</strong> {member.lastName}</td>
                        <td>{member.birthday ? `${new Date(member.birthday).getDate()} ${EMonths[new Date(member.birthday).getMonth()]}` : 'N/A'}</td>
                        <td>{member.phone ? member.phone : 'idk 🤷‍♂️'}</td>
                        <td>{member.email ? member.email : 'idk 🤷‍♂️'}</td>
                        <td>{member.points ? member.points : 0}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <br/>
        </>
    );
}

export default MemberTableView;
