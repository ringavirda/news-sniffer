import { BehaviorSubject, Observable, Subject } from "rxjs";

export interface ControlItem {
    type: string,
    text: string[];
    style: string;
    action: (stage: any) => void;
    stage: BehaviorSubject<any>;
}