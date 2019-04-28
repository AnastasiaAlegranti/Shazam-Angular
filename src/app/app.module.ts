import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { FavoritesComponent } from './components/favorites/favorites.component';
import { Page404Component } from './components/page404/page404.component';
import { FilterPipe } from './pipes/filter.pipe';

const routes: Routes=[
    {path:"home", component:HomeComponent},
    {path:"favorites", component:FavoritesComponent},
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"**", component:Page404Component}
]

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavBarComponent,
    FavoritesComponent,
    Page404Component,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
