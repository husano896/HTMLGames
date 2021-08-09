class Client {
    constructor(url) {
        if (url) {
            this.connect(url);
        } else {
            console.warn('[WS] 未指定Url, 請手動以connect(url)連接.')
        }
        this.listeners = [];
    }

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }

    connect(url) {
        this.ws = new WebSocket(url);
        this.ws.onopen = this.onopen.bind(this);
        this.ws.onmessage = this.onmessage.bind(this);
        this.ws.onclose = this.onclose.bind(this);
        this.ws.onerror = this.onerror.bind(this);
    }
    onopen(e) {
        console.log("[WS] 連線已建立.");
        this.listeners.forEach(l=>l.onopen(e));
    }

    onmessage(e) {
        console.log(`[WS] 收到資料: ${e.data}`);
        this.listeners.forEach(l=>l.onmessage(e));
    }

    onclose(e) {
        if (e.wasClean) {
            console.log(`[WS] 連線正常斷開.`, e);
        } else {
            console.error('[WS] 連線不正常中止!', e);
        }
        this.listeners.forEach(l=>l.onclose(e));
    }

    onerror(err) {
        console.error(`[WS] ${err.message}`);
        this.listeners.forEach(l=>l.onerror(e));
    }
}