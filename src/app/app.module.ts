import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationModalComponent } from './common-components/confirmation-modal/confirmation-modal.component';
import { MainLoaderComponent } from './common-components/main-loader/main-loader.component';
import { ToasterComponent } from './common-components/toaster/toaster.component';
import { ImageCropperComponent } from './common-components/image-cropper/image-cropper.component';
import { SessionTimeoutComponent } from './common-components/session-timeout/session-timeout.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    ImageCropperComponent,
    ToasterComponent,
    MainLoaderComponent,
    ConfirmationModalComponent,
    SessionTimeoutComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
