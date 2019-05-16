export interface MenuItem {
  state: string;
  translationKey: string;
  type: string;
  icon: string;
}

export const MENUITEMS: MenuItem[] = [
  {
    state: 'home',
    type: 'link',
    translationKey: 'menuItems.dashboard',
    icon: 'dashboard'
  },
  {
    state: 'calendar',
    type: 'link',
    translationKey: 'menuItems.calendar',
    icon: 'calendar_today'
  },
  {
    state: 'meals',
    type: 'link',
    translationKey: 'menuItems.meals',
    icon: 'restaurant'
  },
  {
    state: 'links',
    type: 'link',
    translationKey: 'menuItems.links',
    icon: 'link'
  },
  {
    state: 'settings',
    type: 'link',
    translationKey: 'menuItems.settings',
    icon: 'settings'
  }
];
