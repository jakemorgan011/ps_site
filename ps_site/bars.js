// include the little bar scrolling code here

class PipeAnimator {
  constructor(pSelect, options = {}){
    this.p = document.querySelector(pSelect);
    this.intervalId = null;
    this.currentSize = {width: 0, height: 0};
    this.settings = {
      maxLength: 30, // since text keep it smaller
      minLength: 0, // 0 means no text
      interval: 100, //ms
      ...options
    };
    // could use phase to make them have different starting points
    this.phase = 0;
    this.text;
    this.vel = 1;

    if (!this.p){
      throw new Error('no paragraph with selector "${pSelect}" found');
    }
  }
  start(){ // somewhere in here there is a undefined problem
    this.initialize();
    this.intervalId = setInterval(() => {
      this.animatePipe();
    }, this.settings.interval);
  }

  animatePipe(){
    const currentStr = this.p.textContent; 
    const currentLength = currentStr.length;
    console.log(currentLength, "length");
    if(this.vel == 1){
      this.text = currentStr;
      this.text += '|';
      this.p.textContent = this.text;
      if(currentLength > this.settings.maxLength){
        this.vel *= -1;
      }
    }
    // using the if logic is kinda wack here but it kinda works.
    if(this.vel == -1){
      this.text = currentStr;
      // should pop off the last pipe
      this.p.textContent = this.text.slice(0,-1);
      if(currentLength <= this.settings.minLength + 1){
        this.vel *= -1;
      }
    } 
  }
  initialize(){
    if(this.phase < 1){
      this.p.textContent = '';
    }
    else{
      for(let i = 0; i<this.phase; i++){
        this.text += '|';
      } 
      this.p.textContent = this.text;
    }
  }
}

// i am sorry if you are reading this.
// i've never done webdev and idk how to make this dynamic
// this is the best i got.

const MS_INTERVAL = 20;
const MAX_LENGTH = 30;

document.addEventListener('DOMContentLoaded',() => {
  const pipeAnimator = new PipeAnimator('#p0',{
    maxLength: MAX_LENGTH,
    minLength: 0,
    interval: MS_INTERVAL 
  });
  pipeAnimator.phase = 1;
  pipeAnimator.start();
});

document.addEventListener('DOMContentLoaded',() => {
  const pipeAnimator = new PipeAnimator('#p1',{
    maxLength: MAX_LENGTH,
    minLength: 0,
    interval: MS_INTERVAL
  });
  pipeAnimator.phase = 2;
  pipeAnimator.start();
});

document.addEventListener('DOMContentLoaded',() => {
  const pipeAnimator = new PipeAnimator('#p2',{
    maxLength: MAX_LENGTH,
    minLength: 0,
    interval: MS_INTERVAL
  });
  pipeAnimator.phase = 3;
  pipeAnimator.start();
});

document.addEventListener('DOMContentLoaded',() => {
  const pipeAnimator = new PipeAnimator('#p3',{
    maxLength: MAX_LENGTH,
    minLength: 0,
    interval: MS_INTERVAL
  });
  pipeAnimator.phase = 4;
  pipeAnimator.start();
});

document.addEventListener('DOMContentLoaded',() => {
  const pipeAnimator = new PipeAnimator('#p4',{
    maxLength: MAX_LENGTH,
    minLength: 0,
    interval: MS_INTERVAL
  });
  pipeAnimator.phase = 5;
  pipeAnimator.start();
});

document.addEventListener('DOMContentLoaded',() => {
  const pipeAnimator = new PipeAnimator('#p5',{
    maxLength: MAX_LENGTH,
    minLength: 0,
    interval: MS_INTERVAL
  });
  pipeAnimator.phase = 6;
  pipeAnimator.start();
});


document.addEventListener('DOMContentLoaded',() => {
  const pipeAnimator = new PipeAnimator('#split1',{
    maxLength: MAX_LENGTH * 4,
    minLength: 0,
    interval: MS_INTERVAL/2
  });
  pipeAnimator.phase = 15;
  pipeAnimator.start();
});

// lol oops all hard coded :3