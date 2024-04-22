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
    const [searchTerm, setSearchTerm] = useState<string>('');


    const toggleSort = () => {
        setSortAscending(!sortAscending);
    };

    const filteredMembers = members.filter(member => {
        return member.firstName.toLowerCase().includes(searchTerm) || member.lastName.toLowerCase().includes(searchTerm);
    });

    const sortedMembers = [...members].sort((a, b) => {
        // Treat undefined points as 0
        const pointsA = a.points ?? 0;
        const pointsB = b.points ?? 0;

        if (sortAscending) {
            return pointsA - pointsB;
        } else {
            return pointsB - pointsA;
        }
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
                        {/*<td>{member.birthday ? new Date(member.birthday).toDateString() : 'IDK :('}</td>*/}
                        <td>{member.birthday ? `${new Date(member.birthday).getDate()} ${EMonths[new Date(member.birthday).getMonth()]}` : 'N/A'}</td>
                        <td>{member.phone ? member.phone : 'IDK :('}</td>
                        <td>{member.email ? member.email : 'idk :('}</td>
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
