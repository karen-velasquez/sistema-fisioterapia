import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TitleStrategy } from '@angular/router';



const FISIOTERAPIA_ICON=
  `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g><path d="m302.459 377-11.459 60h191c16.569 0 30-13.431 30-30 0-16.569-13.431-30-30-30z" fill="#2b0552" data-original="#2b0552" class=""></path><path d="m171 272v90h139v-90z" fill="#5e54ac" data-original="#5e54ac" class=""></path><path d="m256 272h54v90h-54z" fill="#453d81" data-original="#453d81"></path><path d="m296 100h-80c-46.944 0-85 38.056-85 85v5l40 82h210v-87c0-46.944-38.056-85-85-85z" fill="#fff5f5" data-original="#fff5f5" class=""></path><path d="m296 100h-40v172h125v-87c0-46.944-38.056-85-85-85z" fill="#e1ebf0" data-original="#e1ebf0" class=""></path><path d="m336 227v35h60v-35c0-16.569-13.431-30-30-30s-30 13.431-30 30z" fill="#f2d1a5" data-original="#f2d1a5" class=""></path><g><path d="m256 332h-113.5c-28.995 0-52.5 23.505-52.5 52.5 0 28.995 23.505 52.5 52.5 52.5h113.5l10-52.5z" fill="#ff7c48" data-original="#ff7c48" class=""></path><path d="m90 384.5c0 28.995 23.505 52.5 52.5 52.5h113.5l10-52.5z" fill="#ff1f3e" data-original="#ff1f3e" class=""></path></g><path d="m441 257h-130c-22.091 0-40 17.909-40 40v35h-15v105h35c33.137 0 60-26.863 60-60v-60h90c16.569 0 30-13.431 30-30 0-16.569-13.431-30-30-30z" fill="#5e54ac" data-original="#5e54ac" class=""></path><path d="m0 497c0 8.284 6.716 15 15 15h482c8.284 0 15-6.716 15-15v-15c0-24.853-20.147-45-45-45h-422c-24.853 0-45 20.147-45 45z" fill="#fff5f5" data-original="#fff5f5" class=""></path><path d="m467 437h-211v75h241c8.284 0 15-6.716 15-15v-15c0-24.853-20.147-45-45-45z" fill="#e1ebf0" data-original="#e1ebf0" class=""></path><circle cx="256" cy="55" fill="#ffe4c2" r="55" data-original="#ffe4c2" class=""></circle><path d="m311 55c0-30.376-24.624-55-55-55v110c30.376 0 55-24.624 55-55z" fill="#f2d1a5" data-original="#f2d1a5" class=""></path><path d="m191 227v-37h-60v57c0 22.091 17.909 40 40 40h100c16.569 0 30-13.431 30-30 0-16.569-13.431-30-30-30z" fill="#ffe4c2" data-original="#ffe4c2" class=""></path><path d="m271 227h-15v60h15c16.569 0 30-13.431 30-30 0-16.569-13.431-30-30-30z" fill="#f2d1a5" data-original="#f2d1a5" class=""></path><g><path d="m256 384.5v52.5h35c30.595 0 55.823-22.905 59.517-52.5z" fill="#453d81" data-original="#453d81"></path></g><circle cx="52.5" cy="384.5" fill="#ffe4c2" r="52.5" data-original="#ffe4c2" class=""></circle><path d="m0 384.5c0 28.995 23.505 52.5 52.5 52.5s52.5-23.505 52.5-52.5z" fill="#f2d1a5" data-original="#f2d1a5" class=""></path></g></g></svg>
  `;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isLoggedIn = false;
  user:any = null;

  constructor(public login:LoginService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) { 
      this.matIconRegistry.addSvgIconLiteral('fisioterapia',
      this.domSanitizer.bypassSecurityTrustHtml(FISIOTERAPIA_ICON)
    );}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

}
