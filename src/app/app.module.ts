import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KazakhstanComponent } from './kazakhstan/kazakhstan.component';
import { AppRoutingModule } from './app-routing.module';
import { WorldMapComponent } from './world-map/world-map.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GuidePageComponent } from './guide-page/guide-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { RegionInfoComponent } from './region-info/region-info.component';
import { GuidePageInfoComponent } from './guide-page-info/guide-page-info.component';
import { ChampPageComponent } from './champ-page/champ-page.component';
import { PageChampInfoComponent } from './page-champ-info/page-champ-info.component';
import { GuideItemComponent } from './guide-item/guide-item.component';
// import { PartnersPageComponent } from './partners-page/partners-page.component';


@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		KazakhstanComponent,
		WorldMapComponent,
		AboutUsComponent,
		GuidePageComponent,
		SignInComponent,
		NewsPageComponent,
		RegionInfoComponent,
		GuidePageInfoComponent,
		ChampPageComponent,
		PageChampInfoComponent,
		GuideItemComponent,
	],
	imports: [
		BrowserModule,
		NgbModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
