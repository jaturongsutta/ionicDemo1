import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from 'apollo-link-context';


import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { TabsPage } from '../pages/tabs/tabs';

import { ProfilePage } from '../pages/profile/profile';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    DetailPage,
    ProfilePage,
    TabsPage
  ],
  imports: [
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      mode:'ios',
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      scrollAssist: false,
      autoFocusAssist: false,

    }, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs' },
        { component: HomePage, name: 'HomePage', segment: 'home' },
        { component: DetailPage, name: 'DetailPage', segment: 'detail' },
        { component: ProfilePage, name: 'ProfilePage', segment: 'profile' },

      ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    DetailPage,
    ProfilePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {

    // const http = httpLink.create({ uri: 'http://192.168.1.199:8080/graphql' });
    const http = httpLink.create({ uri: 'http://webapi-webapi.7e14.starter-us-west-2.openshiftapps.com/graphql' });
    const auth = setContext((_, { headers = new HttpHeaders() }) => {




      return {
        headers: headers
      };
    });


    apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache(),
    });
  }
}
