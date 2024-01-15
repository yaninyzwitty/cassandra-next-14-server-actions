import * as z from 'zod';
import axios from 'axios';
import { formSchema } from '@/lib/schema';

import { QueryClient, useMutation } from '@tanstack/react-query';
export const createTodo = async (values: z.infer<typeof formSchema>) => {


 
    try {
      const {data} = await axios.post("/api/todos", values);
      return data;
    } catch (error) {
      console.log("Error creating Todo", error);
      throw new Error("Error creating Todo");
    }
  };

  
  export const useAddTodo = () => {
    const queryClient = new QueryClient();


    const {  mutate: addTodo, isPending   } = useMutation({
        mutationFn: createTodo,
       
        
    });

    return {
        addTodo ,
        isPending

    }

  }