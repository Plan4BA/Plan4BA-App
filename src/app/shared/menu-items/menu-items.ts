import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'home', type: 'link', name: 'Dashboard', icon: 'dashboard' },
  { state: 'calendar', type: 'link', name: 'Kalender', icon: 'calendar_today' },
  { state: 'meals', type: 'link', name: 'Essen', icon: 'restaurant' },
  { state: 'settings', type: 'link', name: 'Einstellungen', icon: 'settings' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
