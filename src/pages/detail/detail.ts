import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  id: string;
  contentImg: string;
  title :string;
  detail :string;
  img :string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
    this.id = this.navParams.get('contentId');
    console.log(this.id)
    const query = gql`
      {
        content(id: "${this.id}"){
          id
          title
          detail
          page,
          img
          group
      }}`;
    try {
      this.apollo.watchQuery<any>({
        query:query
      }).valueChanges.subscribe(
        resp => {
          let data = resp.data.content;
          this.title = data.title;
          this.detail = data.detail;
          this.img = data.img;
          console.log("resp: " + JSON.stringify(resp));

        },
        err => console.log('ERROR', err));

    }
    catch (e) {
      console.log(e.message);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
