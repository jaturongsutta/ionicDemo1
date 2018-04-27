import { Component } from '@angular/core';

import { ContentMapPage } from '../content-map/content-map';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContentMapPage;
  tabProfileRoot = ProfilePage;

  constructor() {

  }
}
