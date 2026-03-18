# RabbitMQ Publisher & Consumer Example

This project demonstrates a simple RabbitMQ setup with two Node.js applications:

- **publisher.js** – Publishes a "Hello World!" message to a queue.
- **consumer.js** – Consumes messages from the same queue and logs them.

## Prerequisites

- **Node.js** (v14+ recommended)
- **npm** (comes with Node)
- **RabbitMQ** server running locally (default URL `amqp://localhost`).  
  You can start RabbitMQ via Docker:

```bash
docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 rabbitmq:3-management
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Verify that RabbitMQ is reachable at `amqp://localhost`. If you used Docker, the above command already exposes it on that address.

## Running the Example

Open two terminal windows (or tabs).

### Terminal 1 – Start the consumer

```bash
npm run consume
```

You should see:

```
[*] Waiting for messages in hello. To exit press CTRL+C
```

### Terminal 2 – Publish a message

```bash
npm run publish
```

The publisher will output:

```
[x] Sent 'Hello World!'
```

Back in the consumer terminal you will see:

```
[x] Received 'Hello World!'
```

## Scripts

- `npm run publish` – Executes `node publisher.js`
- `npm run consume` – Executes `node consumer.js`

## Cleaning Up

Stop the consumer with `Ctrl+C`. If you ran RabbitMQ via Docker, stop and remove the container:

```bash
docker stop some-rabbit && docker rm some-rabbit
```

## Explanation

- **publisher.js** connects to RabbitMQ, asserts a non‑durable queue named `hello`, and sends a single message.
- **consumer.js** connects to the same queue, waits for messages, logs them, and acknowledges receipt.

Feel free to modify the queue name, message content, or add more complex logic as needed.
