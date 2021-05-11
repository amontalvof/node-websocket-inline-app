// HTML References
const lblDesk = document.querySelector('h1');
const lblTicket = document.querySelector('small');
const btnAttend = document.querySelector('button');
const divAlert = document.querySelector('.alert');

const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('The desk is required');
}

const desk = searchParams.get('desk');
lblDesk.innerText = desk;
divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAttend.disabled = false;
});

socket.on('disconnect', () => {
    btnAttend.disabled = true;
});

socket.on('last-ticket', (lastTicket) => {
    // lblNewTicket.innerText = `Ticket ${lastTicket}`;
});

btnAttend.addEventListener('click', () => {
    socket.emit('attend-ticket', { desk }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblTicket.innerText = 'nobody';
            return (divAlert.style.display = '');
        }
        lblTicket.innerText = 'ticket ' + ticket.number;
    });
});
