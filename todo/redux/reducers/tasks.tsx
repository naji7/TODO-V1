"use strict";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TODO_ONCHANGE, TODO_ADD, TODO_ADD_ALL_TASKS } from "../actions";

export interface Task {
  id: string;
  content: string;
  completed: boolean;
  createdAt: Date;
}

const initialState: any = [];

export default function tasks(
  state = initialState,
  action: PayloadAction<Task>
) {
  const { type, payload } = action;

  switch (type) {
    case TODO_ONCHANGE:
      const index = state.findIndex(
        (task: any) => Number(task.id) === Number(payload.id)
      );

      state[index].completed = true;
      state[index].completedDate = Date.now();

      return state;
    case TODO_ADD:
      const newTask = {
        id: state.length + 1,
        content: payload.content,
        completed: false,
        createdDate: Date.now(),
      };
      state.push(newTask);
      return state;
    case TODO_ADD_ALL_TASKS:
      state = payload;
      return state;
    default:
      return state;
  }
}
