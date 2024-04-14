import React, { useState } from 'react';
import { IMember } from "../../entities/IMember";

interface HomeBirthdayTableViewProps {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
    members: IMember[];
}

const HomeBirthdayTableView: React.FC<HomeBirthdayTableViewProps> = ({ searchKeyword, setSearchKeyword, members }) => {
    const [sortAscending, setSortAscending] = useState<boolean>(true);

    const formatDate = (birthday?: Date | string) => {
        if (!birthday) return 'N/A';
        const date = new Date(birthday);
        if (isNaN(date.getTime())) return 'Invalid date';
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        return `${day}. ${month}`;
    };

    const isToday = (birthday?: Date | string) => {
        if (!birthday) return false;
        const date = new Date(birthday);
        if (isNaN(date.getTime())) return false;
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value.toLowerCase());
    };

    const filteredMembers = members.filter(member =>
        member.firstName.toLowerCase().includes(searchKeyword) || member.lastName.toLowerCase().includes(searchKeyword)
    );

    const sortedMembers = filteredMembers.sort((a, b) => {
        const dateA = a.birthday ? new Date(a.birthday) : new Date(0);
        const dateB = b.birthday ? new Date(b.birthday) : new Date(0);
        const monthA = dateA.getMonth();
        const dayA = dateA.getDate();
        const monthB = dateB.getMonth();
        const dayB = dateB.getDate();
        if (sortAscending) {
            return monthA === monthB ? dayA - dayB : monthA - monthB;
        } else {
            return monthA === monthB ? dayB - dayA : monthB - monthA;
        }
    });

    return (
        <>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Birthday</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedMembers.map((member) => (
                        <tr key={member.id}
                            >
                            <td style={isToday(member.birthday) ? {borderColor: '#7ac143'} : undefined}>{isToday(member.birthday) ? `${member.firstName} ${member.lastName}, HAPPY BIRTHDAY! 🎂` : `${member.firstName} ${member.lastName}`}</td>
                            <td>{formatDate(member.birthday)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default HomeBirthdayTableView;
