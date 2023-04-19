import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayPopUpComponent } from './display-pop-up/display-pop-up.component';
import { DisplayWebMapComponent } from './display-web-map/display-web-map.component';
import { FeatureLayerComponent } from './feature-layer/feature-layer.component';
import { EditFeatureComponent } from './edit-feature/edit-feature.component';
import { SearchAddressComponent } from './search-address/search-address.component';
import { SelectMenuComponent } from './select-menu/select-menu.component';
import { ReverseGeocodeComponent } from './reverse-geocode/reverse-geocode.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MultiBaseComponent } from './multi-base/multi-base.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayPopUpComponent,
    DisplayWebMapComponent,
    FeatureLayerComponent,
    EditFeatureComponent,
    SearchAddressComponent,
    SelectMenuComponent,
    ReverseGeocodeComponent,
    NavigationComponent,
    MultiBaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
