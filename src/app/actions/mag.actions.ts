import BigNumber from 'bignumber.js';
import {apiSendEvent} from './api.actions';

interface DragEvent extends MouseEvent, TouchEvent {}

function getScrollOffsets() {
  const doc = document,
    w = window;
  let x, y, docEl;

  if (typeof w.pageYOffset === 'number') {
    x = w.pageXOffset;
    y = w.pageYOffset;
  } else {
    docEl =
      doc.compatMode && doc.compatMode === 'CSS1Compat'
        ? doc.documentElement
        : doc.body;
    x = docEl.scrollLeft;
    y = docEl.scrollTop;
  }
  return {x: x, y: y};
}

function magScaleIncrease(state: Ace.State) {
  const {magScale, magScaleMax, magScaleStep} = state;
  const pScale = new BigNumber(magScale);

  if (pScale.plus(magScaleStep).gt(magScaleMax)) {
    return state;
  }

  const pScaleAdd = pScale.plus(magScaleStep).toFixed(1);

  console.log(pScaleAdd);

  return {
    ...state,
    magScale: pScaleAdd,
  };
}

function magScaleDecrease(state: Ace.State) {
  const {magScale, magScaleMin, magScaleStep} = state;
  const pScale = new BigNumber(magScale);

  if (pScale.minus(magScaleStep).lt(magScaleMin)) {
    return state;
  }

  const pScaleSub = pScale.minus(magScaleStep).toFixed(1);

  return {
    ...state,
    magScale: pScaleSub,
  };
}

function magWidthIncrease(state: Ace.State) {
  const {magWidthOffset, magWidth, magSizeChangeStep} = state;
  const currentPercentage = new BigNumber(magWidth)
    .dividedBy(window.innerWidth)
    .decimalPlaces(2)
    .toNumber();
  const newPercentage = currentPercentage + magSizeChangeStep;
  const newWidth = new BigNumber(window.innerWidth)
    .times(newPercentage)
    .decimalPlaces(0);

  if (newWidth.isGreaterThan(window.innerWidth - magWidthOffset)) {
    return state;
  }

  return {
    ...state,
    magWidth: newWidth.toString(),
  };
}

function magWidthDecrease(state: Ace.State) {
  const {magWidth, magSizeChangeStep, magWidthMin} = state;
  const currentPercentage = new BigNumber(magWidth)
    .dividedBy(window.innerWidth)
    .decimalPlaces(2)
    .toNumber();
  const newPercentage = currentPercentage - magSizeChangeStep;
  const newWidth = new BigNumber(window.innerWidth)
    .times(newPercentage)
    .decimalPlaces(0);

  if (newWidth.isLessThan(magWidthMin)) {
    return state;
  }

  return {
    ...state,
    magWidth: newWidth.toString(),
  };
}

function magHeightDecrease(state: Ace.State) {
  const {magHeight, magSizeChangeStep, magHeightMin} = state;
  const currentPercentage = new BigNumber(magHeight)
    .dividedBy(window.innerHeight)
    .decimalPlaces(2)
    .toNumber();
  const newPercentage = currentPercentage - magSizeChangeStep;
  const newHeight = new BigNumber(window.innerHeight)
    .times(newPercentage)
    .decimalPlaces(0);

  if (newHeight.isLessThan(magHeightMin)) {
    return state;
  }

  return {
    ...state,
    magHeight: newHeight.toString(),
  };
}

function magHeightIncrease(state: Ace.State) {
  const {magHeight, magSizeChangeStep, magHeightOffset} = state;
  const currentPercentage = new BigNumber(magHeight)
    .dividedBy(window.innerHeight)
    .decimalPlaces(2)
    .toNumber();
  const newPercentage = currentPercentage + magSizeChangeStep;
  const newHeight = new BigNumber(window.innerHeight)
    .times(newPercentage)
    .decimalPlaces(0);

  if (newHeight.isGreaterThan(window.innerHeight - magHeightOffset)) {
    return state;
  }

  return {
    ...state,
    magHeight: newHeight.toString(),
  };
}

