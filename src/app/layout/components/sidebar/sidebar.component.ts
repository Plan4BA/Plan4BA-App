import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

import { AuthService } from '@app/core/services/auth.service';
import { MenuItem, MENUITEMS } from './menu-items';

@Component({
  selector: 'p4ba-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {
  @Output() close = new EventEmitter<any>();
  mobileQuery: MediaQueryList;
  menuItems: MenuItem[] = MENUITEMS;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  itemClick() {
    if (!this.mobileQuery.matches) {
      this.close.next();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
