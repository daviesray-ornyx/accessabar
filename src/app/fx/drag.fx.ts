const dragHandle: unknown[] = [];
const dragPassthrough = (dispatch, props) => {
  dragHandle.length < 1 &&
    dragHandle.push(event => dispatch(props.action, event));

  return dragHandle[0];
};

function fxDragStartMouseEvents(state: Ace.State) {
  return (
    !state.dragActive && [
      (dispatch, props) => {
        document.addEventListener(
          'mousemove',
          dragPassthrough(dispatch, props)
        );
        document.addEventListener(
          'touchmove',
          dragPassthrough(dispatch, props)
        );
      },
      {
        action: (state, event) => {
          const ev = event.touches ? event.touches[0] : event;
          const {clientX, clientY} = ev;

          event.preventDefault();

          return {
            ...state,
            dragActive: true,
            dragMouseX: clientX,
            dragMouseY: clientY,
          };
        },
      },
    ]
  );
}

function fxDragStopMouseEvents() {
  return [
    (dispatch, props) => {
      dispatch(props.action);
      document.removeEventListener('mousemove', dragHandle[0]);
      document.removeEventListener('touchmove', dragHandle[0]);
    },
    {
      action: state => {
        return {
          ...state,
          dragMouseX: 0,
          dragMouseY: 0,
          dragActive: false,
        };
      },
    },
  ];
}

export {fxDragStartMouseEvents, fxDragStopMouseEvents};
