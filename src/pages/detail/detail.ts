import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  title: string;
  detail: string;
  img: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private toastCtrl: ToastController) {
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
        query: query
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


  OrderClick() {
    const mutation = gql`
    mutation {
      create(contentId:"${ this.id}",amount:${12345.50})
      {
        message
      }
    }`;


    this.apollo.mutate<any>({
      mutation: mutation
    })
      .subscribe(({ data }) => {
        console.log('success')
        let toast = this.toastCtrl.create({
          message: 'Order successfully',
          duration: 3000,
          position: 'middle'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
          
        });
        this.navCtrl.pop();
        toast.present();

      }, (error) => {
        console.log('there was an error sending the mutation', error);
      });


  }

}
