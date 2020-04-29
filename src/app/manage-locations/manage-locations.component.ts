import { Component, OnInit, Inject } from '@angular/core';
import { SpoilerLogApiService } from '../services/spoiler-log-service';
import { Location, Zone } from '../core/models/spoiler-log';
import { CreateLocationRequest, SaveLocationRequest, DeleteLocationRequest } from '../core/requests/location'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-locations',
  templateUrl: './manage-locations.component.html',
  styleUrls: ['./manage-locations.component.scss']
})
export class ManageLocationsComponent implements OnInit {
  Locations: Location[];
  dataSource = new MatTableDataSource(this.Locations);
  IsWait: boolean = false;
  DisplayedColumns: string[] = ['select','ID', 'Name', 'ZoneID', 'DefaultItemAtLocationName', 'Action'];

  constructor(private service: SpoilerLogApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetAllLocations();
  }

  selection = new SelectionModel<Location>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.Locations.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.Locations.forEach(row => this.selection.select(row));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

    dialogRef.afterClosed().subscribe((locaiton:Location) => {
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
    private service: SpoilerLogApiService) {
      this.GetAllZones();
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(this.Location);
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