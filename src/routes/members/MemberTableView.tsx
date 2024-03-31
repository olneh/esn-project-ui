import {IMember} from "../../entities/IMember";

interface MemberTableViewProps {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
    members: IMember[];
}
const MemberTableView: React.FC<MemberTableViewProps> = ({ searchKeyword, setSearchKeyword, members }) => {

    const filteredMembers = members.filter(member =>
        member.firstName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        member.phone?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
        <>
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
                {filteredMembers.map(member => (
                    <tr key={member.id}>
                        <td>{member.firstName}</td>
                        <td>{member.lastName}</td>
                        <td>{member.birthday ? new Date(member.birthday).toDateString() : null}</td>
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


}

export default MemberTableView;
