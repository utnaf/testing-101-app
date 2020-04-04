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

export const defaultValue: Readonly<IParkingLot> = {
  spots: 350,
};
