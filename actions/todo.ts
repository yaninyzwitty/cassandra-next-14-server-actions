"use server";
import cassandraDb from '@/cassandra';
import { formSchema } from '@/lib/schema';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import * as z from 'zod'


export const todo = async (values: z.infer<typeof formSchema>) => {
    const { userId } = auth();

    const validatedFields = formSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error('Invalid fields!');
    

};

const todoId = crypto.randomUUID();


const { todo  } = validatedFields.data;
const query = `INSERT INTO todos (todo_id, todo, user_id) VALUES (?, ?, ?)`;

await cassandraDb.execute(query, [todoId, todo, userId], { prepare: true });
revalidatePath('/')



return { success: todo }





}