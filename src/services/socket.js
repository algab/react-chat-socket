import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:4000');

export default socket;
