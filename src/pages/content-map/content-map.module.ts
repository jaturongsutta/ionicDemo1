import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentMapPage } from './content-map';

@NgModule({
  declarations: [
    ContentMapPage,
  ],
  imports: [
    IonicPageModule.forChild(ContentMapPage),
  ],
})
export class ContentMapPageModule {}
