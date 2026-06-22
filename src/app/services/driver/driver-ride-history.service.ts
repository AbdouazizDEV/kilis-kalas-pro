import { Injectable } from '@angular/core';
import {
  DriverRideHistoryDetail,
  DriverRideHistoryItem,
} from '../../models/driver-ride-history.model';

const HISTORY_ITEMS: DriverRideHistoryDetail[] = [
  {
    id: 'ride-h-001',
    plateNumber: 'AA-000-AA',
    dateLabel: '18 octobre',
    fareAmount: 2_000,
    mapImageUrl: 'assets/images/home-map.svg',
    passengerName: 'Abdoul Aziz Diop',
    passengerPhotoUrl: '',
    vehicleInfo: 'AA-00-AA | beverly 500 rouge',
    rideCode: 'gowowndvd#2345673',
    fullDateLabel: 'Mardi, 10 Octobre 2-25',
    durationLabel: '00 : 08',
    distanceLabel: '3.5 km',
    offerType: 'Moto Kilis Kalas',
    pickupLabel: 'Rue zgm',
    dropoffLabel: 'parcelles unité 26',
    paymentMethod: 'Wave',
    status: 'success',
  },
  {
    id: 'ride-h-002',
    plateNumber: 'AA-000-AA',
    dateLabel: '17 octobre',
    fareAmount: 2_000,
    mapImageUrl: 'assets/images/home-map.svg',
    passengerName: 'Awa Fall',
    passengerPhotoUrl: '',
    vehicleInfo: 'AA-00-AA | beverly 500 rouge',
    rideCode: 'gowowndvd#2345674',
    fullDateLabel: 'Lundi, 9 Octobre 2-25',
    durationLabel: '00 : 12',
    distanceLabel: '4.2 km',
    offerType: 'Moto Kilis Kalas',
    pickupLabel: 'Plateau',
    dropoffLabel: 'Almadies',
    paymentMethod: 'Orange Money',
    status: 'success',
  },
];

@Injectable({ providedIn: 'root' })
export class DriverRideHistoryService {
  getHistory(): DriverRideHistoryItem[] {
    return HISTORY_ITEMS.map(({ id, plateNumber, dateLabel, fareAmount, mapImageUrl }) => ({
      id,
      plateNumber,
      dateLabel,
      fareAmount,
      mapImageUrl,
    }));
  }

  getById(id: string): DriverRideHistoryDetail | null {
    return HISTORY_ITEMS.find((item) => item.id === id) ?? null;
  }

  formatCurrency(amount: number): string {
    return `${amount.toLocaleString('fr-FR')} FCFA`;
  }
}
