import React, { useState } from 'react';
import classNames from "classnames";

let arrOfPictures = [
  "../img/1.jpg",
  "../img/2.jpg",
  "../img/2.jpg",
  "../img/2.jpg",
  "../img/2.jpg",
];

let Main = () => {
  const slideRefs = [];

  const [touchPosition, setTouchPosition] = useState(null)


  const handleTouchSTart = ($event) => {
    const toucheDown = $event.touches[0].clientX
    setTouchPosition(toucheDown)

  }

  const handleTouchMove = ($event) => {
    const toucheDown = touchPosition

    if(toucheDown === null) {
      return
    }

    const currentTouch = $event.touches[0].clientX;
    const diff = toucheDown - currentTouch

    if(diff > 5) {
      moveForwardSlide()
    }
    if(diff < -5) {
      moveBackSlide()
    }

    setTouchPosition(null)
  }

  let indexOfPreviousSlide = arrOfPictures.length - 1;
  let indexOfFirstSlide = 0;
  let indexOfSecondSlide = 1;
  let indexOfThirdSlide = 2;
  let indexOfFourthSlide = 3;

  const [isButtonBlock, setBlockBUtton] = useState(false)

  function createSlideRefs(slide) {
    let slideRef = slide;
    slideRefs.push(slideRef);
  }

  let template = arrOfPictures.map((element, index) => {
    return (
      <div
        className={classNames({
          slide: true,
          selectedSlide: index === 0,
          secondSlide: index === 1,
          thirdSlide: index === 2,
        })}
        key={index}
        ref={createSlideRefs}
      ></div>
    );
  });

  function moveForwardSlide() {
    if (slideRefs.length === 2) {
      moveForwardSlidesOfTwoElemets();
      return;
    }    


    let promiseOfFirstSlide = new Promise((resolve, reject) => {
      slideRefs[indexOfFirstSlide].addEventListener(
        "animationend",
        function handler() {
          slideRefs[indexOfFirstSlide].removeEventListener(
            "animationend",
            handler
          );
          resolve();
        }
      );
    });

    let promiseOfSecondSlide = new Promise((resolve, reject) => {
      slideRefs[indexOfSecondSlide].addEventListener(
        "animationend",
        function handler() {
          slideRefs[indexOfSecondSlide].removeEventListener(
            "animationend",
            handler
          );
          resolve();
        }
      );
    });

    let promiseOfThirdSlide = new Promise((resolve, reject) => {
      slideRefs[indexOfThirdSlide].addEventListener(
        "animationend",
        function handler() {
          slideRefs[indexOfThirdSlide].removeEventListener(
            "animationend",
            handler
          );
          resolve();
        }
      );
    });

    let arrOfPromises = [
      promiseOfFirstSlide,
      promiseOfSecondSlide,
      promiseOfThirdSlide,
    ];

    slideRefs[indexOfFirstSlide].classList.add("selectedSlideMoveOut");
    slideRefs[indexOfSecondSlide].classList.add("secondSlideMoveOut");
    slideRefs[indexOfThirdSlide].classList.add("thirdSlideMoveOut");

    Promise.allSettled(arrOfPromises).then(() => {
      slideRefs[indexOfFirstSlide].classList.remove(
        "selectedSlideMoveOut",
        "selectedSlide"
      );
      slideRefs[indexOfSecondSlide].classList.remove(
        "secondSlide",
        "secondSlideMoveOut"
      );
      slideRefs[indexOfThirdSlide].classList.remove(
        "thirdSlide",
        "thirdSlideMoveOut"
      );

      slideRefs[indexOfSecondSlide].classList.add("selectedSlide");
      slideRefs[indexOfThirdSlide].classList.add("secondSlide");

      if (slideRefs.length > 3) {
        slideRefs[indexOfFourthSlide].classList.add("thirdSlide");
      } else {
        slideRefs[indexOfFirstSlide].classList.add("thirdSlide");
      }

      indexOfFirstSlide = setValueAfterMoveForward(indexOfFirstSlide);
      indexOfSecondSlide = setValueAfterMoveForward(indexOfSecondSlide);
      indexOfThirdSlide = setValueAfterMoveForward(indexOfThirdSlide);
      indexOfPreviousSlide = setValueAfterMoveForward(indexOfPreviousSlide);

      if (slideRefs.length > 3) {
        indexOfFourthSlide = setValueAfterMoveForward(indexOfFourthSlide);
      }
      console.log('hello')
    });
  }

  function moveForwardSlidesOfTwoElemets() {
    let promiseOfFirstSlide = new Promise((resolve, reject) => {
      slideRefs[indexOfFirstSlide].addEventListener(
        "animationend",
        function handler() {
          slideRefs[indexOfFirstSlide].removeEventListener(
            "animationend",
            handler
          );
          resolve();
        }
      );
    });

    let promiseOfSecondSlide = new Promise((resolve, reject) => {
      slideRefs[indexOfSecondSlide].addEventListener(
        "animationend",
        function handler() {
          slideRefs[indexOfSecondSlide].removeEventListener(
            "animationend",
            handler
          );
          resolve();
        }
      );
    });

    let arrOfPromises = [promiseOfFirstSlide, promiseOfSecondSlide];

    slideRefs[indexOfFirstSlide].classList.add(
      "selectedSlideMoveOutIfTwoSlides"
    );
    slideRefs[indexOfSecondSlide].classList.add("secondSlideMoveOut");

    Promise.allSettled(arrOfPromises).then(() => {
      slideRefs[indexOfFirstSlide].classList.remove(
        "selectedSlideMoveOutIfTwoSlides",
        "selectedSlide"
      );
      slideRefs[indexOfSecondSlide].classList.remove(
        "secondSlideMoveOut",
        "secondSlide"
      );
      slideRefs[indexOfFirstSlide].classList.add("secondSlide");
      slideRefs[indexOfSecondSlide].classList.add("selectedSlide");

      indexOfFirstSlide = setValueAfterMoveForward(indexOfFirstSlide);
      indexOfSecondSlide = setValueAfterMoveForward(indexOfSecondSlide);
    });
  }

  function setValueAfterMoveForward(indexOfSlide) {
    let result = (indexOfSlide += 1);
    if (result > slideRefs.length - 1) {
      return result - slideRefs.length;
    } else {
      return result;
    }
  }

  function moveBackSlide() {
    if (slideRefs.length === 2) {
      moveBackSlideIfTwoElements();
      return;
    }

    let promiseOfPreviousSlide = new Promise((resolve, reject) => {
      slideRefs[indexOfPreviousSlide].addEventListener(
        "animationend",
        function handler() {
          slideRefs[indexOfPreviousSlide].removeEventListener(
            "animationend",
            handler
          );
          resolve();
        }
      );
    });

    let promiseOfSelectedSlide = new Promise((resolve, reject) => {
      slideRefs[indexOfFirstSlide].addEventListener(
        "animationend",
        function handler() {
          slideRefs[indexOfFirstSlide].removeEventListener(
            "animationend",
            handler
          );
          resolve();
        }
      );
    });

    let promiseOfSecondSlide = new Promise((resolve, reject) => {
      slideRefs[indexOfSecondSlide].addEventListener(
        "animationend",
        function handler() {
          slideRefs[indexOfSecondSlide].removeEventListener(
            "animationend",
            handler
          );
          resolve();
        }
      );
    });

    let arrOfPromises = [
      promiseOfPreviousSlide,
      promiseOfSelectedSlide,
      promiseOfSecondSlide,
    ];

    slideRefs[indexOfPreviousSlide].classList.add(
      "previousSlideMoveBack",
      "selectedSlide"
    );
    slideRefs[indexOfFirstSlide].classList.add(
      "selectedSlideMoveBack",
      "secondSlide"
    );
    slideRefs[indexOfSecondSlide].classList.add(
      "secondSlideMoveBack",
      "thirdSlide"
    );
    slideRefs[indexOfThirdSlide].classList.remove("thirdSlide");

    Promise.allSettled(arrOfPromises).then(() => {
      slideRefs[indexOfPreviousSlide].classList.remove("previousSlideMoveBack");
      slideRefs[indexOfFirstSlide].classList.remove(
        "selectedSlideMoveBack",
        "selectedSlide"
      );
      slideRefs[indexOfSecondSlide].classList.remove(
        "secondSlideMoveBack",
        "secondSlide"
      );

      indexOfFirstSlide = setValueAfterMoveBack(indexOfFirstSlide);
      indexOfSecondSlide = setValueAfterMoveBack(indexOfSecondSlide);
      indexOfThirdSlide = setValueAfterMoveBack(indexOfThirdSlide);
      indexOfFourthSlide = setValueAfterMoveBack(indexOfFourthSlide);
      indexOfPreviousSlide = setValueAfterMoveBack(indexOfPreviousSlide);
    });
  }

  function moveBackSlideIfTwoElements() {
    let promiseOfSelectedSlide = new Promise((resolve, reject) => {
      slideRefs[indexOfFirstSlide].addEventListener(
        "animationend",
        function handler() {
          slideRefs[indexOfFirstSlide].removeEventListener(
            "animationend",
            handler
          );
          resolve();
        }
      );
    });

    let promiseOfSecondSlide = new Promise((resolve, reject) => {
      slideRefs[indexOfSecondSlide].addEventListener(
        "animationend",
        function handler() {
          slideRefs[indexOfSecondSlide].removeEventListener(
            "animationend",
            handler
          );
          resolve();
        }
      );
    });

    let arrOfPromises = [promiseOfSelectedSlide, promiseOfSecondSlide];

    slideRefs[indexOfFirstSlide].classList.add(
      "selectedSlideMoveBack",
      "secondSlide"
    );
    slideRefs[indexOfSecondSlide].classList.add(
      "secondSlideMoveBackIfTwoElements",
      "selectedSlide"
    );

    Promise.allSettled(arrOfPromises).then(() => {
      slideRefs[indexOfFirstSlide].classList.remove(
        "selectedSlideMoveBack",
        "selectedSlide"
      );
      slideRefs[indexOfSecondSlide].classList.remove(
        "secondSlideMoveBackIfTwoElements",
        "secondSlide"
      );

      indexOfFirstSlide = setValueAfterMoveBack(indexOfFirstSlide);
      indexOfSecondSlide = setValueAfterMoveBack(indexOfSecondSlide);
    });
  }

  function setValueAfterMoveBack(indexOfSlide) {
    let result = (indexOfSlide -= 1);
    if (result < 0) {
      return slideRefs.length + result;
    } else {
      return result;
    }
  }

  function show() {
    console.log(slideRefs)
    console.log(indexOfPreviousSlide)
    console.log(indexOfFirstSlide)
    console.log(indexOfSecondSlide)
    console.log(indexOfThirdSlide)
    console.log(indexOfFourthSlide)
  }

  return (
    <>
      <div className="slides" onTouchStart={handleTouchSTart} onTouchMove={handleTouchMove}>{template}</div>
      <div className="sliderArrows">
        <button type="button" className="button prev" onClick={!isButtonBlock ? moveBackSlide : undefined}>
          &larr;
        </button>
        <button
          type="button"
          className="button next"
          onClick={!isButtonBlock ? moveForwardSlide : undefined}
        >
          &rarr;
        </button>
        <button onClick={show}>DISPLAY</button>

      </div>
    </>
  );
};

export default Main;
