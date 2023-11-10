import { TODO_ONCHANGE,
    TODO_ADD,
     } from "../constants/actionTypes";

const initialState = {
  item:{
    value:""
  },

  data:[],
};

export default function tasks(state = initialState, action :any) {
  const {
    type,
    item,
  } = action;

  switch (action.type) {
    case TODO_ONCHANGE:
        return Object.assign({}, state, {
           item,
          });
    case TODO_ADD:
        return Object.assign({}, state, {
            // clear the `item.value`
            item: {
              value: '',
            },
            // create a new array instance and push the item
            data: [
              ...(state.data),
              item,
            ],
        });
    default:
      return state;
  }
}