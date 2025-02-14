# Button Class Documentation

**Created By:** Nadz  
**Contact:** [WhatsApp](https://wa.me/6282139672290)  
**Version:** 2.0

The Button class is designed to help you build interactive WhatsApp messages using the Baileys library. It provides a fluent, chainable interface to configure message texts, attach media, set context information, and add various interactive buttons (like quick replies, call-to-actions, URL buttons, copy buttons, and interactive selections).

---

## Installation

1. **Save the Code:**  
   Save the provided code in a file named `Button.js`.

2. **Global Import:**  
   In your bot’s configuration file (for example, `config.js` or `settings.js`), add:
   ```js
   global.Button = require("./Button.js");
   ```
   This makes the Button class available globally throughout your bot project.

---

## Constructor and Properties

When you instantiate the Button class, the following default properties are set:

- **Text Properties:**  
  - `_title`  
  - `_subtitle`  
  - `_body`  
  - `_footer`

- **Media and Context:**  
  - `_data`: Holds media (video, image, document, or custom media).  
  - `_contextInfo`: An object for extra context (e.g., mentions).

- **Button Containers:**  
  - `_beton`: Array for storing interactive button data (modern format).  
  - `_betonOld`: Array for storing legacy button data.

- **Interactive Selection State:**  
  - `_currentSelectionIndex`: Tracks the current selection group index.  
  - `_currentSectionIndex`: Tracks the current section within a selection.

- **Type Flag:**  
  - `_type`: Indicates which message structure will be used (0 by default).

**Example:**
```js
const button = new Button();
```

---

## Media Methods

These methods allow you to attach media to your interactive message.

### setVideo(path, options = {})

- **Purpose:**  
  Attaches video media to the message.
- **Parameters:**  
  - `path`: A URL (string) or Buffer containing video data.
  - `options` (optional): Additional options for the video.
- **Return:**  
  Returns the Button instance for chaining or an Error if no path is provided.
- **Example:**
  ```js
  button.setVideo("https://cdn.notmebot.us.kg/file/f63b42440c.mp4");
  ```

### setImage(path, options = {})

- **Purpose:**  
  Attaches an image to the message.
- **Parameters:**  
  - `path`: A URL (string) or Buffer representing the image.
  - `options` (optional): Additional image options.
- **Return:**  
  Returns the Button instance for chaining or an Error if no path is provided.
- **Example:**
  ```js
  button.setImage("https://cdn.notmebot.us.kg/file/ee69c350b8.jpg");
  ```

### setDocument(path, options = {})

- **Purpose:**  
  Attaches a document file to the message.
- **Parameters:**  
  - `path`: A URL (string) or Buffer for the document.
  - `options` (optional): Additional options.
- **Return:**  
  Returns the Button instance for chaining or an Error if no path is provided.
- **Example:**  
  Here’s an example using the provided document URL:
  ```js
  button.setDocument("https://cdn.notmebot.us.kg/file/062ad610a8.undefined");
  ```

### setMedia(obj)

- **Purpose:**  
  Allows you to pass a custom media object with advanced options.
- **Parameters:**  
  - `obj`: An object representing media (must be an object, not an array).
- **Return:**  
  Returns the Button instance or an error message if the input is not an object.
- **Example:**
  ```js
  button.setMedia({
    image: { url: "https://example.com/custom.jpg" },
    caption: "Custom Media Caption"
  });
  ```

---

## Text Methods

These functions set the various text components of your interactive message.

### setTitle(title)

- **Purpose:**  
  Sets the message title.
- **Parameters:**  
  - `title`: A string for the title.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.setTitle("Ini teks title");
  ```

### setSubtitle(subtitle)

- **Purpose:**  
  Sets the subtitle text.
- **Parameters:**  
  - `subtitle`: A string for the subtitle.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.setSubtitle("Ini teks subtitle");
  ```

### setBody(body)

- **Purpose:**  
  Sets the main body text, which can be multi-line or include dynamic content.
- **Parameters:**  
  - `body`: A string for the main message.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.setBody(`Hi @{m.sender.split("@")[0]}
Silahkan klik tombol di bawah ini untuk melihat fitur bot!`);
  ```

### setFooter(footer)

- **Purpose:**  
  Sets the footer text.
- **Parameters:**  
  - `footer`: A string for the footer.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.setFooter("Ini teks footer");
  ```

### setContextInfo(obj)

- **Purpose:**  
  Adds extra context to the message (for instance, to mention users).
- **Parameters:**  
  - `obj`: An object containing context information.
- **Return:**  
  Returns the Button instance or an error if the input is invalid.
- **Example:**
  ```js
  button.setContextInfo({ mentionedJid: [m.sender] });
  ```

---

## Variable Management Methods

These methods let you update or retrieve properties from the Button instance.

### setVariabel(name, value)

- **Purpose:**  
  Updates a specific property of the instance.
- **Parameters:**  
  - `name`: The property name.
  - `value`: The value to assign.
- **Return:**  
  Returns the Button instance or an error if the property does not exist.
- **Example:**
  ```js
  button.setVariabel('_title', "Updated Title");
  ```

### getVariabel(name)

- **Purpose:**  
  Retrieves the value of a given property.
- **Parameters:**  
  - `name`: The property name.
- **Return:**  
  Returns the property’s value or an error if it does not exist.
- **Example:**
  ```js
  const currentTitle = button.getVariabel('_title');
  ```

### getVariabelList()

- **Purpose:**  
  Returns a list of all property names in the instance.
- **Return:**  
  An array of strings.
- **Example:**
  ```js
  const properties = button.getVariabelList();
  console.log(properties);
  ```

---

## Button Adding Methods

These methods add various types of interactive buttons to your message.

### addReply(display_text, id)

- **Purpose:**  
  Adds a quick reply button (modern format).
- **Parameters:**  
  - `display_text`: The text displayed on the button.
  - `id`: The identifier used when the button is pressed.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.addReply("Menu Bot", ".menu");
  ```

### addReplyV2(displayText, buttonId)

- **Purpose:**  
  Adds a quick reply button using a legacy format.
- **Parameters:**  
  - `displayText`: The text to display.
  - `buttonId`: The identifier for the button.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.addReplyV2("Owner Bot", ".owner")
        .addReplyV2("Ping", ".ping");
  ```

### addCall(display_text, id)

- **Purpose:**  
  Adds a call-to-action button (for phone calls or similar actions).
- **Parameters:**  
  - `display_text`: The text displayed on the button.
  - `id`: The identifier for the call action.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.addCall("cta_call", "message");
  ```

### addReminder(display_text, id)

- **Purpose:**  
  Adds a reminder button.
- **Parameters:**  
  - `display_text`: The text for the reminder button.
  - `id`: The identifier for the reminder.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.addReminder("cta_reminder", "message");
  ```

### addCancelReminder(display_text, id)

- **Purpose:**  
  Adds a cancel reminder button.
- **Parameters:**  
  - `display_text`: The text for canceling a reminder.
  - `id`: The identifier for the cancel action.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.addCancelReminder("cta_cancel_reminder", "message");
  ```

### addAddress(display_text, id)

- **Purpose:**  
  Adds an address button.
- **Parameters:**  
  - `display_text`: The text shown on the button.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.addAddress("cta_address", "message");
  ```

### addLocation()

- **Purpose:**  
  Adds a button that triggers sending the user’s location.
- **Parameters:**  
  None.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.addLocation();
  ```

### addUrl(display_text, url, merchant_url)

- **Purpose:**  
  Adds a URL button that directs the user to a specified link.
- **Parameters:**  
  - `display_text`: The text displayed on the button.
  - `url`: The URL to open when the button is pressed.
  - `merchant_url`: An optional URL for merchant purposes.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.addUrl("Google", "https://www.google.com", "https://www.google.com");
  ```

### addCopy(display_text, copy_code, id)

- **Purpose:**  
  Adds a button that allows users to copy a piece of text (for example, an OTP).
- **Parameters:**  
  - `display_text`: The text displayed on the button.
  - `copy_code`: The code or text that will be copied.
  - `id`: The identifier for the copy action.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.addCopy("Copy OTP", "123456");
  ```

---

## Interactive Selection Methods

These methods work together to build an interactive menu where users can choose from several options. They are chainable and rely on internal state.

### addSelection(title)

- **Purpose:**  
  Begins a new selection group for interactive options.  
  This method sets the `_currentSelectionIndex` (and resets `_currentSectionIndex`) so that subsequent section and row additions will be grouped under this selection.
- **Parameters:**  
  - `title`: The title for the selection group.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.addSelection("Click Here!");
  ```

### makeSections(title, highlight_label)

- **Purpose:**  
  Creates a new section within the current selection group.  
  Each selection group can have multiple sections. This method adds a section object (with a title and optional highlight label) and updates `_currentSectionIndex`.
- **Parameters:**  
  - `title`: The title of the section.
  - `highlight_label` (optional): A label to highlight the section.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.makeSections("Owner Bot");            // Creates a section named "Owner Bot"
  button.makeSections("Menu Bot", "Top");         // Creates another section with a highlight label "Top"
  ```

### makeRow(header, title, description, id)

- **Purpose:**  
  Adds an option (row) to the current section of the active selection.  
  Each row represents an interactive option that the user can select.
- **Parameters:**  
  - `header`: A header text for the row (can be empty if not needed).
  - `title`: The display title of the option.
  - `description`: A description for the option.
  - `id`: A unique identifier for the option.
- **Return:**  
  Returns the Button instance.
- **Example:**
  ```js
  button.makeRow("", "Owner Bot", "", ".owner");
  ```

**Chain Method Explanation:**  
The methods `addSelection`, `makeSections`, and `makeRow` are designed to work in sequence.  
1. **addSelection** creates a new selection group, storing its index.  
2. **makeSections** adds a new section within that group and updates the section index.  
3. **makeRow** adds an option (row) to the currently active section.  
This stateful design allows you to build complex interactive menus with multiple sections and options using chained method calls.

---

## Execution Method

### run(jid, conn, quoted = '')

- **Purpose:**  
  Constructs the final interactive message and sends it via the Baileys connection.
- **Parameters:**  
  - `jid`: The recipient’s WhatsApp ID.
  - `conn`: The Baileys connection object used to relay or send messages.
  - `quoted` (optional): A message to quote if replying.
- **Return:**  
  Returns a Promise that resolves with the sent message.
- **Behavior:**  
  - **When `_type` is 0:**  
    The method builds an interactive message using media (if set), text parts, context info, and buttons from `_beton`, and sends it via `conn.relayMessage`.
  - **When `_type` is not 0:**  
    The method builds an alternative message structure using buttons from `_betonOld` and a mapped version of `_beton`, then sends it via `conn.sendMessage`.
- **Example:**
  ```js
  button.run(m.chat, conn, m);
  ```

---

## Complete Example

Below is a full example that combines text, media (including an image, video, and document), various button types, and an interactive selection menu. This example uses parts of the sample you provided:

```js
new Button() 
  // Setting text content
  .setTitle("Ini teks title")
  .setSubtitle("Ini teks subtitle")
  .setBody(`Hi @{m.sender.split("@")[0]}
Silahkan klik tombol di bawah ini untuk melihat fitur bot!`)
  .setContextInfo({ mentionedJid: [m.sender] })
  .setFooter("Ini teks footer")
  
  // Adding media examples
  .setImage("https://cdn.notmebot.us.kg/file/ee69c350b8.jpg")
  .setVideo("https://cdn.notmebot.us.kg/file/f63b42440c.mp4")
  .setDocument("https://cdn.notmebot.us.kg/file/062ad610a8.undefined")
  
  // Adding various buttons
  .addReply("Menu Bot", ".menu")
  .addReplyV2("Owner Bot", ".owner")
  .addReplyV2("Ping", ".ping")
  .addCall("cta_call", "message")
  .addReminder("cta_reminder", "message")
  .addCancelReminder("cta_cancel_reminder", "message")
  .addAddress("cta_address", "message")
  .addLocation()
  .addUrl("Google", "https://www.google.com", "https://www.google.com")
  .addCopy("Copy OTP", "123456")
  
  // Creating an interactive selection menu
  .addSelection("Click Here!")
  .makeSections("Owner Bot")
  .makeRow("", "Owner Bot", "", ".owner")
  .makeSections("Menu Bot", "Top")
  
  // Sending the message
  .run(m.chat, conn, m);
```

---

## Summary

- **Installation:**  
  Save as `Button.js` and import globally via `global.Button = require("./Button.js")` in your configuration file.

- **Chaining Methods:**  
  Every method returns the Button instance, allowing you to chain calls. This design lets you build the message step by step—from setting text and media to adding buttons and interactive selections.

- **Interactive Selections:**  
  The chain methods `addSelection`, `makeSections`, and `makeRow` work together to build a hierarchical menu:
  - **addSelection:** Starts a selection group.
  - **makeSections:** Adds sections (groups of options) within the selection.
  - **makeRow:** Adds individual options (rows) to the current section.

- **Full Integration:**  
  The final `run` method assembles the message (with all the configurations) and sends it through the Baileys connection.

This detailed documentation covers every function in the Button class—including addCopy, addUrl, and all others—complete with examples and explanations of how they work together in a chain
