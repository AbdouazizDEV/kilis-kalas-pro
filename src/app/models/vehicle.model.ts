export type TransportMode = 'moto' | 'taxi' | 'clando';

export interface Vehicle {
  brand: string;
  model: string;
  plate: string;
  color: string;
  year?: number;
  transportMode: TransportMode;
}
