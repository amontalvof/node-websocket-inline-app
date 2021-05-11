const TicketControl = require('../models/ticketControl');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    socket.emit('last-ticket', ticketControl.lastTicket);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
    });
};

module.exports = {
    socketController,
};
