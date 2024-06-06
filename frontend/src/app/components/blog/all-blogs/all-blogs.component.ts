import { Component } from '@angular/core';
import { Blog } from 'src/app/components/blog/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent {
  itemsPerPage = 6;
  currentPage = 1;
  totalPages!: number;
  activePage: number = 1;
  pageNumbers: number[] = [];
  title: string = 'Our blog';
  subtitle: string = 'Our news, views, events and Best Articles are designed and dedicated to providing valuable insights and resources to our readers to help you move forward, faster in the fashion world.'

  constructor(private blogService: BlogService) {
    this.generatePageNumbers();
  }

  ngOnInit() {
    this.blogService.getBlogs().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.totalPages = Math.ceil(this.blogService.getBlogs().length / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.activePage = this.currentPage;
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

  getPaginatedCards(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.blogService.getBlogs().slice(startIndex, endIndex);
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
