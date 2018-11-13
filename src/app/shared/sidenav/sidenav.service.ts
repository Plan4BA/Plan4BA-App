import { Injectable, EventEmitter } from '@angular/core';

/**
 * the sidenav service is only a temporary solution for forwarding
 * menu button events from the individual pages to the side drawer on the main page
 */
@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  open: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
