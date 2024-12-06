import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Documento} from '../Model/Documento';
import {catchError, EMPTY, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocServicoService {

  baseUrl: string = 'http://localhost:8080/Documento';
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(Documento: Documento): Observable<Documento> {
    return this.http.post<Documento>(this.baseUrl, Documento).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Documento[]> {
    return this.http.get<Documento[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Documento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Documento>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(Documento: Documento): Observable<Documento> {
    const url = `${this.baseUrl}/${Documento.id}`;
    return this.http.put<Documento>(url, Documento).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number | undefined): Observable<Documento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Documento>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
