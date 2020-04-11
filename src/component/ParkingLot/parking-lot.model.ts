export interface IParkingLotStatus {
  carCount: number;
}

export interface IParkingLot {
  id?: number;
  name?: string;
  address?: string;
  spots: number;
  imageUrl?: string;
  status?: IParkingLotStatus;
}

export interface IParkingLotEntry {
  id?: number;
  enterTime?: Date;
  exitTime?: Date;
  carPlate: string;
}

export const defaultValue: Readonly<IParkingLot> = {
  spots: 350,
};
