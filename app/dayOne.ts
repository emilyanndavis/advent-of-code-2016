import { Component } from '@angular/core';

import { BlocksByDirection, Step, XYCoordinates } from './models/models';

@Component({
    selector: 'day-one',
    template: `
        <h1>Day 1, Part 1</h1>
        <p>{{ partOneDescription }}</p>
        <h3>You are
            <span *ngIf="partOneAnswer"> {{ partOneAnswer }} </span>
            <span *ngIf="!partOneAnswer"> ??? </span>
            blocks from your destination.
        </h3>
        <h1>Day 1, Part 2</h1>
        <p>{{ partTwoDescription }}</p>
        <h3>Taking into account the instructions on the back of the document, you are
            <span *ngIf="partTwoAnswer"> {{ partTwoAnswer }} </span>
            <span *ngIf="!partTwoAnswer"> ??? </span>
            blocks from your destination.    
        </h3>
        `
})
export class DayOne  { 

    private _input:string = 'R4, R3, L3, L2, L1, R1, L1, R2, R3, L5, L5, R4, L4, R2, R4, L3, R3, L3, R3, R4, R2, L1, R2, L3, L2, L1, R3, R5, L1, L4, R2, L4, R3, R1, R2, L5, R2, L189, R5, L5, R52, R3, L1, R4, R5, R1, R4, L1, L3, R2, L2, L3, R4, R3, L2, L5, R4, R5, L2, R2, L1, L3, R3, L4, R4, R5, L1, L1, R3, L5, L2, R76, R2, R2, L1, L3, R189, L3, L4, L1, L3, R5, R4, L1, R1, L1, L1, R2, L4, R2, L5, L5, L5, R2, L4, L5, R4, R4, R5, L5, R3, L1, L3, L1, L1, L3, L4, R5, L3, R5, R3, R3, L5, L5, R3, R4, L3, R3, R1, R3, R2, R2, L1, R1, L3, L3, L3, L1, R2, L1, R4, R4, L1, L1, R3, R3, R4, R1, L5, L2, R2, R3, R2, L3, R4, L5, R1, R4, R5, R4, L4, R1, L3, R1, R3, L2, L3, R1, L2, R3, L3, L1, L3, R4, L4, L5, R3, R5, R4, R1, L2, R3, R5, L5, L4, L1, L1';

    public partOneDescription:string = `--- Day 1: No Time for a Taxicab ---
    You're airdropped near Easter Bunny Headquarters in a city somewhere. "Near", unfortunately, is as close as you can get - the instructions on the Easter Bunny Recruiting Document the Elves intercepted start here, and nobody had time to work them out further.
    The Document indicates that you should start at the given coordinates (where you just landed) and face North. Then, follow the provided sequence: either turn left (L) or right (R) 90 degrees, then walk forward the given number of blocks, ending at a new intersection.
    There's no time to follow such ridiculous instructions on foot, though, so you take a moment and work out the destination. Given that you can only walk on the street grid of the city, how far is the shortest path to the destination?`;

    public partTwoDescription:string = `Then, you notice the instructions continue on the back of the Recruiting Document. Easter Bunny HQ is actually at the first location you visit twice. For example, if your instructions are R8, R4, R4, R8, the first location you visit twice is 4 blocks away, due East. How many blocks away is the first location you visit twice?`;
    
    public partOneAnswer:number;
    public partTwoAnswer:number;

    private _direction:string;

    private _directions:string[] = [
        'north', 
        'east', 
        'south', 
        'west'
    ];

    private _blocksToTravel:BlocksByDirection = {
        'north': 0,
        'east': 0,
        'south': 0,
        'west': 0
    };

    private _updateCoords:any = {
        'north': this._addToY,
        'east': this._addToX,
        'south': this._subtractFromY,
        'west': this._subtractFromX
    };

    private _currentCoords:XYCoordinates = { x: 0, y: 0 };
    private _uniqueCoords:Map<string, boolean> = new Map();   // used for storing every location visited
    private _repeatCoords:XYCoordinates;   // the first location visited twice

    private _steps:Step[];

    constructor() {
        this._direction = this._directions[0];
        this._uniqueCoords.set(`${this._currentCoords.x},${this._currentCoords.y}`, true);
        // console.log(`unique coords: `, this._uniqueCoords);
        this._steps = this._parseInput();
        this._walkTheWalk();
    }

    // 1. parse input into steps
    private _parseInput():Step[] {
        let steps:Step[] = [];
        this._input.split(', ').forEach( stepStr => {
            let step = new Step();
            step.turn = stepStr[0];
            step.blocks = +stepStr.slice(1);
            steps.push(step);
        });
        return steps;
    }

    // 2. for each step, determine new direction and number of blocks to travel
    private _walkTheWalk():void {
        // get new direction
        this._steps.forEach( step => {
            let dirIndex:number = this._directions.indexOf(this._direction);
            if (step.turn === 'R') {
                if (dirIndex === 3) {
                  this._direction = this._directions[0];
                } else {
                  this._direction = this._directions[dirIndex + 1];
                }
            } else {
               if (dirIndex === 0) {
                  this._direction = this._directions[3];
                } else {
                  this._direction = this._directions[dirIndex - 1];
                }
            }
            // add number of blocks
            this._blocksToTravel[this._direction] += step.blocks;
            // update coordinates & check to see if we've been here before (for part two answer)
            if (!this.partTwoAnswer) {
                this._trackCoords(step.blocks);
            }
        });
        // get total distance (for part one answer)
        this._getDistance();
    }

    // 2b. for each block traveled, log the new coordinates and watch for a repeat
    private _trackCoords(blocks:number):void {
        for (let i = 1; i <= blocks; i++) {
          // console.log(`tracking coordinates...`);
          // get new coordinates
          let newCoords = this._updateCoords[this._direction](this._currentCoords);
          console.log(`updated coordinates: `, newCoords);
          // console.log(`unique coordinates: `, this._uniqueCoords);
          // stringify newCoords
          let newCoordsStr = `${newCoords.x},${newCoords.y}`;
          if (this._uniqueCoords.has(newCoordsStr)) {
              // if newCoordsStr is in _uniqueCoords, set _repeatCoords to newCoords
              console.log(`these coordinates are already in the map: `, newCoords);
              this._repeatCoords = newCoords;
              this.partTwoAnswer = Math.abs(this._repeatCoords.x) + Math.abs(this._repeatCoords.y);
              return;
          } else {
              // if newCoordsStr is not in _uniqueCoords, add it and set _currentCoords to newCoords
              // console.log(`adding these coordinates to the map: `, newCoords);
              this._uniqueCoords.set(newCoordsStr, true);
              this._currentCoords = newCoords;
          }
        }
    }

    // 3. calculate distance
    private _getDistance():void {
        this.partOneAnswer = Math.abs(this._blocksToTravel['north'] - this._blocksToTravel['south']) + Math.abs(this._blocksToTravel['east'] - this._blocksToTravel['west']);
    }

    // for updating coordinates
    private _addToY(coords:XYCoordinates):XYCoordinates {
        coords.y += 1;
        return coords;
    }
    private _addToX(coords:XYCoordinates):XYCoordinates {
        coords.x += 1;
        return coords;
    }
    private _subtractFromY(coords:XYCoordinates):XYCoordinates {
        coords.y -= 1;
        return coords;
    }
    private _subtractFromX(coords:XYCoordinates):XYCoordinates {
        coords.x -= 1;
        return coords;
    }

}
