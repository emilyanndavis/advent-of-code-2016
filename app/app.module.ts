import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { 
    DayOne,
    DayTwo
} from './components';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ 
        AppComponent,
        DayOne,
        DayTwo
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
