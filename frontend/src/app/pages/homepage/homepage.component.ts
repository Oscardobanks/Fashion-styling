import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { Style } from '../../components/blog/styles';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  recentBlog: any[] = [];
  styles: any;
  author: any;
  id: any;
  itemsPerPage = 8;
  currentPage = 1;
  totalPages!: number;
  totalBlogs!: number;
  activePage: number = 1;
  pageNumbers: number[] = [];
  title: string = 'personal stylist';
  subtitle: string = 'Welcome to our world of style and elegance! Unleash your fashion potential with our expert guidance and curated collections';
  paginatedCards: any[] = [];

  constructor(private blogService: BlogService, private _auth: AuthService) {
    this.generatePageNumbers();
  }

  ngOnInit() {
    this.blogService.getOldStyles().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.blogService.getRecentBlogs().subscribe(blogs => {
      this.recentBlog = blogs;
      this.totalPages = Math.ceil(this.recentBlog.length / this.itemsPerPage);
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.activePage = this.currentPage;
      this.totalBlogs = this.recentBlog.length;
    });

    this._auth.getAuthorById(this.id).subscribe(res => {
      this.author = res;
      this.author = this.author.data
    });
  }

  shortTitle(input: string): string {
    return input.split(':')[0];
  }

  generatePageNumbers() {
    this.pageNumbers = Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.activePage = this.currentPage;
      this.getPaginatedCards();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.activePage = this.currentPage;
      this.getPaginatedCards();
    }
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.activePage = this.currentPage;
      this.getPaginatedCards();
    }
  }

  getPaginatedCards(): Style[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.blogService.getOldStyles().slice(startIndex, endIndex);
  }
}