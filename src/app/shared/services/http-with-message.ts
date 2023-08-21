import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable, OperatorFunction, pipe } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class HttpWithMessage {
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  private readonly MESSAGE_DURATION = 3000;

  public get<T>(url: string, message: string): Observable<T> {
    return this.http.get<T>(url).pipe(this.getSnackBarPipe<T>(message));
  }

  public post<T>(url: string, message: string, payload: object): Observable<T> {
    return this.http
      .post<T>(url, payload)
      .pipe(this.getSnackBarPipe<T>(message));
  }

  private getSnackBarPipe<T>(message: string): OperatorFunction<T, T> {
    return pipe(
      finalize(() =>
        this.snackBar.open(message, 'X', {
          duration: this.MESSAGE_DURATION,
          panelClass: ['success'],
          verticalPosition: 'top',
        })
      )
    );
  }
}
