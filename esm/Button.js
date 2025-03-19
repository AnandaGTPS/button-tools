/**
 * Created By Nadz`
 * Contact me on WhatsApp
 * wa.me/6282139672290
 */

/**
 * VERSION: 2.0
 */

import pkg from "baileys";
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg;

/**
 * Class representing a Button for interactive WhatsApp messages.
 */
class Button {
    constructor() {
        /** @private {string} Title of the message header */
        this._title = "";
        /** @private {string} Subtitle of the message header */
        this._subtitle = "";
        /** @private {string} Body text of the message */
        this._body = "";
        /** @private {string} Footer text of the message */
        this._footer = "";
        /** @private {Array} Array to hold button objects (new method) */
        this._beton = [];
        /** @private {*} Data object for media (image, video, document, etc.) */
        this._data;
        /** @private {Object} Context info object for message metadata */
        this._contextInfo = {};
        /** @private {number} Index of the current selection */
        this._currentSelectionIndex = -1;
        /** @private {number} Index of the current section */
        this._currentSectionIndex = -1;
        /** @private {number} Type of message; 0 for interactive, other for alternative format */
        this._type = 0;
        /** @private {Array} Array to hold old button objects (V2) */
        this._betonOld = [];
    }

    /**
     * Set video media for the message.
     * @param {string|Buffer} path - URL or Buffer of the video.
     * @param {object} [options={}] - Additional options for the video media.
     * @returns {Button|Error} Returns the Button instance or an Error if path is missing.
     */
    setVideo(path, options = {}) {
        if (!path) return new Error("Url or buffer needed");
        Buffer.isBuffer(path)
            ? this._data = { video: path, ...options }
            : this._data = { video: { url: path }, ...options };
        return this;
    }
    
    /**
     * Set image media for the message.
     * @param {string|Buffer} path - URL or Buffer of the image.
     * @param {object} [options={}] - Additional options for the image media.
     * @returns {Button|Error} Returns the Button instance or an Error if path is missing.
     */
    setImage(path, options = {}) {
        if (!path) return new Error("Url or buffer needed");
        Buffer.isBuffer(path)
            ? this._data = { image: path, ...options }
            : this._data = { image: { url: path }, ...options };
        return this;
    }
    
    /**
     * Set document media for the message.
     * @param {string|Buffer} path - URL or Buffer of the document.
     * @param {object} [options={}] - Additional options for the document media.
     * @returns {Button|Error} Returns the Button instance or an Error if path is missing.
     */
    setDocument(path, options = {}) {
        if (!path) return new Error("Url or buffer needed");
        Buffer.isBuffer(path)
            ? this._data = { document: path, ...options }
            : this._data = { document: { url: path }, ...options };
        return this;
    }
    
    /**
     * Set custom media for the message.
     * @param {Object} obj - An object representing the media.
     * @returns {Button|string} Returns the Button instance or an error message if the type is incorrect.
     */
    setMedia(obj) {
        if (typeof obj === 'object' && !Array.isArray(obj)) {
            this._data = obj;
        } else {
            return `Type of media must be an Object`;
        }
        return this;
    }
    
    /**
     * Set the title for the message header.
     * @param {string} title - The title text.
     * @returns {Button} Returns the Button instance.
     */
    setTitle(title) {
        this._title = title;
        return this;
    }
    
    /**
     * Set the subtitle for the message header.
     * @param {string} subtitle - The subtitle text.
     * @returns {Button} Returns the Button instance.
     */
    setSubtitle(subtitle) {
        this._subtitle = subtitle;
        return this;
    }

    /**
     * Set the body text of the message.
     * @param {string} body - The main content of the message.
     * @returns {Button} Returns the Button instance.
     */
    setBody(body) {
        this._body = body;
        return this;
    }

    /**
     * Set the footer text of the message.
     * @param {string} footer - The footer text.
     * @returns {Button} Returns the Button instance.
     */
    setFooter(footer) {
        this._footer = footer;
        return this;
    }
    