function magMove(state: Ace.State, event: DragEvent) {
  const {
    magCanDrag,
    magPosX,
    magPosY,
    magMouseX,
    magMouseY,
    magScale,
    magBorder,
  } = state;

  if (!window.ace.mainElement) {
    return state;
  }

  const ev = event.touches ? event.touches[0] : event;
  const {clientX, clientY} = ev;
  const mag = window.ace.mainElement.querySelector('#ab-magnifier-window');
  const magPage = window.ace.mainElement.querySelector('#ab-magnifier-page');

  if (
    !magCanDrag ||
    !mag ||
    !magPage ||
    typeof magPosX === 'boolean' ||
    typeof magPosY === 'boolean'
  ) {
    return state;
  }

  if (!(magPage instanceof HTMLIFrameElement)) {
    return state;
  }

  if (!magPage.contentDocument) {
    return state;
  }

  if (magCanDrag) {
    event.preventDefault();
  }

  const rect = mag.getBoundingClientRect();
  const windowWidth = window.innerWidth - rect.width;
  const windowHeight = window.innerHeight - rect.height;
  let x = magPosX + (clientX - magMouseX);
  let y = magPosY + (clientY - magMouseY);

  let magMoveXAllowed = true;
  let magMoveYAllowed = true;

  if (x < 0) {
    x = 0;
    magMoveXAllowed = false;
  }

  if (x > windowWidth) {
    x = windowWidth;
    magMoveXAllowed = false;
  }

  if (y < 0) {
    y = 0;
    magMoveYAllowed = false;
  }

  if (y > windowHeight) {
    y = windowHeight;
    magMoveYAllowed = false;
  }

  // Anchor the position of the iframe to the top left corner of body
  const fixedX = -(x + magBorder);
  const fixedY = -(y + magBorder);

  const pScale = new BigNumber(magScale);

  // Get the distance between the middle point of the magnifier on the normal page and scaled page
  const pointX = x + rect.width / 2;
  const scaledPointX = pScale.times(pointX);
  const distanceX = scaledPointX.minus(pointX).toNumber();

  const pointY = y + rect.height / 2;
  const scaledPointY = pScale.times(pointY);
  const distanceY = scaledPointY.minus(pointY).toNumber();

  let pushMargin = false;

  if (pointY < rect.height * 0.6) {
    pushMargin = true;
    magPage.contentDocument.body.style.marginTop = `${rect.height / 4}px`;
  }

  if (pointX < rect.width * 0.6) {
    pushMargin = true;
    magPage.contentDocument.body.style.marginLeft = `${rect.width / 4}px`;
  }

  if (pointY > windowHeight + rect.height * 0.4) {
    pushMargin = true;
    magPage.contentDocument.body.style.marginBottom = `${rect.height / 4}px`;
  }

  if (pointX > windowWidth + rect.width * 0.4) {
    pushMargin = true;
    magPage.contentDocument.body.style.marginRight = `${rect.width / 4}px`;
  }

  if (!pushMargin) {
    magPage.contentDocument.body.style.marginTop = '0';
    magPage.contentDocument.body.style.marginRight = '0';
    magPage.contentDocument.body.style.marginBottom = '0';
    magPage.contentDocument.body.style.marginLeft = '0';
  }

  let magPosObj: {
    magMouseX?: number;
    magMouseY?: number;
    magPosX?: number;
    magPosY?: number;
  } = {
    magMouseX: clientX,
    magMouseY: clientY,
    magPosX: x,
    magPosY: y,
  };

  if (!magMoveYAllowed && !magMoveXAllowed) {
    magPosObj = {
      magPosX: x,
      magPosY: y,
    };
  }

  if (!magMoveXAllowed) {
    magPosObj = {
      magMouseY: clientY,
      magPosX: x,
      magPosY: y,
    };
  }

  if (!magMoveYAllowed) {
    magPosObj = {
      magMouseX: clientX,
      magPosX: x,
      magPosY: y,
    };
  }

  return {
    ...state,
    ...magPosObj,
    magPageX: fixedX,
    magPageY: fixedY,
    magTranslateX: -distanceX,
    magTranslateY: -distanceY,
  };
}

function magScroll(state: Ace.State) {
  const {magScale} = state;
  // We already know that this is a scroll event. Magnifier window does not move from it's current position, except for the back window being magnified
  // ab-icon will be used to position clientX and clientY
  const scrollOffsets = getScrollOffsets();

  if (!window.ace.mainElement) {
    return state;
  }

  const magPage = window.ace.mainElement.querySelector(
    '#ab-magnifier-page'
  ) as HTMLIFrameElement;

  if (!magPage || !magPage.contentWindow) {
    return state;
  }

  // convert string to BigNumber
  const pixelScaling = parseInt(magScale) || 1;
  // Ensure that scaling is taken into consideration
  magPage.contentWindow.scrollTo(
    scrollOffsets.x * pixelScaling,
    scrollOffsets.y * pixelScaling
  );
  return state;
}

