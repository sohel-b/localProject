// consumer.js
import amqp  from 'amqplib';

async function consume() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'hello';

    await channel.assertQueue(queue, { durable: false });
    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          console.log(" [x] Received '%s'", msg.content.toString());
          channel.ack(msg);
        }
      },
      { no: false }
    );
  } catch (error) {
    console.error('Error:', error);
  }
}

consume();
