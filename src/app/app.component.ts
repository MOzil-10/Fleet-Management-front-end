import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { VehicleLocation } from './interfaces/VehicleLocation';
import { FleetSystemService } from './service/fleet-system.service';
import * as bootstrap from 'bootstrap';
import { VehicleLocationHistory } from './interfaces/VehicleLocationHistory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  vehicleLocation: VehicleLocation = {
    vehicleId: 0,
    latitude: 0,
    longitude: 0,
    timestamp: new Date().toISOString()
  };

  newVehicle = {
    make: '',
    model: '',
    year: 0
  };

  latestLocation: VehicleLocation | undefined;
  vehicleHistory: VehicleLocationHistory[] = []
  center: google.maps.LatLngLiteral | undefined;
  zoom: number = 8;
  scaledSize = new google.maps.Size(40, 40);
  carMarkerPosition: google.maps.LatLngLiteral | undefined;
  loading: boolean = false;
  vehicleIdInput: number = 0;

  @ViewChild(GoogleMap, { static: false }) googleMap!: GoogleMap;

  constructor(private fleetSystemService: FleetSystemService) {}

  ngAfterViewInit() {
    if (this.vehicleIdInput && this.vehicleIdInput > 0) {
      this.getLatestLocation();
    }
  }

  onChoseLocation(event: google.maps.MapMouseEvent) {
    const clickedLat = event.latLng?.lat();
    const clickedLng = event.latLng?.lng();
    if (clickedLat && clickedLng) {
      this.center = { lat: clickedLat, lng: clickedLng };
      this.carMarkerPosition = { lat: clickedLat, lng: clickedLng };
      this.vehicleLocation.latitude = clickedLat;
      this.vehicleLocation.longitude = clickedLng;
    }
  }

  openAddVehicleModal() {
    const modalElement = document.getElementById('addVehicleModal');
    if (modalElement) {
      const addVehicleModal = new bootstrap.Modal(modalElement);
      addVehicleModal.show();
    }
  }

  closeAddVehicleModal() {
    const modalElement = document.getElementById('addVehicleModal') as HTMLElement;
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  openAddVehicleLocationModal() {
    const modalElement = document.getElementById('addVehicleLocationModal');
    if (modalElement) {
      const addVehicleLocationModal = new bootstrap.Modal(modalElement);
      addVehicleLocationModal.show();
    }
  }

  closeAddVehicleLocationModal() {
    const modalElement = document.getElementById('addVehicleLocationModal') as HTMLElement;
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  openUpdateLocationModal() {
    const modalElement = document.getElementById('updateLocationModal');
    if (modalElement) {
      const updateLocationModal = new bootstrap.Modal(modalElement);
      updateLocationModal.show();
    }
  }

  closeUpdateLocationModal() {
    const modalElement = document.getElementById('updateLocationModal') as HTMLElement;
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  submitNewVehicle() {
    const { make, model, year } = this.newVehicle;

    if (make && model && year) {
      const vehicleData = { make, model, year };
      this.loading = true;

      this.fleetSystemService.addVehicle(vehicleData)
        .subscribe({
          next: (response) => {
            console.log('New vehicle added successfully!', response);
            this.loading = false;
            this.closeAddVehicleModal();
          },
          error: (error) => {
            console.error('Error adding new vehicle:', error);
            this.loading = false;
          }
        });
    } else {
      console.log('Please fill in all fields!');
    }
  }

  openViewLatestLocationModal() {
    const modalElement = document.getElementById('viewLatestLocationModal');
    if (modalElement) {
      const viewLatestLocationModal = new bootstrap.Modal(modalElement);
      viewLatestLocationModal.show();
    }
  }
  
  getLatestLocationIfValid() {
    if (this.vehicleIdInput > 0) {
      this.getLatestLocation();
    } else {
      alert('Please provide a valid Vehicle ID');
    }
  }
  

  closeViewLatestLocationModal() {
    const modalElement = document.getElementById('viewLatestLocationModal') as HTMLElement;
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
  
  openViewLocationHistoryModal() {
    console.log('Attempting to open location history modal...');
    const modalElement = document.getElementById('viewLocationHistoryModal');
    if (modalElement) {
      const viewLocationHistoryModal = new bootstrap.Modal(modalElement);
      viewLocationHistoryModal.show();
    }
  }  

  closeViewLocationHistoryModal() {
    const modalElement = document.getElementById('viewLocationHistoryModal') as HTMLElement;
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  submitVehicleLocation() {
    this.loading = true;
    this.vehicleLocation.timestamp = new Date().toISOString();
    this.fleetSystemService.addVehicleLocation(this.vehicleLocation)
      .subscribe({
        next: (response) => {
          console.log('Vehicle location added successfully!', response);
          this.closeAddVehicleLocationModal();
          this.getLatestLocation();
        },
        error: (error) => {
          console.error('Error adding vehicle location:', error);
          this.loading = false;
        }
      });
  }

  updateLocation() {
    const { vehicleId, latitude, longitude } = this.vehicleLocation;
    this.loading = true;
    this.fleetSystemService.updateVehicleLocation(vehicleId, latitude, longitude)
      .subscribe({
        next: (response) => {
          console.log('Vehicle location updated successfully!', response);
          this.closeUpdateLocationModal();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error updating vehicle location:', error);
          this.loading = false;
        }
      });
  }

  getLatestLocation() {
    this.latestLocation = undefined;
    this.loading = true;
  
    setTimeout(() => {
      this.loading = true;
    }, 20000); 
  
    this.fleetSystemService.getLatestLocation(this.vehicleIdInput)
      .subscribe({
        next: (location: VehicleLocation) => {
          this.latestLocation = location;
          this.carMarkerPosition = { lat: location.latitude, lng: location.longitude };
          this.center = { lat: location.latitude, lng: location.longitude };
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching latest vehicle location:', error);
          this.loading = false;
        }
      });
  }  

  getVehicleLocationHistory() {
    if (this.vehicleIdInput > 0) {
      this.loading = true;
      setTimeout(() => {
        this.fleetSystemService.getLocationHistory(this.vehicleIdInput)
          .subscribe({
            next: (history: VehicleLocationHistory[]) => {
              this.vehicleHistory = history;
              this.loading = false;
            },
            error: (error) => {
              console.error('Error fetching vehicle location history:', error);
              this.loading = false;
            }
          });
      }, 30000);
    } else {
      alert('Please provide a valid Vehicle ID');
    }
  }
}