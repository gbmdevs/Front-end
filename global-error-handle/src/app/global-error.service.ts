import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorService implements ErrorHandler {

  constructor() { }

  handleError(error: any): void {
    console.error('An error occurred:', error.message);
    console.error(error);
    alert(error);
  }
}
