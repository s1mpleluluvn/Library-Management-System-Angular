import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AdminBooksService } from 'src/app/adminServices/admin-books.service';
import { IBook } from './books';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  bookSearch;
  constructor(private fb: FormBuilder, public bookSer: AdminBooksService, private fbd: FormBuilder) { }
  public books = [];
  adminBooksUp;
  adminBooks;
  put() {
    this.bookSer.putBook(this.adminBooks.value).subscribe(
      data => console.log('Success!', data),
      error => console.error('Error!', error)
    );
  }
  onSubmit() {
    let cnf = confirm("Press Ok to save the form..");
    if (cnf == true) {
      /*post method calling*/
      this.put();

      this.adminBooks.reset();
    } else {

    }
  }

  filterStatus = "All";

  getbyStatus(fil: string) {
    console.log(fil);
    this.bookSer.getBookbyStatus(fil)
      .subscribe(data => this.books = data);
  }
  get() {
    this.bookSer.getBook()
      .subscribe(data => this.books = data);
  }

  bookStatus(st) {
    this.filterStatus = st;
    console.log(this.filterStatus);
    // this.wholeGet();
    console.log(this.filterStatus);
    if (this.filterStatus == "All") {
      console.log("ifffff")
      this.get();
    }
    else {
      console.log("elseee")
      this.getbyStatus(this.filterStatus);
    }

  }

  wholeGet() {

    // console.log(this.filterStatus);
    // if (this.filterStatus == "All") {
    //   console.log("ifffff")
    //   this.get();
    // }
    // else {
    //   console.log("elseee")
    //   this.getbyStatus(this.filterStatus);
    // }

  }


  ngOnInit() {

    // this.wholeGet();
    this.bookStatus(this.filterStatus);

    this.adminBooks = this.fb.group({
      btitle: ['', [Validators.required, Validators.minLength(5)]],
      bcatag: ['', [Validators.required,]],
      bstatus: ['', [Validators.required,]],
      bcopies: ['', [Validators.required, Validators.min(1)]],
      bisbn: ['', [Validators.required,]],
      byear: ['', [Validators.required, Validators.min(1200), Validators.max(2020)]],
      bauthor: [''],
      bpub: [''],
      pubname: [''],
      bdate: ['']
    })


    this.adminBooksUp = this.fbd.group({
      btitle: ['', [Validators.required, Validators.minLength(5)]],
      bcatag: ['', [Validators.required,]],
      bstatus: ['', [Validators.required,]],
      bcopies: ['', [Validators.required, Validators.min(1)]],
      bisbn: ['', [Validators.required,]],
      byear: ['', [Validators.required, Validators.min(1200), Validators.max(2020)]],
      bauthor: [''],
      bpub: [''],
      pubname: [''],
      bdate: ['']
    })


  }

  delete(id: number) {
    console.log(id);
    let cnf = confirm("Press Ok to delete the book..");
    if (cnf == true) {
      this.bookSer.deleteBook(id).subscribe(
        (data: IBook) => {
          // this.get();
        }
      );
    }
    else {

    }
  }
  OnUpdate(currentBook) {
    console.log(currentBook.id);
    if (currentBook.id != null) {
      console.log("Update!!");
      let cnf = confirm("Press Ok to update the book..");
      if (cnf == true) {
        this.update(currentBook);

      }
      else {

      }

    }
    else {
      console.log("Create!!")
    }
  }

  update(book: IBook) {
    this.bookSer.updateBook(book).subscribe();
  }

  edit(book: IBook) {
    this.bookSer.currentBook = Object.assign({}, book)
  }

}
