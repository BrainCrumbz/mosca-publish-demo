var mosca = require('mosca');

console.log('MQTT broker is starting...');

var inMemoryBrokerSettings = {
  port: 1883,  // mosca (mqtt) port
  persistence: mosca.persistence.Memory,  // using ascoltatore over memory
};

var brokerSettings = inMemoryBrokerSettings;

// here MQTT broker is started
var broker = new mosca.Server(brokerSettings, function onCreated(err, broker) {
  // assume no errors

  console.log('MQTT broker is up and running');
});

broker.on('ready', function onReady() {
  console.log('MQTT broker is ready')
  
  setInterval(publishMessage, 5000);
});

// fired when a client connects
broker.on('clientConnected', function onClientConnected(client) {
  console.log('MQTT client connected, id', client.id); 
});

// fired when a client disconnects
broker.on('clientDisconnected', function onClientDisconnected(client) {
  console.log('MQTT client disconnected, id', client.id);
});

// fired when a message is published
broker.on('published', function onPublished(packet, client) {
  console.log('MQTT broker detected a published message');
  console.log(' * packet:', packet);
  console.log(' * packet payload:', packet.payload.toString());
});

var topicOfInterest = 'broker/someTopic';

var objectPayload = {
  fieldA: 'a',
  fieldB: 'b',
};

var textPayload = JSON.stringify(objectPayload);
var bufferPayload = new Buffer(textPayload, 'utf-8'); 

function publishMessage() {
  
  var packet = {
    topic: topicOfInterest,
    
    payload: textPayload,
    //payload: bufferPayload,
    
    qos: 1,
    retain: false,  
  };
  
  console.log('\n\n#########################################');
  console.log('MQTT broker sending message to board ..\n');
  
  broker.publish(packet, function() {
    console.log('MQTT broker message sent');
  });
}
