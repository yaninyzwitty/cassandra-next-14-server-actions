import {queryTodos} from "@/actions/todos";
import InputForm from "./input-form";
import Todos from "./todos";
import {Todo} from "@/types";

async function Home() {
  const data: Todo[] = await queryTodos();

  return (
    <div className="flex items-center flex-col justify-center h-full">
      <InputForm />
      <div className=" ">
        <Todos data={data} />I
      </div>
    </div>
  );
}

export default Home;
