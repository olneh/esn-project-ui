import React, {useEffect, useState} from "react";
import {MemberService} from "../../services/MemberService";
import {IMember} from "../../entities/IMember";
import SearchBar from "../../components/SearchBar";
import MemberTableView from "./MemberTableView";
import MemberBirthdayTableView from "../birthday/MemberBirthdayTableView";
import PhotoUploadForm from "./PhotoUploadForm";

const MemberPoints = () => {
    const memberService = new MemberService();
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    //todo change for real data
    const memberId = 1;

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
            <div>
                {/*<h1>Member Photo Upload</h1>*/}
                {/*<PhotoUploadForm memberId={memberId}/>*/}
            </div>
            <h1>⭐Rating Points</h1>
            <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>
            <MemberTableView searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} members={members}/>
        </>
    )

}

export default MemberPoints;
