import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { DetailPage } from '../detail/detail';

const query = gql`
{
  contents{
        id
        title
        detail
        page
        group
        img
    
}}
`;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  promotions : any;
  constructor(public navCtrl: NavController, private apollo: Apollo) {
    //Demo data
    // this.promotions =[
    //   {img : 'assets/images/img_demo_banner_1.png'},
    //   {img : 'assets/images/img_demo_banner_1.png'},
    //   {img : 'assets/images/img_demo_banner_1.png'},
    //   {img : 'assets/images/img_demo_banner_1.png'},
    //   {img : 'assets/images/img_demo_banner_1.png'},
    //   {img : 'assets/images/img_demo_banner_1.png'},
    //   {img : 'assets/images/img_demo_banner_1.png'},
    // ];


    try {
      this.apollo.watchQuery<any>({
        query
      })
        .valueChanges.subscribe(({ data }) => {
          this.promotions = data.contents;
          console.log( data.contents);
        
        });
    }
    catch (e) {
      console.log(e.message);
    }
  }


  pushToDetail(id){
    console.log(id);
    this.navCtrl.push(DetailPage,{contentId : id})
  }

}
