# Video Speed Controller Chrome Extension

## Overview

The Video Speed Controller Chrome extension allows users to adjust the playback speed of videos on any website. It provides a simple slider interface to change the speed from 0.1x to 3.0x in increments of 0.15x. The selected speed is applied automatically to all videos across different websites until changed.

### Features

- Adjust video playback speed using a range slider.
- Save the preferred playback speed and apply it to all videos on any website.
- Automatically apply the saved speed to newly added videos on the webpage.

## Installation

- Clone or download the repository.
- Open Chrome and navigate to chrome://extensions/
- Enable "Developer mode" in the top right corner.
- Click "Load unpacked" and select the extension's directory.

## Components

### 1. manifest.json

Configures the extension's metadata and permissions required for its functionality.

Key points:

- Uses Manifest V3, the latest version for Chrome extensions.
- Requests permissions for storage, activeTab, and scripting.
- Defines the background script, popup, and icons.
- Specifies the content scripts that are injected into webpages, including the content.js script.

Permissions

- storage: Allows the extension to store and retrieve the playback speed setting.
- activeTab: Grants the extension temporary access to the active tab when the user interacts with the extension.
- scripting: Enables the extension to execute scripts on web pages to control video playback speed.

### 2. background.js

This script runs in the background and manages the extension's core functionality.

Key functions:

- Initializes the default speed (1.0x) when the extension is installed.
- Listens for clicks on the extension icon and applies the current speed to videos on the active tab.

- `chrome.runtime.onInstalled.addListener`: This event is fired when the extension is installed. It sets the default playback speed to 1.0.
- `chrome.action.onClicked.addListener`: This event is triggered when the extension's action button is clicked. It retrieves the current speed setting from Chrome's storage and executes the setVideoSpeed function in the active tab.
- `setVideoSpeed(speed)`: This function sets the playback speed of all video elements on the page. It also sets up a MutationObserver to ensure that any new videos added to the page will have the same playback speed.

### 3. content.js

This script is injected into web pages to interact with video elements.

Key functions:

- Retrieves the stored speed and applies it to all video elements on the page.
- Sets up a MutationObserver to apply the speed to newly added video elements.

- `chrome.storage.sync.get("speed", callback)`: Retrieves the current speed setting from Chrome's storage.
- `MutationObserver`: Observes changes in the DOM to ensure that any new video elements added to the page will have the correct playback speed.

### 5. popup.js

This script handles the functionality of the popup interface.

Key functions:

- Loads the current speed from storage and sets the slider position.
- Updates the speed value display as the slider moves.
- Saves the new speed to storage when changed.
- Applies the new speed to videos on the active tab.

- `document.addEventListener("DOMContentLoaded", function () {...})`: Initializes the popup by setting the slider value and displaying the current speed. Adds an event listener to the slider to update the video speed in storage and apply it to the current tab when the slider is moved.
- `speedRange.addEventListener("input", callback)`: Updates the speed setting in Chrome's storage and applies the new speed to the active tab when the user adjusts the speed range input.
- `setVideoSpeed(speed)`: Similar to the function in background.js, this function sets the playback speed of all video elements on the page and ensures that any new videos added to the page will have the same speed.
