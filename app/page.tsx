"use client";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {formSchema} from "@/lib/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import Todos from "./todos";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {getTodos} from "@/lib/getTodos";
import {toast} from "sonner";
import {Loader, ShieldX} from "lucide-react";
import {useUser} from "@clerk/nextjs";
import {todo} from "@/actions/todo";
import {useTransition} from "react";

function Home() {
  const {user} = useUser();
  // const [isPending, startTransition] = useTransition();

  const queryClient = useQueryClient();
  // FETCH DATA HERE

  const {data, isLoading, error} = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // ADDING DATA / UPDATING DATA
  const {mutate, isPending} = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const {data} = await axios.post("/api/todos", values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["todos"]});
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: (data) => toast.success(data.success),
    });

    // startTransition(() => {
    //   todo(values)
    //     .then((data) => toast.success(data.success))
    //     .catch((err) => toast.error(err));
    // });
  }

  return (
    <div className="flex items-center flex-col justify-center h-full">
      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex gap-x-3"
          >
            <FormField
              control={form.control}
              name="todo"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Todo </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eat breakfast..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </>
      <div className=" ">
        {isLoading && (
          <div className="mt-4 flex items-center justify-center">
            <Loader className="h-4 w-4 text-gray-600 animate-spin" />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center flex-col space-y-2 m-5 text-rose-500">
            <ShieldX className="h-4 w-4 text-muted-foreground" />
            Something went wrong
          </div>
        )}
        <Todos data={data} />
      </div>
    </div>
  );
}

export default Home;
