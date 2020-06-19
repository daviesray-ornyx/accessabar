import {menuMove} from '../actions/menu.actions';

function subMenu(state: Ace.State) {
  return [menuEnable(state), menuMoveSub(state)];
}

function menuEnable(state: Ace.State) {
  const menuPassthrough = (event, dispatch, props) =>
    dispatch(props.action, event);
  const menuDragPassthrough = (event, dispatch, props) =>
    dispatch(props.action, event);
  return Object.keys(state.menus).length > 1
    ? [
        [
          (dispatch, props) => {
            document.addEventListener(
              'mousemove',
              menuPassthrough.bind(null, dispatch, props)
            );
            document.addEventListener(
              'touchmove',
              menuPassthrough.bind(null, dispatch, props)
            );
          },
          {
            action: (state, event) => {
              const ev = event.touches ? event.touches[0] : event;
              const {clientX, clientY} = ev;

              return {
                ...state,
                menusMouseX: clientX,
                menusMouseY: clientY,
              };
            },
          },
        ],
        [
          (dispatch, props) => {
            document.addEventListener(
              'mouseup',
              menuDragPassthrough.bind(null, dispatch, props)
            );
            document.addEventListener(
              'touchcancel',
              menuDragPassthrough.bind(null, dispatch, props)
            );
            document.addEventListener(
              'touchend',
              menuDragPassthrough.bind(null, dispatch, props)
            );
          },
          {
            action: (state, _) => ({
              ...state,
              menusCanDrag: false,
              menuDragActive: '',
            }),
          },
        ],
      ]
    : [
        (dispatch, props) => {
          dispatch(props.action);
          document.removeEventListener(
            'mousemove',
            menuPassthrough.bind(null, dispatch, props)
          );
          document.removeEventListener(
            'touchmove',
            menuPassthrough.bind(null, dispatch, props)
          );

          document.removeEventListener(
            'mouseup',
            menuDragPassthrough.bind(null, dispatch, props)
          );
          document.removeEventListener(
            'touchcancel',
            menuDragPassthrough.bind(null, dispatch, props)
          );
          document.removeEventListener(
            'touchend',
            menuDragPassthrough.bind(null, dispatch, props)
          );
        },
        {
          action: state => ({
            ...state,
            menusCanDrag: false,
            menusMouseX: 0,
            menusMouseY: 0,
          }),
        },
      ];
}

function menuMoveSub(state: Ace.State) {
  return (
    state.menuDragActive.length > 1 && [
      (dispatch, props) => dispatch(props.action, props.name),
      {
        action: menuMove,
        name: state.menuDragActive,
      },
    ]
  );
}

export default subMenu;
