import esnLogo from "../images/ESN star.png";
import MemberBirthdayTableView from "./members/MemberBirthdayTableView";
import {MemberService} from "../services/MemberService";
import {useEffect, useState} from "react";
import {IMember} from "../entities/IMember";
import HomeBirthdayTableView from "./members/HomeBirthdayTableView";

const Home = () => {
    const memberService = new MemberService();
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
            <div className="text-center">
                <h2><img src={esnLogo} alt="esnLogo" height="30"/>Home</h2>
            </div>
            <div>
                <div>
                    <HomeBirthdayTableView members={members}/>
                </div>
            </div>
        </>
    )
        ;
};

export default Home;
