import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Book, Employee } from '@app/_models';
import { environment } from '@environments/environment';


//const endpoint = this.environment.apiUrl;


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint: string="";
  
//  this.endpoint =environment.apiUrl

  constructor(private http: HttpClient) { 
    this.endpoint = environment.apiUrl

  }

  
   // Add employee
   addEmployee(data: Employee): Observable<any> {
    let API_URL = `${this.endpoint}/employees/add`;
    return this.http.post(API_URL, data, httpOptions)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  

  // Get all employee
  getEmployees():Observable<any> {
    return this.http.get(`${this.endpoint}/employees`, httpOptions);
  }

  // Get Employee by id
  getEmployeeById(id): Observable<any> {
    let API_URL = `${this.endpoint}/employees/${id}`;
    return this.http.get(API_URL, httpOptions)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

//     getById(id: string) {
//       return this.http.get<Product>(`${endpoint}/read/${id}`);
//   }


  // Update Employee
  updateEmployee(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/employees/${id}`;
    return this.http.put(API_URL, data, httpOptions)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete employee
  deleteEmployee(_id: string) {
    var API_URL = `${this.endpoint}/employees/${_id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }



// Error handling 
errorMgmt(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}


}



@Injectable({
  providedIn: 'root'
})
export class BookService {
  endpoint: string="";
  
//  this.endpoint =environment.apiUrl

  constructor(private http: HttpClient) { 
    this.endpoint = environment.apiUrl

  }

  
   // Add book
   addBook(data: Book): Observable<any> {
    let API_URL = `${this.endpoint}/books/add`;
    return this.http.post(API_URL, data, httpOptions)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  

  // Get all books
  getAllBook(): Observable<any> {
    return this.http.get(`${this.endpoint}/books`, httpOptions);
  }

  // Get book by id
  getBookById(id): Observable<any> {
    let API_URL = `${this.endpoint}/books/${id}`;
    return this.http.get(API_URL, httpOptions)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update Book
  updateBook(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/books/${id}`;
    return this.http.put(API_URL, data, httpOptions)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete Book
  deleteBook(_id: string) {
    var API_URL = `${this.endpoint}/books/${_id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }



// Error handling 
errorMgmt(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}


}

