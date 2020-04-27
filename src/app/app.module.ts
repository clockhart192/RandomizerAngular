import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { SpoilerLogApiService} from './services/spoiler-log-service'

import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpoilerLogComponent } from './spoiler-log/spoiler-log.component';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { SpoilerItemComponent } from './spoiler-item/spoiler-item.component';
import { SpoilerLocationComponent } from './spoiler-location/spoiler-location.component';
import { ManageSessionsComponent } from './manage-sessions/manage-sessions.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SpoilerCounterComponent } from './spoiler-counter/spoiler-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    HomeComponent,
    NavBarComponent,
    SpoilerLogComponent,
    SpinnerOverlayComponent,
    SpoilerItemComponent,
    SpoilerLocationComponent,
    ManageSessionsComponent,
    SpoilerCounterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'upload', component: UploadComponent },
      { path: 'spoiler-log', component: SpoilerLogComponent },
      { path: 'manage-sessions', component: ManageSessionsComponent }
    ]),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule
  ],
  providers: [SpoilerLogApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
