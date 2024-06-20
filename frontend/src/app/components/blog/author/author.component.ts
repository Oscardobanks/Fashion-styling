import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Blog } from '../blog';
import { BlogService } from 'src/app/services/blog.service';
import { Author } from '../author';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {

  id: any;
  newAuthor: any;
  articles: any;
  styles: any;
  author: Author | undefined;
  blog: Blog | undefined;
  itemsPerPage = 6;
  currentPage = 1;
  index: number = 3;
  totalBlogs!: number;
  totalPages!: number;
  activePage: number = 1;
  pageNumbers: number[] = [];
  title: string = 'Our blog';
  subtitle: string = 'Our news, views, events and Best Articles are designed and dedicated to providing valuable insights and resources to our readers to help you move forward, faster in the fashion world.';

  filteredBlog = this.blogService.getBlogs().filter(name => name.author === this.blogService.getAuthorById(this.index)?.lastname);
  authorBlogs = [...this.filteredBlog];

  filteredStyle = this.blogService.getOldStyles().filter(name => name.author === this.blogService.getAuthorById(this.index)?.lastname);
  authorStyles = [...this.filteredStyle];

  arrayLength = this.authorBlogs.length;
  formattedLength = '';

  constructor(private blogService: BlogService, private activatedRoute: ActivatedRoute, private _auth: AuthService) {
    this.generatePageNumbers();
  }

  ngOnInit() {
    this.authorBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.totalPages = Math.ceil(this.authorBlogs.length / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.activePage = this.currentPage;
    this.totalBlogs = this.authorBlogs.length;
    if (this.arrayLength < 10) {
      this.formattedLength = "0" + this.arrayLength;
    } else {
      this.formattedLength = this.arrayLength.toString();
    }

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
    this._auth.getAuthorById(this.id).subscribe(res => {
      this.newAuthor = res;
      this.newAuthor = this.newAuthor.data
    });

    this.blogService.getBlogByAuthorId(this.id).subscribe(res => {
      this.articles = res;
    }, err => {
      console.log();
      
    })

    this.blogService.getStyleByAuthorId(this.id).subscribe(res => {
      this.styles = res;
    }, err => {
      console.log();
      
    })
  }

  carouselOption: OwlOptions = {
    autoplay: true,
    smartSpeed: 3000,
    center: false,
    dots: false,
    loop: true,
    margin: 25,
    nav: true,
    navText: ['<i class="fas fa-arrow-left "></i>', '<i class="fas fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      920: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  };

  generatePageNumbers() {
    this.pageNumbers = Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.activePage = this.currentPage;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.activePage = this.currentPage;
    }
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.activePage = this.currentPage;
    }
  }

  getPaginatedCards(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.authorBlogs.slice(startIndex, endIndex);
  }

  extractFirstParagraph(content: string): string {
    const paragraphs = content.split('\n');
    if (paragraphs.length > 0) {
      const firstParagraph = paragraphs.find(p => p.trim() !== '');
      if (firstParagraph) {
        return firstParagraph;
      }
    }
    return '';
  }
}