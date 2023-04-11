import { INewMaintenance } from "./INewMaintenance";

export interface IMaintenance extends INewMaintenance {
    _id: string,
    _v: number,
}