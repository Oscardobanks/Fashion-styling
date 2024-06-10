import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent {

  private subscription!: Subscription;

  constructor(private scrollService: ScrollService) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 45
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 45
        }
      },
    });
    this.subscription = this.scrollService.scroll$.subscribe((sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  testimonials = [
    { name: 'Saul Goodman', designation: 'Traditional Stylist', quote: 'Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.' },
    { name: 'Sara Wilsson', designation: 'Designer', quote: 'Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.' },
    { name: 'Jena Karlis', designation: 'Custom Stylist', quote: 'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.' },
    { name: 'Matt Brandon', designation: 'Lawyer', quote: 'Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.' },
    { name: 'John Larson', designation: 'Gymn Instructor', quote: 'Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.' }
  ];
  
  // testimonialsSlider = new Swiper('.testimonials-slider', this.swiperOptions);
}
