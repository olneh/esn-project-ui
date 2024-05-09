export interface MemberEventDTO {
    event: { id: number };
    memberReceiver: { id: number };
    memberManager?: { id: number };
    points: number;
    task: string;
}
