// place files you want to import through the `$lib` alias in this folder.
export interface ParkingLot{
    name: string;
    description: string;
    fullness: number[];
    current: number;
    total: number;
    parkedusers : string[];
}