import {IBaseEntity} from "./IBaseEntity";
import {IMember} from "./IMember"

export interface MemberRole extends IBaseEntity {
    memberId: number;
    memberLevel: number;

    member?: IMember;
}