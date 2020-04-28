import { Component, OnInit, Inject } from '@angular/core';
import { SpoilerLogApiService } from '../services/spoiler-log-service';
import { Location, Zone } from '../core/models/spoiler-log';
import { CreateLocationRequest, SaveLocationRequest, DeleteLocationRequest } from '../core/requests/location'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-locations',
  templateUrl: './manage-locations.component.html',
  styleUrls: ['./manage-locations.component.scss']
})
export class ManageLocationsComponent implements OnInit {
  Locations: Location[];
  IsWait: boolean = false;
  DisplayedColumns: string[] = ['ID', 'Name', 'ZoneID', 'DefaultItemAtLocationName', 'Action'];

  constructor(private service: SpoilerLogApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetAllLocations();
  }

  GetAllLocations(): void {
    this.IsWait = true;
    this.service.Post<Location[]>('Config/GetAllLocations').subscribe(locations => {
      this.Locations = locations;
      this.IsWait = false;
    },
      err => {
        console.log('HTTP Error', err);
        this.IsWait = false;
      });
  }

  UpdateLocation(Location: Location): void {
    this.IsWait = true;
    let req = new SaveLocationRequest(Location);
    this.service.Post<Location[]>('Config/SaveLocation', req).subscribe(locations => {
      this.Locations = locations;
      this.IsWait = false;
    });
  }

  DeleteLocation(Location: Location): void {
    this.IsWait = true;
    let req = new DeleteLocationRequest(Location);
    this.service.Post<Location[]>('Config/DeleteLocation', req).subscribe(locations => {
      this.Locations = locations;
      this.IsWait = false;
    });
  }

  CreateLocation(Location: Location): void {
    this.IsWait = true;
    let req = new CreateLocationRequest(Location);
    this.service.Post<Location[]>('Config/CreateLocation', req).subscribe(locations => {
      this.Locations = locations;
      this.IsWait = false;
    });
  }

  openDialog(location: Location): void {
    const dialogRef = this.dialog.open(ManageLocationDialog, {
      width: '600px',
      data: location != null ? location : new Location()
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}

@Component({
  selector: 'manage-location-dialog',
  templateUrl: 'manage-location-dialog.html',
  styleUrls: ['./manage-locations.component.scss']
})
export class ManageLocationDialog {
  Zones: Zone[];
  constructor(
    public dialogRef: MatDialogRef<ManageLocationDialog>,
    @Inject(MAT_DIALOG_DATA) public Location: Location,
    private service: SpoilerLogApiService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  GetAllZones(): void {
    this.service.Post<Zone[]>('Config/GetAllZones').subscribe(zones => {
      this.Zones = zones;
    },
      err => {
        console.log('HTTP Error', err);
      });
  }
}