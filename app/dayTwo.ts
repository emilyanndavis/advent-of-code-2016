import { Component } from '@angular/core';

@Component({
    selector: 'day-two',
    template: `
        <h1>Day 2, Part 1</h1>
        <p>{{ partOneDescription }}</p>
        <h3>The answer to part one is 
            <span *ngIf="partOneAnswer"> {{ partOneAnswer }} </span>
            <span *ngIf="!partOneAnswer"> ??? </span>
            
        </h3>
        <h1>Day 2, Part 2</h1>
        <p>{{ partTwoDescription }}</p>
        <h3>The answer to part two is 
            <span *ngIf="partTwoAnswer"> {{ partTwoAnswer }} </span>
            <span *ngIf="!partTwoAnswer"> ??? </span>

        </h3>    
        `
})

export class DayTwo {

    private _input:string = ``;

    public partOneDescription:string = ``;

    public partTwoDescription:string = ``;

    // public partOneAnswer;
    // public partTwoAnswer;

    constructor() {

    }

}