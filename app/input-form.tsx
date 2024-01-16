"use client";
import {todo} from "@/actions/todo";
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
import {useTransition} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import * as z from "zod";

function InputForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      todo(values)
        .then((data) => toast.success(data.success))
        .catch((err) => toast.error(err));
    });
  };
  return (
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
  );
}

export default InputForm;
