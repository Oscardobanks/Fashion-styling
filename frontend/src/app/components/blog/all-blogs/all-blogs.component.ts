import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss'],
})
export class AllBlogsComponent {
  itemsPerPage = 6;
  currentPage = 1;
  totalPages!: number;
  activePage: number = 1;
  pageNumbers: number[] = [];
  title: string = 'Our blog';
  subtitle: string =
    'Our news, views, events and Best Articles are designed and dedicated to providing valuable insights and resources to our readers to help you move forward, faster in the fashion world.';

  articles: any;
  author: any;

  constructor(private blogService: BlogService, public _auth: AuthService) {
    this.generatePageNumbers();
  }

  ngOnInit() {
    this.blogService.getAll().subscribe(
      (res) => {
        this.articles = res;
        console.log(this.articles);
        this.totalPages = Math.ceil(this.articles.length / this.itemsPerPage);
        this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.activePage = this.currentPage;
  
        this._auth.getAuthorById(this.articles[0].idAuthor).subscribe((data) => {
          this.author = data;
          this.author = this.author.data
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  generatePageNumbers() {
    this.pageNumbers = Array(this.totalPages)
      .fill(0)
      .map((_, index) => index + 1);
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
  
    let paginatedCards: any[] = [];
  
    this.blogService.getAll().subscribe((res: any) => {
      paginatedCards = res.slice(startIndex, endIndex);
    });
  
    return paginatedCards;
  }

  extractFirstParagraph(content: string): string {
    const paragraphs = content.split('\n');
    if (paragraphs.length > 0) {
      const firstParagraph = paragraphs.find((p) => p.trim() !== '');
      if (firstParagraph) {
        return firstParagraph;
      }
    }
    return '';
  }
}
