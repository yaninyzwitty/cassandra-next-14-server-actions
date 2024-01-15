import {  Kafka, logLevel  } from 'kafkajs'

export const kafka = new Kafka({
    clientId: 'weather-kafka-event',
    brokers: [process.env.KAFKA_BROKER!],
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-256',
        username: process.env.KAFKA_USERNAME!,
        password: process.env.KAFKA_PASSWORD!
    },
    logLevel: logLevel.ERROR,
});


