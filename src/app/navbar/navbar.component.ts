// navbar.component.ts

import {Component, Input, Output, EventEmitter, HostListener, Renderer2, ElementRef} from '@angular/core';
import {LoginFormComponent} from "../login-form/login-form.component";
import { DialogService} from "../dialog.service";
import {NgOptimizedImage} from "@angular/common";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    LoginFormComponent,
    NgOptimizedImage
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() activeIndex: number = 0;
  @Output() slideChange: EventEmitter<number> = new EventEmitter<number>();

  protected windowWidth = window.innerWidth;
  protected windowHeight= window.innerHeight;

  constructor(private dialogService: DialogService,private renderer: Renderer2, private el: ElementRef) {}
  // Propriétés pour stocker la largeur et la hauteur de la fenêtre


  // Utilisez le décorateur HostListener pour réagir à l'événement de redimensionnement de la fenêtre
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Mettez à jour les propriétés avec la nouvelle taille de la fenêtre
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    console.log('Width:', this.windowWidth, 'Height:', this.windowHeight);
  }

  // Appelez cette méthode dans ngOnInit pour obtenir la taille initiale de la fenêtre
  ngOnInit() {
    this.getWindowSize();
  }

  // Méthode pour obtenir la taille de la fenêtre
  getWindowSize() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }


  openLoginDialog(): void {

    this.dialogService.openLoginDialog('Login');

  }
  openSignInDialog(): void{
    this.dialogService.openLoginDialog('SignIn');
  }
  navigateTo(index: number): void {
    this.slideChange.emit(index);
  }

  changeVisibility() {

    // change le css de .menu-icon de display: none à display: block si il était en display: none
    if (this.el.nativeElement.querySelector('.menu-icon').style.display === 'none') {
      this.renderer.setStyle(this.el.nativeElement.querySelector('.menu-icon'), 'display', 'block');
    } else {
      this.renderer.setStyle(this.el.nativeElement.querySelector('.menu-icon'), 'display', 'none');
    }


  }
}
