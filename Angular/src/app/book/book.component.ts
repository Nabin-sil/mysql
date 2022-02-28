import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from '@app/_services';
import { first } from 'rxjs/operators';
declare var jQuery: any;


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.less']
})

export class BookComponent implements OnInit {
    books:any=[];
    object:any=[];
    search: string = "";
    spinner = false;
    totalRecords: string;
     p: number = 1;

    
    constructor( public http: HttpClient,
        private bookService: BookService) {}

    ngOnInit() {

      (function($) {
      $(document).ready(function(){
        $("#sidebarCollapse").on('click', function(){
        $("#sidebar").toggleClass('active');
        });
        });
      })(jQuery);
     
    this.getAllBook();       
}



 getAllBook() {
     this.spinner = true;
        this.bookService.getAllBook().subscribe(books => {
            this.books = books.results;
            console.log(books);
            this.totalRecords = books.results.length
           this.spinner = false;

        });
    }


      deleteBook(id: string) {
        const book = this.books.find(x => x.id === id);
      //  book.isDeleting = true;
        if (confirm('Are you sure to delete this record ?') == true) { 
            book.isDeleting = true;
            this.bookService.deleteBook(id)
                    .pipe(first())
            .subscribe(() =>
            this.books = this.books.filter(x => x.id !== id));
    }
}

 
}