function magUpdatePosition(state: Ace.State) {
  const {magBorder, magScale, magPosX, magPosY} = state;
  const magEl = document.getElementById('ab-magnifier-window');

  if (!window.ace.mainElement) {
    return state;
  }

  const magPage = window.ace.mainElement.querySelector('#ab-magnifier-page');

  if (!magEl || !magPage) {
    return state;
  }

  if (!(magPage instanceof HTMLIFrameElement)) {
    return state;
  }

  if (!magPage.contentDocument) {
    return state;
  }

  const elRect = magEl.getBoundingClientRect();

  if (magPosX === 0 && magPosY === 0) {
    // mag glass loads in the top left corner
    magPage.contentDocument.body.style.marginTop = `${elRect.height / 4}px`;
    magPage.contentDocument.body.style.marginLeft = `${elRect.width / 4}px`;

    return {
      ...state,
      magPageX: -magBorder,
      magPageY: -magBorder,
      magTranslateX: -(elRect.width / 4),
      magTranslateY: -(elRect.height / 4),
    };
  }

  const pScale = new BigNumber(magScale);

  const pointX = magPosX + elRect.width / 2;
  const scaledPointX = pScale.times(pointX);
  const distanceX = scaledPointX.minus(pointX).toNumber();

  const pointY = magPosY + elRect.height / 2;
  const scaledPointY = pScale.times(pointY);
  const distanceY = scaledPointY.minus(pointY).toNumber();

  return {
    ...state,
    magTranslateX: -distanceX,
    magTranslateY: -distanceY,
  };
}

function magAddPageContent(state: Ace.State) {
  let pageContent = document.documentElement.outerHTML;
  const abarEl = /<accessabar-app.*<\/accessabar-app>/;
  const abarScripts = /<script.*src=.*accessabar.*<\/script>/;

  pageContent = pageContent.replace(abarEl, '');
  pageContent = pageContent.replace(abarScripts, '');

  return {
    ...state,
    magPageContent: pageContent,
  };
}

function magToggle(state: Ace.State) {
  if (!state.magActive) {
    apiSendEvent('AceMagnifier_On');
  }

  return {
    magActive: !state.magActive,
  };
}

function magUpdateMousePosition(state: Ace.State, event: DragEvent) {
  const ev = event.touches ? event.touches[0] : event;

  const {clientX, clientY} = ev;

  return {
    ...state,
    magMouseX: clientX,
    magMouseY: clientY,
  };
}

function magUpdateSize(state) {
  if (!window.ace.mainElement) {
    return state;
  }

  const mag = window.ace.mainElement.querySelector(
    '#ab-magnifier-window'
  ) as HTMLElement;

  if (!mag || !document.defaultView) {
    return;
  }

  const newWidth = parseInt(
    document.defaultView.getComputedStyle(mag).width,
    10
  );
  const newHeight = parseInt(
    document.defaultView.getComputedStyle(mag).height,
    10
  );

  //  var startWidth = parseInt(mag.style.width);
  // //  var startHeight = parseInt(mag.style.height);
  // console.log('resize');
  // console.log('newWidth: ' + newWidth + ', newHeight: ' + newHeight);

  return {
    ...state,
    magWidth: newWidth,
    magHeight: newHeight,
  };
}

function magStartDrag(state: Ace.State, event: DragEvent) {
  event.preventDefault();
  // Check if this is a drag or resize event
  const x = event.target as HTMLElement;

  if (!x) {
    return state;
  }

  const magIcon = x.tagName === 'AB-MAG-RESIZE-ICON';

  return [
    magIcon
      ? {
          ...state,
          magCanDrag: false,
        }
      : {
          magCanDrag: true,
        },
    !magIcon && [
      (dispatch, props) => dispatch(props.action, props.event),
      {
        event,
        action: magUpdateMousePosition,
      },
    ],
  ];
}

function magStopDrag(state: Ace.State) {
  return {
    ...state,
    magCanDrag: false,
    magCanResize: false,
  };
}

export {
  magScaleIncrease,
  magScaleDecrease,
  magMove,
  magScroll,
  magAddPageContent,
  magHeightDecrease,
  magHeightIncrease,
  magStartDrag,
  magStopDrag,
  magToggle,
  magUpdateMousePosition,
  magUpdatePosition,
  magUpdateSize,
  magWidthDecrease,
  magWidthIncrease,
};
