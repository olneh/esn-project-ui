import React, {useEffect, useState} from "react";
import {MemberService} from "../../services/MemberService";
import {IMember} from "../../entities/IMember";
import SearchBar from "../../components/SearchBar";
import MemberBirthdayByMonthTableView from "./MemberBirthdayByMonthTableView";
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
            <MemberBirthdayByMonthTableView searchKeyword={searchByMonthKeyword}
                                            members={members}/>
            <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>
            <HomeBirthdayTableView searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} members={members}/>
        </>
    )

}

export default MemberPoints;
