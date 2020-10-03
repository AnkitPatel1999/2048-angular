import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  squares: number[] = new Array(16);
  width = 4;

  constructor() {
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i] = null;

    }
    console.log(this.squares);
    
    this.generateRandomNumber();
    this.generateRandomNumber();
   }

  ngOnInit(): void {

  }

  generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * this.squares.length);
    
  //  console.log(this.squares.splice(randomNumber, 0 , 2));
    if (this.squares[randomNumber] === null) {
      console.log(randomNumber);
      this.squares[randomNumber]=2;
    }else {
      this.generateRandomNumber();
    }
  }

  moveRight() {
    for (let i = 0; i < this.squares.length; i++) {
      if (i % 4 === 0) {
        const totalOne = this.squares[i];
        const totalTwo = this.squares[i + 1];
        const totalThree = this.squares[i + 2];
        const totalFour = this.squares[i + 3];

        const row = [totalOne, totalTwo, totalThree, totalFour];
        // console.log(row);

        const filteredRow = row.filter(num => num);
        // console.log(filteredRow);
        const missing = 4 - filteredRow.length;
       // console.log(missing +' '+ filteredRow.length);
        const zeros = Array(missing).fill(null);
        // console.log(zeros);
        const newRow = zeros.concat(filteredRow);
        // console.log(newRow);
        this.squares[i] = newRow[0];
        this.squares[i + 1] = newRow[1];
        this.squares[i + 2] = newRow[2];
        this.squares[i + 3] = newRow[3];

        // console.log(this.squares[i+3]);
      }
    }
  }

  // swipe left
  moveLeft() {
    for (let i = 0; i < this.squares.length; i++) {
      if (i % 4 === 0) {
        const totalOne = this.squares[i];
        const totalTwo = this.squares[i + 1];
        const totalThree = this.squares[i + 2];
        const totalFour = this.squares[i + 3];

        const row = [totalOne, totalTwo, totalThree, totalFour];
        // console.log(row);

        const filteredRow = row.filter(num => num);
        // console.log(filteredRow);
        const missing = 4 - filteredRow.length;
       // console.log(missing +' '+ filteredRow.length);
        const zeros = Array(missing).fill(null);
        // console.log(zeros);
        const newRow = filteredRow.concat(zeros);
       // console.log(newRow);
        this.squares[i] = newRow[0];
        this.squares[i + 1] = newRow[1];
        this.squares[i + 2] = newRow[2];
        this.squares[i + 3] = newRow[3];

        // console.log(this.squares[i+3]);
      }
    }
  }

  moveDown() {
    for (let i = 0; i < 4; i++) {
      const totalOne = this.squares[i];
      const totalTwo = this.squares[i + this.width];
      const totalThree = this.squares[i + (this.width * 2)];
      const totalFour = this.squares[i + (this.width * 3)];
      const column = [totalOne, totalTwo, totalThree, totalFour];

      const filteredColumn = column.filter(num => num);
      const missing = 4 - filteredColumn.length;
      const zeros = Array(missing).fill(null);
      const newColumn = zeros.concat(filteredColumn);

     // console.log(newColumn);
      this.squares[i] = newColumn[0];
      this.squares[i + this.width] = newColumn[1];
      this.squares[i + (this.width * 2)] = newColumn[2];
      this.squares[i + (this.width * 3)] = newColumn[3];

    }
  }

  moveUp() {
    for (let i = 0; i < 4; i++) {
      const totalOne = this.squares[i];
      const totalTwo = this.squares[i + this.width];
      const totalThree = this.squares[i + (this.width * 2)];
      const totalFour = this.squares[i + (this.width * 3)];
      const column = [totalOne, totalTwo, totalThree, totalFour];

      const filteredColumn = column.filter(num => num);
      const missing = 4 - filteredColumn.length;
      const zeros = Array(missing).fill(null);
      const newColumn = filteredColumn.concat(zeros);

      // console.log(newColumn);
      this.squares[i] = newColumn[0];
      this.squares[i + this.width] = newColumn[1];
      this.squares[i + (this.width * 2)] = newColumn[2];
      this.squares[i + (this.width * 3)] = newColumn[3];

    }
  }

  combineRow() {
    for (let i = 0; i < 15; i++) {
      if (this.squares[i] === this.squares[i + 1]) {
        const total = this.squares[i] + this.squares[i + 1];
        this.squares[i] = total;
        this.squares[i + 1] = 0;
        
      }
    }
  }

  combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (this.squares[i] === this.squares[i + this.width]) {
        const total = this.squares[i] + this.squares[i + this.width];
        this.squares[i] = total;
        this.squares[i + this.width] = 0;
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 39) {
      this.moveRight();
      this.combineRow();
      this.moveRight();
      this.generateRandomNumber();

    }else if (event.keyCode ===  37) {
      this.moveLeft();
      this.combineRow();
      this.moveLeft();
      this.generateRandomNumber();
    }else if (event.keyCode === 38) {
      this.moveUp();
      this.combineColumn();
      this.moveUp();
      this.generateRandomNumber();

    }else if (event.keyCode === 40) {
      this.moveDown();
      this.combineColumn();
      this.moveDown();
      this.generateRandomNumber();
    }

  }


}

