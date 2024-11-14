import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../interfaces/Vehicle';
import { VehicleLocation } from '../interfaces/VehicleLocation';
import { VehicleLocationHistory } from '../interfaces/VehicleLocationHistory';


@Injectable({
  providedIn: 'root'
})
export class FleetSystemService {
  private apiUrl = 'https://localhost:7245/api/vehicles';

  constructor(private http: HttpClient) { }

  addVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(`${this.apiUrl}`, vehicle, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    });
  }
  
  addVehicleLocation(vehicleLocation: VehicleLocation): Observable<any> {
    return this.http.post(`${this.apiUrl}/location`, vehicleLocation, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    });
  }

  getLatestLocation(vehicleId: number): Observable<VehicleLocation> {
    return this.http.get<VehicleLocation>(`${this.apiUrl}/${vehicleId}/location`);
  }

  updateVehicleLocation(vehicleId: number, latitude: number, longitude: number): Observable<any> {
    const vehicleLocation = {
      vehicleId: vehicleId,
      latitude: latitude,
      longitude: longitude,
      timestamp: new Date().toISOString()
    };
  
    return this.http.put(`${this.apiUrl}/${vehicleId}/location`, vehicleLocation, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    });
  }

  getLocationHistory(vehicleId: number): Observable<VehicleLocationHistory[]> {
    return this.http.get<VehicleLocationHistory[]>(`${this.apiUrl}/${vehicleId}/location/history`);
  }
}
