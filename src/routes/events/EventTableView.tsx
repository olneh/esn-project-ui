import React, { useState } from 'react';
import { IEvent } from "../../entities/IEvent";

interface EventTableViewProps {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
    events: IEvent[];
}

const EventTableView: React.FC<EventTableViewProps> = ({ searchKeyword, setSearchKeyword, events }) => {
    const [sortAscending, setSortAscending] = useState<boolean>(true);

    const toggleSort = () => {
        setSortAscending(!sortAscending);
    };

    const sortedEvents = [...events].sort((a, b) => {
        const pointsA = a.helpersNeeded ?? 0;
        const pointsB = b.helpersNeeded ?? 0;

        if (sortAscending) {
            return pointsA - pointsB;
        } else {
            return pointsB - pointsA;
        }
    });

    const filteredEvents = sortedEvents.filter(event =>
        event.eventTitle.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        event.eventDate.toDateString().toLowerCase().includes(searchKeyword.toLowerCase()) ||
        event.attendanceType.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        event.comment.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        event.helpersNeeded.toString().includes(searchKeyword.toLowerCase())
    );

    return (
        <>
            <table className="table table-striped table-bordered mt-4">
                <thead>
                <tr>
                    <th scope="col">Title</th>
                    {/*<th scope="col">Date</th>*/}
                    <th scope="col">Attendance type</th>
                    <th scope="col">Comment</th>
                    <th scope="col" style={{cursor: 'pointer'}} onClick={toggleSort}>Helpers needed {sortAscending ? '↑' : '↓'}
                    </th>
                </tr>
                </thead>
                <tbody>
                {filteredEvents.map(event => (
                    <tr key={event.id}>
                        <td>{event.eventTitle}</td>
                        {/*<td>{event.eventDate.toDateString()}</td>*/}
                        <td>{event.attendanceType}</td>
                        <td>{event.comment}</td>
                        <td>{event.helpersNeeded}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <br/>
        </>
    );


}

export default EventTableView;
