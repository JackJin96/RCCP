const redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 3600; //the expiration time is in 3600 seconds

module.exports = function (io) {
    const collaborations= {};

    const sessionPath = '/temp-sessions/';

    //stores unique socketId and sessionId as key value pairs in a map
    const socketIdToSessionId = {};

    io.on('connection', (socket) => {
       const sessionId = socket.handshake.query['sessionId'];

       socketIdToSessionId[socket.id] = sessionId;
        
        if(sessionId in collaborations) {
            collaborations[sessionId]['participants'].push(socket.id);
        } else {
            redisClient.get(sessionPath + '/' + sessionId, data => {
                if (data) {
                    console.log('session terminated previously, putting back from redis');
                    collaborations[sessionId] = {
                        'cachedInstructions' : JSON.parse(data),
                        'participants' : []
                    };
                } else {
                    console.log('creating new session');
                    collaborations[sessionId] = {
                        'cachedInstructions' : [],
                        'participants' : []
                    }
                }
                collaborations[sessionId]['participants'].push(socket.id);
            });
        }


        socket.on('change', delta => {
           const sessionId = socketIdToSessionId[socket.id];
           if(sessionId in collaborations) {
               collaborations[sessionId]['cachedInstructions'].push(['change', delta, Date.now()]);
           }
           if(sessionId in collaborations) {
            const participants = collaborations[sessionId]['participants'];
            for (let participant of participants) {
                if(socket.id !== participant){
                    io.to(participant).emit('change', delta);
                    console.log('change emitted');
                }
            }
           } else {
               console.error('error! sessionId is not in the list of participants!');
           }
       });

       socket.on('restoreBuffer', () => {
           const sessionId = socketIdToSessionId[socket.id];
           if(sessionId in collaborations) {
               const instructions = collaborations[sessionId]['cachedInstructions'];
               for (let instruction of instructions) {
                   socket.emit(instruction[0], instruction[1]);
               }
           }
       });

       socket.on('disconnect', () => {
            const sessionId = socketIdToSessionId[socket.id];
            let foundAndRemove = false;
            if (sessionId in collaborations) {
                const participants = collaborations[sessionId]['participants'];
                const index = participants.indexOf(socket.id);
                if(index >= 0) {
                    participants.splice(index, 1);
                    foundAndRemove = true;
                    if(participants.length === 0) {
                        const key = sessionPath + '/' + sessionId;
                        const value = JSON.stringify(collaborations[sessionId]['cachedInstructions']);
                        redisClient.set(key, value, redisClient.redisPrint);
                        redisClient.expire(key, TIMEOUT_IN_SECONDS);
                        delete collaborations[sessionId];
                    }
                }
            }
            if( !foundAndRemove ) {
                console.error('not foundAndRemove');
            }
       });


    });
}