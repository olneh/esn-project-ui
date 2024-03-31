import React, {useEffect, useState} from "react";
import {MemberService} from "../../services/MemberService";
import {IMember} from "../../entities/IMember";
import SearchBar from "../SearchBar";

const MemberPoints = () => {
    const memberService = new MemberService();
    const [searchKeyword, setSearchKeyword] = useState<string>('');

    const [members, setMembers] = useState<IMember[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const membersData = await memberService.getAllMembers();
            setMembers(membersData);
        };
        fetchMembers();
    }, []);

    // Filter members based on the search keyword
    const filteredMembers = members.filter(member =>
        member.firstName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
        <>
            <h1>Points</h1>

            <h1>User Ratings</h1>
            <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>
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

export default MemberPoints;
