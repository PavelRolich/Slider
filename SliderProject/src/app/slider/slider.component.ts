import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  imageList = [
    { imgURL: '../assets/1.jpg', title: 0 },
    { imgURL: '../assets/2.jpg', title: 1 },
    { imgURL: '../assets/3.jpg', title: 2 },
    { imgURL: '../assets/4.jpg', title: 3 },
    { imgURL: '../assets/5.jpg', title: 4 },
  ];
  selectedImg = this.imageList[0];
  intervalID: any;
  timerID: any;
  generator: any;
  pauseNum = 0;

  constructor() { }

  ngOnInit() {
    this.generator = function*(imgList) {
      let i = this.pauseNum;
      const length = imgList.length;
      while (true) {
        yield imgList[i];
        i++;
        if (i === length) {
          i = 0;
        }
      }
    };
    this.setIntervalMethod();
  }

  onClickLeft() {
    console.log('It\'s alive');
    clearInterval(this.intervalID);
    clearTimeout(this.timerID);
    if (this.pauseNum - 1 === -1) {
      this.pauseNum = this.imageList.length - 1;
    } else {
      this.pauseNum--;
    }
    this.selectedImg = this.imageList[this.pauseNum];
    this.timerID = setTimeout(() => {
      this.setIntervalMethod();
    }, 5000);
  }

  onClickRight() {
    console.log('It\'s alive');
    clearInterval(this.intervalID);
    clearTimeout(this.timerID);
    if (this.pauseNum + 1 === this.imageList.length) {
      this.pauseNum = 0;
    } else {
      this.pauseNum++;
    }
    this.selectedImg = this.imageList[this.pauseNum];
    this.timerID = setTimeout(() => {
      this.setIntervalMethod();
    }, 5000);
  }

  setIntervalMethod() {
    const imgLoop = this.generator(this.imageList);
    this.intervalID = setInterval(() => {
      this.selectedImg = imgLoop.next().value;
      this.pauseNum = this.selectedImg.title;
    }, 2000);
  }
}
