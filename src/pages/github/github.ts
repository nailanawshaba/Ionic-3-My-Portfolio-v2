import { GithubmodalPage } from './../githubmodal/githubmodal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';

//gituhb GithubProvider
import { GithubProvider } from './../../providers/github/github';

// @IonicPage()
@Component({
  selector: 'page-github',
  templateUrl: 'github.html',
})
export class GithubPage {
  public user = {};
  repos: any;
  repodetail: any;
  public owner = {};
  public loader = this.loadingCtrl.create({
    content: "Loading User...",
  });
  constructor(public navCtrl: NavController, public navParams: NavParams, public gitdata: GithubProvider, public http: Http, private toast: ToastController, public loadingCtrl: LoadingController, private iab: InAppBrowser, public modalCtrl: ModalController) {


    this.loader.present();
    this.doRefresh(0);


  }

  doRefresh(refresher) {
    this.gitdata.getRepo().subscribe(gitdatas => {
      this.repos = gitdatas;
      // this.owner = {
      //   name: gitdatas[0].owner.login,
      //   avatar: gitdatas[0].owner.avatar_url,
      //   url: gitdatas[0].owner.html_url,
      //   // repocount: this.user.public_repos,
      //   // follower: this.user.followers
      // };
      // this.owner = gitdatas[0].owner;
      console.log(this.user);
    },
      //handle error  
      (err) => {
        this.toast.create({
          message: `You are offline, please check your internet connection`,
          showCloseButton: true,
          closeButtonText: 'Ok'
        }).present();
      },
      () => {
        this.loader.dismiss();

      }
    )
    setTimeout(() => {
      if (refresher != 0)
        refresher.complete();
    }, 2000);

    this.gitdata.getUser().subscribe(users => {
      this.user = users;

      // console.log(this.user);
    })
  }
  repoDetail(reponame: string) {
    let url = 'https://github.com/mazlanmohdnor/' + reponame;
    return this.iab.create(url);

    // console.log(reponame);
    // this.gitdata.getRepoDetail(reponame).subscribe(repodata => {
    // console.log(repodata);
    // this.repodetail = repodata;
    // this.navCtrl.push(RepodetailPage, { 'repo': repodata })
    // })
  }


  presentModal() {
    let modal = this.modalCtrl.create(GithubmodalPage);
    modal.present();
  }


}
