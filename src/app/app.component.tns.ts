import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { DrawerTransitionBase, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import { filter } from 'rxjs/operators';
import { SidenavService } from './shared/sidenav/sidenav.service';

@Component({
  selector: 'p4ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // some code for the RadSideDrawer has been copied from https://github.com/NativeScript/template-drawer-navigation-ng

  @ViewChild(RadSideDrawerComponent) private drawerComponent: RadSideDrawerComponent;

  private _activatedUrl: string;
  private _sideDrawerTransition: DrawerTransitionBase;

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
    private sidenavService: SidenavService,
    ) { }

  ngOnInit(): void {
    this._activatedUrl = '/home';
    this._sideDrawerTransition = new SlideInOnTopTransition();

    this.router.events
    .pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      // this.route.data.subscribe didn't work
      this.drawerComponent.sideDrawer.gesturesEnabled
        = !event.urlAfterRedirects.includes('/login')
        && !event.urlAfterRedirects.includes('/daily-lectures');
      this._activatedUrl = event.urlAfterRedirects;
    });

    this.sidenavService.open.subscribe(() => {
      this.drawerComponent.sideDrawer.showDrawer();
    });
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url;
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade'
      },
      clearHistory: true
    });

    this.drawerComponent.sideDrawer.closeDrawer();
  }
}
