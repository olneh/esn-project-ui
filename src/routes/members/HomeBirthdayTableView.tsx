import React, {useState} from 'react';
import {IMember} from "../../entities/IMember";

interface HomeBirthdayTableViewProps {
    members: IMember[];
}

const HomeBirthdayTableView: React.FC<HomeBirthdayTableViewProps> = ({members}) => {

    const [sortAscending, setSortAscending] = useState<boolean>(true);

    const formatDate = (birthday?: Date | string) => {
        if (!birthday) return 'N/A';
        const date = new Date(birthday);
        if (isNaN(date.getTime())) return 'Invalid date';
        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'long'});
        return `${day}. ${month}`;
    };

    const isToday = (birthday?: Date | string) => {
        if (!birthday) return false;
        const date = new Date(birthday);
        // Check if the date conversion is valid
        if (isNaN(date.getTime())) return false;
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
    };

    const validMembers = members.filter(member => member.birthday && !isNaN(new Date(member.birthday).getTime()));

    const sortedMembers = [...members].sort((a, b) => {
        const dateA = a.birthday ? new Date(a.birthday) : new Date(0);
        const dateB = b.birthday ? new Date(b.birthday) : new Date(0);

        // Extract month and day for comparison
        const monthA = dateA.getMonth();
        const dayA = dateA.getDate();
        const monthB = dateB.getMonth();
        const dayB = dateB.getDate();

        if (sortAscending) {
            // Compare months first, then days if the months are equal
            if (monthA === monthB) {
                return dayA - dayB;
            }
            return monthA - monthB;
        } else {
            // For descending, flip the comparisons
            if (monthA === monthB) {
                return dayB - dayA;
            }
            return monthB - monthA;
        }
    });

    return (
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
                    <tr key={member.id} style={isToday(member.birthday) ? {border: '2px solid #7ac143'} : undefined}>
                    <td>{isToday(member.birthday) ? member.firstName + " " + member.lastName + ", HAPPY BIRTHDAY! 🎂🎂🎂" :
                                                                                member.firstName + " " + member.lastName}
                        </td>
                        <td>{formatDate(member.birthday)}</td>
                    </tr>

                ))}
                </tbody>
            </table>
        </div>
    );
}

export default HomeBirthdayTableView;
