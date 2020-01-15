import socketIOClient from 'socket.io-client';

const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);

export default socket;
