import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { SpoilerLogApiService } from '../services/spoiler-log-service';
import { Location, Zone } from '../core/models/spoiler-log';
import { CreateLocationRequest, SaveLocationRequest, DeleteLocationRequest, SaveLocationsRequest } from '../core/requests/location'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-locations',
  templateUrl: './manage-locations.component.html',
  styleUrls: ['./manage-locations.component.scss']
})
export class ManageLocationsComponent implements OnInit {
  //Data variables
  Zones: Zone[];

  //Page State variables
  IsWait: boolean = false;

  //Table Variables
  dataSource: MatTableDataSource<Location>;
  DisplayedColumns: string[] = ['select',
    //'ID', 
    'Name',
    'ZoneID',
    'DefaultItemAtLocationName',
    'Action'];
  selection = new SelectionModel<Location>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: SpoilerLogApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetAllLocations();
    this.GetAllZones();
  }

  //Table functions
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }

  applyFilter(event: Event) {
    this.selection.clear();
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //console.log(this.dataSource);
  }

  GetZoneText(ZoneID: number) {
    return this.Zones.filter(z => z.ID == ZoneID)[0].Name;
  }

  //API calls
  GetAllLocations(): void {
    this.IsWait = true;
    this.service.Post<Location[]>('Config/GetAllLocations').subscribe(locations => {
      this.dataSource = new MatTableDataSource<Location>(locations);
      this.dataSource.paginator = this.paginator;
      this.IsWait = false;
    },
      err => {
        console.log('HTTP Error', err);
        this.IsWait = false;
      });
  }

  GetAllZones(): void {
    this.service.Post<Zone[]>('Config/GetAllZones').subscribe(zones => {
      this.Zones = zones;
    },
      err => {
        console.log('HTTP Error', err);
      });
  }

  UpdateLocation(Location: Location): void {
    this.IsWait = true;
    let req = new SaveLocationRequest(Location);
    this.service.Post<Location[]>('Config/SaveLocation', req).subscribe(locations => {
      this.dataSource.data = locations;
      this.IsWait = false;
    });
  }

  UpdateLocations(Locations: Location[]): void {
    this.IsWait = true;
    let req = new SaveLocationsRequest(Locations);
    this.service.Post<Location[]>('Config/SaveLocations', req).subscribe(locations => {
      this.dataSource.data = locations;
      this.IsWait = false;
    });
  }

  DeleteLocation(Location: Location): void {
    this.IsWait = true;
    let req = new DeleteLocationRequest(Location);
    this.service.Post<Location[]>('Config/DeleteLocation', req).subscribe(locations => {
      this.dataSource.data = locations;
      this.IsWait = false;
    });
  }

  CreateLocation(Location: Location): void {
    this.IsWait = true;
    let req = new CreateLocationRequest(Location);
    this.service.Post<Location[]>('Config/CreateLocation', req).subscribe(locations => {
      this.dataSource.data = locations;
      this.IsWait = false;
    });
  }


  //Dialog functions
  openDialog(location: Location): void {
    let data = new mat_data();
    data.Location = location;
    data.zones = this.Zones;
    const dialogRef = this.dialog.open(ManageLocationDialog, {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe((location: Location) => {
      if (location != null) {
        if (location.ID != null) {
          this.UpdateLocation(location);
        }
        else {
          this.CreateLocation(location);
        }
      }

    });
  }

  openEditZoneMultipleDialog(locations: Location[]): void {
    let data = new mat_data();
    data.Locations = locations;
    data.zones = this.Zones;
    const dialogRef = this.dialog.open(EditZoneMultipleDialog, {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe((locations: Location[]) => {
      if (locations != null) {
        this.UpdateLocations(locations);
      }
    });
  }

}

@Component({
  selector: 'manage-location-dialog',
  templateUrl: 'manage-location-dialog.html',
  styleUrls: ['./manage-locations.component.scss']
})
export class ManageLocationDialog {
  Location: Location;
  Zones: Zone[];
  constructor(
    public dialogRef: MatDialogRef<ManageLocationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: mat_data) {
    this.Location = data.Location;
    this.Zones = data.zones;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(this.data.Location);
  }


}

@Component({
  selector: 'edit-zone-multiple-dialog',
  templateUrl: 'edit-zone-multiple-dialog.html',
  styleUrls: ['./manage-locations.component.scss']
})
export class EditZoneMultipleDialog {
  Locations: Location[];
  Zones: Zone[];
  SelectedZoneID: number = 1;
  constructor(
    public dialogRef: MatDialogRef<EditZoneMultipleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: mat_data) {
    this.Locations = data.Locations;
    this.Zones = data.zones;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.data.Locations.forEach(location => {
      location.ZoneID = this.SelectedZoneID;
    });
    this.dialogRef.close(this.data.Locations);
  }
}

export class mat_data {
  Location: Location;
  Locations: Location[];
  zones: Zone[];

}