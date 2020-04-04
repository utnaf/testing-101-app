export interface IParkingLot {
  id?: number;
  name?: string;
  address?: string;
  spots: number;
  imageUrl?: string;
}

export const defaultValue: Readonly<IParkingLot> = {
  spots: 350
};
