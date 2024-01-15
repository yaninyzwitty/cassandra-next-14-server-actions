"use client";
import {Card} from "@/components/ui/card";
import {Todo as TodoType} from "@/types";
import Todo from "./todo";

function Todos({data}: {data: TodoType[]}) {
  return (
    <div className="mt-4">
      <Card className="w-[400px] p-4 h-fit overflow-y-auto">
        {data?.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </Card>
    </div>
  );
}

export default Todos;
