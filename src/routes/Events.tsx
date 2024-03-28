import { Button } from 'react-bootstrap';

const sampleEvents = [
    {
        eventTitle: 'Sample Event 1',
        date: new Date(),
        attendanceType: 'In-person',
        comment: 'Sample comment',
        helpersNeeded: 2,
    },
    {
        eventTitle: 'Sample Event 2',
        date: new Date(),
        attendanceType: 'Virtual',
        comment: 'Another sample comment',
        helpersNeeded: 1,
    },
];

const Events = () => {

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-auto">
                        <h2>Events</h2>
                    </div>
                    <div className="col-auto">
                        <Button variant="primary">Suggest Event</Button>
                    </div>
                    <div className="col-auto">
                        <Button variant="primary">Add Event</Button>
                    </div>
                </div>
            </div>


            <body>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Event Title</th>
                    <th>Date</th>
                    <th>Attendance Type</th>
                    <th>Comment</th>
                    <th>Helpers Needed</th>
                </tr>
                </thead>
                <tbody>
                {sampleEvents.map((event, index) => (
                    <tr key={index}>
                        <td>{event.eventTitle}</td>
                        <td>{event.date.toLocaleString()}</td>
                        <td>{event.attendanceType}</td>
                        <td>{event.comment}</td>
                        <td>{event.helpersNeeded}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </body>

        </div>
    );
};

export default Events;


