import React, {useEffect, useState} from "react";
import {MemberService} from "../../services/MemberService";
import {IMember} from "../../entities/IMember";
import SearchBar from "../SearchBar";
import MemberBirthdayTableView from "./MemberBirthdayTableView";
import HomeBirthdayTableView from "./HomeBirthdayTableView";

const MemberPoints = () => {
    const memberService = new MemberService();
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [searchByMonthKeyword, setSearchByMonthKeyword] = useState<string>('');

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
            <h1>Birthdays</h1>
            <MemberBirthdayTableView searchKeyword={searchByMonthKeyword} setSearchKeyword={setSearchByMonthKeyword}
                                     members={members}/>
            <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>
            <HomeBirthdayTableView searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} members={members}/>


        </>
    )

}

export default MemberPoints;