    /**
     * Set context information for the message.
     * @param {Object} obj - An object representing context info.
     * @returns {Button|string} Returns the Button instance or an error message if the type is incorrect.
     */
    setContextInfo(obj) {
        if (typeof obj === 'object' && !Array.isArray(obj)) {
            this._contextInfo = obj;
        } else {
            return `Type of contextInfo must be an Object`;
        }
        return this;
    }
    
    /**
     * Set a variable/property of the Button instance.
     * @param {string} name - The property name.
     * @param {*} value - The value to assign.
     * @returns {Button|string} Returns the Button instance or an error message if the property is not found.
     */
    setVariabel(name, value) {
        if (!this.hasOwnProperty(name)) return `Cannot find variabel ${name}, try getVariabelList()`;
        this[name] = value;
        return this;
    }
    
    /**
     * Get the value of a variable/property from the Button instance.
     * @param {string} name - The property name.
     * @returns {*} Returns the value of the property or an error message if not found.
     */
    getVariabel(name) {
        if (!this.hasOwnProperty(name)) return `Cannot find variabel ${name}, try getVariabelList()`;
        return this[name];
    }
    
    /**
     * Get a list of all variable/property names of the Button instance.
     * @returns {Array<string>} Returns an array of property names.
     */
    getVariabelList() {
        return Object.keys(this);
    }
    
    /**
     * Add a button to the message.
     * @param {string} name - The name/type of the button.
     * @param {object} params - The parameters for the button in JSON format.
     * @returns {Button} Returns the Button instance.
     */
    setButton(name, params) {
        this._beton.push({ name, buttonParamsJson: JSON.stringify(params) });
        return this;
    }
    
    /**
     * Add a button using the V2 method.
     * @param {object} params - The parameters for the button.
     * @returns {Button} Returns the Button instance.
     */
    setButtonV2(params) {
        this._betonOld.push(params);
        return this;
    }

    /**
     * Create a row in a button section.
     * @param {string} [header=""] - The header text for the row.
     * @param {string} [title=""] - The title text for the row.
     * @param {string} [description=""] - The description text for the row.
     * @param {string} [id=""] - The identifier for the row.
     * @throws Will throw an error if selection or section has not been created.
     * @returns {Button} Returns the Button instance.
     */
    makeRow(header = "", title = "", description = "", id = "") {
        if (this._currentSelectionIndex === -1 || this._currentSectionIndex === -1) {
            throw new Error("You need to create a selection and a section first");
        }
        const buttonParams = JSON.parse(this._beton[this._currentSelectionIndex].buttonParamsJson);
        buttonParams.sections[this._currentSectionIndex].rows.push({ header, title, description, id });
        this._beton[this._currentSelectionIndex].buttonParamsJson = JSON.stringify(buttonParams);
        return this;
    }

    /**
     * Create a new section in the current selection.
     * @param {string} [title=""] - The title of the section.
     * @param {string} [highlight_label=""] - The highlight label for the section.
     * @throws Will throw an error if no selection exists.
     * @returns {Button} Returns the Button instance.
     */
    makeSections(title = "", highlight_label = "") {
        if (this._currentSelectionIndex === -1) {
            throw new Error("You need to create a selection first");
        }
        const buttonParams = JSON.parse(this._beton[this._currentSelectionIndex].buttonParamsJson);
        buttonParams.sections.push({ title, highlight_label, rows: [] });
        this._currentSectionIndex = buttonParams.sections.length - 1;
        this._beton[this._currentSelectionIndex].buttonParamsJson = JSON.stringify(buttonParams);
        return this;
    }

    /**
     * Add a new selection for buttons.
     * @param {string} title - The title of the selection.
     * @returns {Button} Returns the Button instance.
     */
    addSelection(title) {
        this._beton.push({ name: "single_select", buttonParamsJson: JSON.stringify({ title, sections: [] }) });
        this._currentSelectionIndex = this._beton.length - 1;
        this._currentSectionIndex = -1;
        return this;
    }

