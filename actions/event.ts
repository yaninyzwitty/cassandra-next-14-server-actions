"use server";

import { kafka } from "@/kafka";

export const sendEvent = async (values: any) => {

    const producer = kafka.producer();
    await producer.connect();

    await producer.send({
        topic: "witty",
        messages: [
            {
                value: JSON.stringify(values),
            }
        ]
    });

    console.log("Message sent successfully");
await producer.disconnect();





}