import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {BrowseComponent} from './pages/browse/browse.component';
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};
export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'browse',
    component: BrowseComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