    /**
     * Add a quick reply button.
     * @param {string} [display_text=""] - The text displayed on the button.
     * @param {string} [id=""] - The identifier for the button.
     * @returns {Button} Returns the Button instance.
     */
    addReply(display_text = "", id = "") {
        this._beton.push({ name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text, id }) });
        return this;
    }
    
    /**
     * Add a quick reply button using V2 method.
     * @param {string} [displayText="Nadz"] - The text to display on the button.
     * @param {string} [buttonId="Nadz"] - The button ID.
     * @returns {Button} Returns the Button instance.
     */
    addReplyV2(displayText = "Nadz", buttonId = "Nadz") {
        this._betonOld.push({ buttonId, buttonText: { displayText }, type: 1 });
        this._type = 1;
        return this;
    }
    
    /**
     * Add a call-to-action button for calling.
     * @param {string} [display_text=""] - The text to display on the button.
     * @param {string} [id=""] - The identifier for the button.
     * @returns {Button} Returns the Button instance.
     */
    addCall(display_text = "", id = "") {
        this._beton.push({
            name: "cta_call",
            buttonParamsJson: JSON.stringify({
                display_text,
                id
            })
        });
        return this;
    }
    
    /**
     * Add a reminder call-to-action button.
     * @param {string} [display_text=""] - The text to display on the button.
     * @param {string} [id=""] - The identifier for the button.
     * @returns {Button} Returns the Button instance.
     */
    addReminder(display_text = "", id = "") {
        this._beton.push({
            name: "cta_reminder",
            buttonParamsJson: JSON.stringify({
                display_text,
                id
            })
        });
        return this;
    }
    
    /**
     * Add a cancel reminder call-to-action button.
     * @param {string} [display_text=""] - The text to display on the button.
     * @param {string} [id=""] - The identifier for the button.
     * @returns {Button} Returns the Button instance.
     */
    addCancelReminder(display_text = "", id = "") {
        this._beton.push({
            name: "cta_cancel_reminder",
            buttonParamsJson: JSON.stringify({
                display_text,
                id
            })
        });
        return this;
    }
    
    /**
     * Add an address button.
     * @param {string} [display_text=""] - The text to display on the button.
     * @param {string} [id=""] - The identifier for the button.
     * @returns {Button} Returns the Button instance.
     */
    addAddress(display_text = "", id = "") {
        this._beton.push({
            name: "address_message",
            buttonParamsJson: JSON.stringify({
                display_text,
                id
            })
        });
        return this;
    }
    
    /**
     * Add a button for sending location.
     * @returns {Button} Returns the Button instance.
     */
    addLocation() {
        this._beton.push({
            name: "send_location",
            buttonParamsJson: ""
        });
        return this;
    }

    /**
     * Add a URL button.
     * @param {string} [display_text=""] - The text to display on the button.
     * @param {string} [url=""] - The URL to open when the button is clicked.
     * @param {string} [merchant_url=""] - The merchant URL (if applicable).
     * @returns {Button} Returns the Button instance.
     */
    addUrl(display_text = "", url = "", merchant_url = "") {
        this._beton.push({
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text,
                url,
                merchant_url
            })
        });
        return this;
    }

    /**
     * Add a copy button that copies text when clicked.
     * @param {string} [display_text=""] - The text to display on the button.
     * @param {string} [copy_code=""] - The text/code to copy.
     * @param {string} [id=""] - The identifier for the button.
     * @returns {Button} Returns the Button instance.
     */
    addCopy(display_text = "", copy_code = "", id = "") {
        this._beton.push({
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
                display_text,
                copy_code,
                id
            })
        });
        return this;
    }

    /**
     * Send the interactive message with buttons.
     * If _type is 0, sends as an interactive message with new button format.
     * Otherwise, sends using the old button format.
     * @param {string} jid - The target chat ID.
     * @param {object} conn - The WhatsApp connection object.
     * @param {object} quoted - The quoted message (if any).
     * @returns {Promise<object>} Returns a promise that resolves to the sent message object.
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
                buttons: [
                    ...this._betonOld,
                    ...this._beton.map(nadz => ({
                        buttonId: "Nadz`", 
                        buttonText: {
                            displayText: "Nadz`"
                        }, 
                        type: 1,
                        nativeFlowInfo: {
                            name: nadz.name, 
                            paramsJson: nadz.buttonParamsJson
                        }
                    }))
                ]
            }, { quoted });
        }
    }
}

export default Button;