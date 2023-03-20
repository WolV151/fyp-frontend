export interface IDevice {
    _id: string, 
    device_name: string,
    description: string,
    plug_id: string,
    threshold: number,
    __v: number
}

export interface INewDevice { // I will probably get rid of this in the future
    device_name: string,
    description: string,
    plug_id: string,
    threshold: number,
}