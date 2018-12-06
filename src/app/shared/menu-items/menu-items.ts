import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  translationKey: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'home', type: 'link', translationKey: 'menuItems.dashboard', icon: 'dashboard' },
  { state: 'calendar', type: 'link', translationKey: 'menuItems.calendar', icon: 'calendar_today' },
  { state: 'meals', type: 'link', translationKey: 'menuItems.meals', icon: 'restaurant' },
  { state: 'settings', type: 'link', translationKey: 'menuItems.settings', icon: 'settings' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
