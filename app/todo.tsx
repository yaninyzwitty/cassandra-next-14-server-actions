import {Todo} from "@/types";
import React from "react";

function Todo({todo}: {todo: Todo}) {
  if (!todo) {
    return <div className=" text-rose-500">No todos found</div>;
  }
  return (
    <div className="m-1 rounded-lg ">
      <h3 className="bg-emerald-500/15 p-1">{todo.title}</h3>
    </div>
  );
}

export default Todo;
