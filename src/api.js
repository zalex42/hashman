import axios from 'axios';

let baseSett = {
    headers: {
        'XAuth': localStorage.getItem('token')
    }
}

if (process.env.NODE_ENV === 'production') {
    baseSett.baseURL = 'http://control.hashman.ru';
}

const api = axios.create(baseSett);

export function sendPushAboutAuth() {
    let fcmUrl = `http://control.hashman.ru/api/react/fcm?token=${localStorage.getItem('token')}`;
    try {
        android_app.upFcm(fcmUrl);
    } catch (err) { }

    try {
        webkit.messageHandlers.callbackHandler.postMessage(fcmUrl);
    } catch (err) { }
}

export default api;
