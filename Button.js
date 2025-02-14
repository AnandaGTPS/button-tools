/**
 * Created By Nadz`
 * Contact me on WhatsApp
 * wa.me/6282139672290
 */

/**
 * VERSION: 2.0
 */

const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require("@whiskeysockets/baileys");

class Button {
    /**
     * @constructor
     */
    constructor() {
        /** @type {string} */ this._title = "";
        /** @type {string} */ this._subtitle = "";
        /** @type {string} */ this._body = "";
        /** @type {string} */ this._footer = "";
        /** @type {Array<Object>} */ this._beton = [];
        /** @type {Object} */ this._data = {};
        /** @type {Object} */ this._contextInfo = {};
        /** @type {number} */ this._currentSelectionIndex = -1;
        /** @type {number} */ this._currentSectionIndex = -1;
        /** @type {number} */ this._type = 0;
        /** @type {Array<Object>} */ this._betonOld = [];
    }

    /**
     * Set video media.
     * @param {string|Buffer} path - The video path or buffer.
     * @param {Object} [options={}] - Additional options.
     * @returns {Button|Error}
     */
    setVideo(path, options = {}) {
        if (!path) return new Error("Url or buffer needed");
        Buffer.isBuffer(path) ? this._data = { video: path, ...options } : this._data = { video: { url: path }, ...options };
        return this;
    }

    /**
     * Set image media.
     * @param {string|Buffer} path - The image path or buffer.
     * @param {Object} [options={}] - Additional options.
     * @returns {Button|Error}
     */
    setImage(path, options = {}) {
        if (!path) return new Error("Url or buffer needed");
        Buffer.isBuffer(path) ? this._data = { image: path, ...options } : this._data = { image: { url: path }, ...options };
        return this;
    }

    /**
     * Set document media.
     * @param {string|Buffer} path - The document path or buffer.
     * @param {Object} [options={}] - Additional options.
     * @returns {Button|Error}
     */
    setDocument(path, options = {}) {
        if (!path) return new Error("Url or buffer needed");
        Buffer.isBuffer(path) ? this._data = { document: path, ...options } : this._data = { document: { url: path }, ...options };
        return this;
    }

    /**
     * Set a title for the button.
     * @param {string} title - The title text.
     * @returns {Button}
     */
    setTitle(title) {
        this._title = title;
        return this;
    }

    /**
     * Set a subtitle for the button.
     * @param {string} subtitle - The subtitle text.
     * @returns {Button}
     */
    setSubtitle(subtitle) {
        this._subtitle = subtitle;
        return this;
    }

    /**
     * Set body text.
     * @param {string} body - The body content.
     * @returns {Button}
     */
    setBody(body) {
        this._body = body;
        return this;
    }

    /**
     * Set footer text.
     * @param {string} footer - The footer content.
     * @returns {Button}
     */
    setFooter(footer) {
        this._footer = footer;
        return this;
    }

    /**
     * Add a reply button.
     * @param {string} display_text - The button display text.
     * @param {string} id - The button ID.
     * @returns {Button}
     */
    addReply(display_text = "", id = "") {
        this._beton.push({ name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text, id }) });
        return this;
    }

    /**
     * Execute the button creation process.
     * @param {string} jid - The recipient JID.
     * @param {Object} conn - The connection instance.
     * @param {string} [quoted=''] - Quoted message.
     * @returns {Promise<Object>}
     */
    async run(jid, conn, quoted = '') {
        if (this._type === 0) {
            const message = {
                body: proto.Message.InteractiveMessage.Body.create({ text: this._body }),
                footer: proto.Message.InteractiveMessage.Footer.create({ text: this._footer }),
                header: proto.Message.InteractiveMessage.Header.create({ 
                    title: this._title, 
                    subtitle: this._subtitle, 
                    hasMediaAttachment: !!this._data, 
                    ...(this._data ? await prepareWAMessageMedia(this._data, { upload: conn.waUploadToServer }) : {}) 
                })
            };

            const msg = generateWAMessageFromContent(jid, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            ...message,
                            contextInfo: this._contextInfo,
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons: this._beton
                            })
                        })
                    }
                }
            }, { quoted });

            await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
            return msg;
        } else {
            return await conn.sendMessage(jid, {
                ...(this._data ? this._data : {}),
                [this._data ? "caption" : "text"]: this._body,
                title: (!!this._data ? null : this._title),
                footer: this._footer,
                viewOnce: true, 
                contextInfo: this._contextInfo, 
                buttons: [...this._betonOld, ...this._beton.map(nadz => ({
                    buttonId: "Nadz`", 
                    buttonText: { displayText: "Nadz`" }, 
                    type: 1,
                    nativeFlowInfo: {
                        name: nadz.name, 
                        paramsJson: nadz.buttonParamsJson
                    }
                }))]
            }, { quoted });
        }
    }
}

module.exports = Button;
