import { MouseEvent, ChangeEvent } from "react";
import { IEvent } from "../../entities/IEvent";

interface IProps {
    values: IEvent;
    handleChange: (target: EventTarget & (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)) => void;
    onSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
}

const EventsRegistrationFormView = ({ values, handleChange, onSubmit }: IProps) => {
    return (
        <form className="form-signin w-100 m-auto" onSubmit={(e) => e.preventDefault()}>
            <h3>Register New Event</h3>
            <hr/>
            <div className="form-floating mb-3">
                <input type="text" id="Input_EventTitle" name="eventTitle" maxLength={128}
                       className="form-control" value={values.eventTitle}
                       onChange={(e) => handleChange(e.target)}
                       placeholder="Event Title"/>
                <label htmlFor="Input_EventTitle">Event Title</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    onChange={(e) => handleChange(e.target)}
                    value={values.eventDate instanceof Date ? values.eventDate.toISOString().split('T')[0] : ''}
                    className="form-control" autoComplete="bday" aria-required="true"
                    type="date"
                    id="Input_Birthday" name="birthday"/>
                <label htmlFor="Input_Birthday">Birthday</label>
            </div>

            <div className="form-floating mb-3">
                <select id="Input_AttendanceType" name="attendanceType"
                        className="form-control" value={values.attendanceType}
                        onChange={(e) => handleChange(e.target)}
                >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="RSVP">RSVP</option>
                </select>
                <label htmlFor="Input_AttendanceType">Attendance Type</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" id="Input_Comment" name="comment" maxLength={256}
                       className="form-control" value={values.comment}
                       onChange={(e) => handleChange(e.target)}
                       placeholder="Additional Comments"/>
                <label htmlFor="Input_Comment">Additional Comments</label>
            </div>

            <div className="form-floating mb-3">
    <textarea id="Input_Comment" name="comment" maxLength={256}
              className="form-control" value={values.comment}
              onChange={(e) => handleChange(e.target)}
              placeholder="Additional Comments" style={{height: '100px'}}></textarea>
                <label htmlFor="Input_Comment">Additional Comments</label>
            </div>

            <div className="form-floating mb-3">
                <input type="number" id="Input_HelpersNeeded" name="helpersNeeded"
                       className="form-control" value={values.helpersNeeded.toString()}
                       onChange={(e) => handleChange(e.target)}
                       placeholder="Number of Helpers Needed" min="0"/>
                <label htmlFor="Input_HelpersNeeded">Number of Helpers Needed</label>
            </div>
            <button type="button" onClick={onSubmit} className="w-100 btn btn-lg btn-primary">Register</button>

        </form>

    );
}

export default EventsRegistrationFormView;
