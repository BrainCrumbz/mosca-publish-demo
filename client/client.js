var mqtt = require('mqtt');

console.log('MQTT Client is starting...');

/*
// remote Test Mosquitto MQTT server instance
var client  = mqtt.connect('mqtt://test.mosquitto.org');
*/

// local mosca MQTT server instance
var client  = mqtt.connect({ 
  port: 1883, 
  host: 'localhost', 
  keepalive: 10000,
});

var topicOfInterest = 'broker/someTopic';

var topicSubscribeOpts = {
  qos: 1,
};

client.on('connect', function () {
  console.log('MQTT client connected');
  
  console.log('MQTT client subscribing to ' + topicOfInterest + '...');
  
  client.subscribe(topicOfInterest, topicSubscribeOpts, function onSubscribe(err, granted) {
    if (err) {
      console.log('subscribe errors:', err);
    }
    
    if (granted) {
      console.log('subscribe granted:', granted);
    }
  });
});

// fired when a message is received on one of the subscribed topic
client.on('message', function (topic, message, packet) {
  console.log('\n\n#########################################');
  console.log('MQTT client received message');
  console.log(' * topic', topic);
  console.log(' * message', message);
  console.log(' * message (unpacked)', message.toString('utf8'));
  console.log(' * packet', packet);
  console.log(' * payload (unpacked)', packet.payload.toString('utf8'));
});
