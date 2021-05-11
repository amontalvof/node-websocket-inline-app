const TicketControl = require('../models/ticketControl');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    socket.emit('last-ticket', ticketControl.lastTicket);
    socket.emit('actual-status', ticketControl.last4);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
    });

    socket.on('attend-ticket', ({ desk }, callback) => {
        if (!desk) {
            callback({
                ok: false,
                msg: 'The desk is required',
            });
        }

        const ticket = ticketControl.attendTicket(desk);

        socket.broadcast.emit('actual-status', ticketControl.last4);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'There are no pending tickets',
            });
        } else {
            callback({
                ok: true,
                ticket,
            });
        }
    });
};

module.exports = {
    socketController,
};
