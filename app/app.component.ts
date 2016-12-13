import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>Advent of Code 2016!!!</h1>
        <p>{{ aocDescription }}</p>
        <day-one></day-one>
        <day-two></day-two>
        `
})
export class AppComponent  { 

    public aocDescription:string = `Santa's sleigh uses a very high-precision clock to guide its movements, and the clock's oscillator is regulated by stars. Unfortunately, the stars have been stolen... by the Easter Bunny. To save Christmas, Santa needs you to retrieve all fifty stars by December 25th. Collect stars by solving puzzles. Two puzzles will be made available on each day in the advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!`;

    constructor() {
 
    }


}
