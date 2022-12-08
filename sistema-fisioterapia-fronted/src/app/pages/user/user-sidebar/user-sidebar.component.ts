import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const CREATE_ICON=
  `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 32 32" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="15.964" x2="16.043" y1="17.039" y2="-.918"><stop offset=".106" stop-color="#ffc25f"></stop><stop offset=".2686" stop-color="#ffc969"></stop><stop offset=".6098" stop-color="#ffd47a"></stop><stop offset=".8682" stop-color="#ffd880"></stop></linearGradient><linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="13.091" x2="20.232" y1="39.09" y2="4.404"><stop offset=".0666" stop-color="#15a4fc"></stop><stop offset=".1956" stop-color="#23b1fb"></stop><stop offset=".502" stop-color="#40ccfa"></stop><stop offset=".6776" stop-color="#4bd6f9"></stop></linearGradient><g id="_x36_"><g><path d="m22.91 8.91c0 3.82-3.09 6.91-6.91 6.91-3.3 0-6.06-2.31-6.75-5.4-.11-.48-.16-.99-.16-1.51 0-3.81 3.09-6.91 6.91-6.91 2.88 0 5.36 1.77 6.39 4.28.34.81.52 1.7.52 2.63z" fill="url(#SVGID_1_)" data-original="url(#SVGID_1_)"></path><path d="m30 25.45c0 1.26-.51 2.4-1.33 3.22-.83.82-1.97 1.33-3.22 1.33h-18.9c-2.15 0-3.97-1.49-4.44-3.5-.07-.32-.11-.65-.11-1-.01-3.89 1.55-7.41 4.1-9.95l.03-.03c1.11-1.1 2.88-1.14 4.11-.17 1.18.93 2.58 1.58 4.12 1.85.53.1 1.08.14 1.64.14s1.11-.05 1.63-.14c1.54-.27 2.94-.92 4.12-1.85 1.24-.97 3.01-.93 4.12.18l.02.02c.94.94 1.75 2.02 2.4 3.2 1.09 1.98 1.71 4.27 1.71 6.7z" fill="url(#SVGID_2_)" data-original="url(#SVGID_2_)"></path><path d="m19.85 21.97h-2.3v-2.3c0-.49-.4-.89-.89-.89h-1.31c-.49 0-.89.4-.89.89v2.3h-2.3c-.49 0-.89.4-.89.89v1.31c0 .49.4.89.89.89h2.3v2.3c0 .49.4.89.89.89h1.31c.49 0 .89-.4.89-.89v-2.3h2.3c.49 0 .89-.4.89-.89v-1.31c0-.49-.4-.89-.89-.89z" fill="#ffffff" data-original="#ffffff"></path></g></g></g></svg>
  `;

const DELETE_ICON=
  `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><linearGradient id="lg1"><stop offset="0" stop-color="#21d1f7"></stop><stop offset="1" stop-color="#2196f3"></stop></linearGradient><linearGradient id="SVGID_1_" gradientTransform="matrix(1 0 0 -1 0 513.77)" gradientUnits="userSpaceOnUse" x1="-110.462" x2="422.648" xlink:href="#lg1" y1="385.612" y2="-84.178"></linearGradient><linearGradient id="SVGID_00000125602749076977960510000000563327354003445180_" gradientTransform="matrix(1 0 0 -1 0 513.77)" gradientUnits="userSpaceOnUse" x1="24.404" x2="557.514" xlink:href="#lg1" y1="538.66" y2="68.87"></linearGradient><linearGradient id="SVGID_00000133521442458159731350000003762347292190040999_" gradientTransform="matrix(1 0 0 -1 0 513.77)" gradientUnits="userSpaceOnUse" x1="87.328" x2="620.438" xlink:href="#lg1" y1="610.063" y2="140.273"></linearGradient><g id="Layer_2_00000090273534146090039370000009675682423000297609_"><g id="add_delete"><path d="m142.4 249h95.5c78.7 0 142.4 63.8 142.4 142.4v40.6c0 33.2-26.9 60.2-60.2 60.2h-260c-33.2-.1-60.1-27-60.1-60.2v-40.6c0-78.7 63.8-142.4 142.4-142.4z" fill="url(#SVGID_1_)" data-original="url(#SVGID_1_)"></path><circle cx="190.2" cy="121.2" fill="url(#SVGID_00000125602749076977960510000000563327354003445180_)" r="101.3" data-original="url(#SVGID_00000125602749076977960510000000563327354003445180_)"></circle><path d="m361 168.4h121.2c16.5 0 29.8 13.3 29.8 29.8 0 16.5-13.4 29.8-29.8 29.8h-121.2c-16.5 0-29.8-13.3-29.8-29.8-.1-16.4 13.3-29.8 29.8-29.8z" fill="url(#SVGID_00000133521442458159731350000003762347292190040999_)" data-original="url(#SVGID_00000133521442458159731350000003762347292190040999_)"></path></g></g></g></svg>
  `;


@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { 
    this.matIconRegistry.addSvgIconLiteral('ejercicios',
    this.domSanitizer.bypassSecurityTrustHtml(CREATE_ICON)
    );

    this.matIconRegistry.addSvgIconLiteral('extra',
    this.domSanitizer.bypassSecurityTrustHtml(DELETE_ICON)
    );
  }

  ngOnInit(): void {
  }

}
