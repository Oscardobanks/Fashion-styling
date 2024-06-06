import { Component } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from '../blog/blog';
import { Style } from '../blog/styles';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  recentBlog: Blog[] = [];
  itemsPerPage = 8;
  currentPage = 1;
  totalPages!: number;
  totalBlogs!: number;
  activePage: number = 1;
  pageNumbers: number[] = [];
  title: string = 'personal stylist';
  subtitle: string = 'Welcome to our world of style and elegance! Unleash your fashion potential with our expert guidance and curated collections';

  constructor(private blogService: BlogService) {
    this.generatePageNumbers();
  }

  ngOnInit() {
    this.blogService.getBlogs().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.blogService.getStyles().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.recentBlog = this.blogService.getBlogs();
    this.totalPages = Math.ceil(this.blogService.getStyles().length / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.activePage = this.currentPage;
    this.totalBlogs = this.blogService.getStyles().length;
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

  getPaginatedCards(): Style[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.blogService.getStyles().slice(startIndex, endIndex);
  }
}
