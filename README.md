# mosca-publish-demo
A demo showing mosca server publishing message to client

## Server sample output

**Note:** double startup message smells. It should show up only once.

```
MQTT broker is starting...
MQTT broker is up and running
MQTT broker is up and running
MQTT broker is ready
MQTT client connected, id mqttjs_54003fcc
MQTT broker detected a published message
 * packet: { topic: '$SYS/NJYiStZ7/new/clients',
  payload: 'mqttjs_54003fcc' }
 * packet payload: mqttjs_54003fcc
MQTT broker detected a published message
 * packet: { topic: '$SYS/NJYiStZ7/new/subscribes',
  payload: 'mqttjs_54003fcc' }
 * packet payload: mqttjs_54003fcc


#########################################
MQTT broker sending message to board ..

MQTT broker detected a published message
 * packet: { topic: 'broker/someTopic',
  payload: '{"fieldA":"a","fieldB":"b"}',
  qos: 1,
  retain: false }
 * packet payload: {"fieldA":"a","fieldB":"b"}
MQTT broker message sent
```

## Client sample output

```
MQTT Client is starting...
MQTT client connected
MQTT client subscribing to broker/someTopic...
subscribe granted: [ { topic: 'broker/someTopic', qos: 1 } ]


#########################################
MQTT client received message
 * topic broker/someTopic
 * message <Buffer 7b 22 66 69 65 6c 64 41 22 3a 22 61 22 2c 22 66 69 65 6c 64 42 22 3a 22 62 22 7d>
 * message (unpacked) {"fieldA":"a","fieldB":"b"}
 * packet { cmd: 'publish',
  retain: false,
  qos: 1,
  dup: false,
  length: 47,
  topic: 'broker/someTopic',
  payload: <Buffer 7b 22 66 69 65 6c 64 41 22 3a 22 61 22 2c 22 66 69 65 6c 64 42 22 3a 22 62 22 7d>,
  messageId: 1 }
 * payload (unpacked) {"fieldA":"a","fieldB":"b"}
```
