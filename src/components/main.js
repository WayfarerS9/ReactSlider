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
  let touchPosition = null;

  const [indexOfPreviousSlide, setIndexOfPreviousSlide] = useState(arrOfPictures.length - 1)
  const [indexOfFirstSlide, setIndexOfFirstSlide] = useState(0)
  const [indexOfSecondSlide, setIndexOfSecondSlide] = useState(1)
  const [indexOfThirdSlide, setIndexOfThirdSlide] = useState(2)
  const [indexOfFourthSlide, setIndexOfFourthSlide] = useState(3)

  const handleTouchStart = ($event) => {
    touchPosition = $event.touches[0].clientX
  }

  const handleTouchMove = ($event) => {
    const toucheDown = touchPosition

    if(toucheDown === null) {
      return
    }

    const currentTouch = $event.touches[0].clientX;
    const diff = toucheDown - currentTouch;

    if(diff > 10) {
      moveForwardSlide()
    }
    if(diff < -10) {
      moveBackSlide()
    }
    touchPosition = null;
  }

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

      setValueAfterMoveForward(indexOfFirstSlide, setIndexOfFirstSlide);
      setValueAfterMoveForward(indexOfSecondSlide, setIndexOfSecondSlide);
      setValueAfterMoveForward(indexOfThirdSlide, setIndexOfThirdSlide);
      setValueAfterMoveForward(indexOfPreviousSlide, setIndexOfPreviousSlide);

      if (slideRefs.length > 3) {
        setValueAfterMoveForward(indexOfFourthSlide, setIndexOfFourthSlide);
      }
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

      setValueAfterMoveForward(indexOfFirstSlide, setIndexOfFirstSlide);
      setValueAfterMoveForward(indexOfSecondSlide, setIndexOfSecondSlide);
    });
  }

  function setValueAfterMoveForward(indexOfSlide, setNewIndex) {
    let result = (indexOfSlide += 1);
    if (result > slideRefs.length - 1) {
      setNewIndex(result - slideRefs.length);
    } else {
      setNewIndex(result);
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

      setValueAfterMoveBack(indexOfFirstSlide, setIndexOfFirstSlide);
      setValueAfterMoveBack(indexOfSecondSlide, setIndexOfSecondSlide);
      setValueAfterMoveBack(indexOfThirdSlide, setIndexOfThirdSlide);
      setValueAfterMoveBack(indexOfFourthSlide, setIndexOfFourthSlide);
      setValueAfterMoveBack(indexOfPreviousSlide, setIndexOfPreviousSlide);
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

      setValueAfterMoveBack(indexOfFirstSlide, setIndexOfFirstSlide);
      setValueAfterMoveBack(indexOfSecondSlide, setIndexOfSecondSlide);
    });
  }

  function setValueAfterMoveBack(indexOfSlide, setNewIndex) {
    let result = (indexOfSlide -= 1);
    if (result < 0) {
      setNewIndex(slideRefs.length + result);
    } else {
      setNewIndex(result);
    }
  }



  return (
    <>
      <div className="slides" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>{template}</div>
      <div className="sliderArrows">
        <button type="button" className="button prev" onClick={moveBackSlide}>
          &larr;
        </button>
        <button
          type="button"
          className="button next"
          onClick={moveForwardSlide}
        >
          &rarr;
        </button>

      </div>
    </>
  );
};

export default Main;
