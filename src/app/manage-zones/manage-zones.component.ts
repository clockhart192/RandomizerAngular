import { Component, OnInit, Inject } from '@angular/core';
import { SpoilerLogApiService } from '../services/spoiler-log-service';
import { Zone } from '../core/models/spoiler-log';
import { CreateZoneRequest, SaveZoneRequest, DeleteZoneRequest } from '../core/requests/zone'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-zones',
  templateUrl: './manage-zones.component.html',
  styleUrls: ['./manage-zones.component.scss']
})
export class ManageZonesComponent implements OnInit {

  Zones: Zone[];

  IsWait: boolean = false;
  DisplayedColumns: string[] = ['ID','OrderID', 'Name', 'Action'];

  constructor(private service: SpoilerLogApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetAllZones();
  }

  GetAllZones(): void {
    this.IsWait = true;
    this.service.Post<Zone[]>('Config/GetAllZones').subscribe(zones => {
      this.Zones = zones;
      this.IsWait = false;
    },
      err => {
        console.log('HTTP Error', err);
        this.IsWait = false;
      });
  }

  UpdateZone(Zone: Zone): void {
    this.IsWait = true;
    let req = new SaveZoneRequest(Zone);
    this.service.Post<Zone[]>('Config/SaveZone', req).subscribe(zones => {
      this.Zones = zones;
      this.IsWait = false;
    });
  }

  DeleteZone(Zone: Zone): void {
    this.IsWait = true;
    let req = new DeleteZoneRequest(Zone);
    this.service.Post<Zone[]>('Config/DeleteZone', req).subscribe(zones => {
      this.Zones = zones;
      this.IsWait = false;
    });
  }

  CreateZone(Zone: Zone): void {
    this.IsWait = true;
    let req = new CreateZoneRequest(Zone);
    this.service.Post<Zone[]>('Config/CreateZone', req).subscribe(zones => {
      this.Zones = zones;
      this.IsWait = false;
    });
  }

  openDialog(zone: Zone): void {
    const dialogRef = this.dialog.open(ManageZoneDialog, {
      width: '450px',
      data: zone
    });

    dialogRef.afterClosed().subscribe((zone: Zone) => {
      if (zone.ID == 0) {
        this.CreateZone(zone);
      }
      else {
        this.UpdateZone(zone);
      }
    });
  }
}

@Component({
  selector: 'manage-zone-dialog',
  templateUrl: 'manage-zone-dialog.html',
  styleUrls: ['./manage-zones.component.scss']
})
export class ManageZoneDialog {
  IsNew: boolean = false;
  WorkingZone: Zone;
  constructor(
    public dialogRef: MatDialogRef<ManageZoneDialog>,
    @Inject(MAT_DIALOG_DATA) public zone: Zone) {
    if (this.zone == null) {
      this.zone = new Zone();
      this.IsNew = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(this.zone);
  }
}