import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  private subscription!: Subscription;
  constructor(private scrollService: ScrollService) { }
  isNavbarMobile: boolean = false;

  onClickScrollToSection(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }

  images: string[] = ['../assets/pexels-anastasia-shuraeva-5704845.jpg', '../assets/pexels-tembela-bohle-1884583.jpg'];
  currentImageIndex: number = 0;

  ngOnInit() {
    interval(10000).subscribe(() => {
      this.nextImageWithTransition();
    });
    
    this.setupEventListeners();

    this.subscription = this.scrollService.scroll$.subscribe((sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  changeImage(index: number) {
    this.currentImageIndex = index;
  }

  nextImageWithTransition() {
    const nextIndex = (this.currentImageIndex + 1) % this.images.length;
    const images = document.querySelectorAll('.carousel-image');
    images.forEach((image: Element) => {
      (image as HTMLElement).style.opacity = '0';
    });
    setTimeout(() => {
      this.currentImageIndex = nextIndex;
      images.forEach((image: Element) => {
        (image as HTMLElement).style.opacity = '1';
      });
    }, 500); // Wait for the transition duration
  }

  select(el: string, all: boolean = false) {
    el = el.trim();
    if (all) {
      return Array.from(document.querySelectorAll(el));
    } else {
      return document.querySelector(el);
    }
  }

  on(type: string, el: string, listener: EventListener, all: boolean = false) {
    const selectEl = this.select(el, all);
    if (selectEl) {
      if (all) {
        (selectEl as Element[]).forEach(e => e.addEventListener(type, listener));
      } else {
        (selectEl as Element).addEventListener(type, listener);
      }
    }
  }

  onscroll(el: HTMLElement, listener: EventListener) {
    el.addEventListener('scroll', listener);
  }

  setupEventListeners() {
    this.on('click', '.mobile-nav-toggle', (e: Event) => {
      const navbar = this.select('#navbar') as HTMLElement;
      navbar.classList.toggle('navbar-mobile');
      this.isNavbarMobile = !this.isNavbarMobile;
    });
  }

}
