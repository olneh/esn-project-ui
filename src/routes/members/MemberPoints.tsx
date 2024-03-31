import React, {useEffect, useState} from "react";
import {MemberService} from "../../services/MemberService";
import {IMember} from "../../entities/IMember";
import SearchBar from "../SearchBar";
import MemberTableView from "./MemberTableView";
import MemberBirthdayTableView from "./MemberBirthdayTableView";

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


    return (
        <>
            <h1>Points</h1>
            <h1>User Ratings</h1>
            <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>
            <MemberTableView searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} members={members}/>
            <MemberBirthdayTableView searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} members={members}/>
        </>
    )

}

export default MemberPoints;
