import {aceResize} from '../actions/ace.actions';

function subResize() {
  return subResizeAce();
}

const resizeHandle: unknown[] = [];
const resizePassthrough = (dispatch, props) => {
  resizeHandle.length < 1 && resizeHandle.push(() => dispatch(props.action));

  return resizeHandle[0];
};

function subResizeAce() {
  return [
    (dispatch, props) => {
      window.addEventListener('resize', resizePassthrough(dispatch, props), {
        passive: true,
      });

      return () => {
        window.removeEventListener(
          'resize',
          resizePassthrough(dispatch, props)
        );
      };
    },
    {
      action: aceResize,
    },
  ];
}

export default subResize;
