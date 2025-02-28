// Save the original XMLHttpRequest methods
const originalOpen = XMLHttpRequest.prototype.open;
const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
const originalSend = XMLHttpRequest.prototype.send;

// Override the open method
XMLHttpRequest.prototype.open = function (method, url) {
  // Store the URL for later use
  this._url = url;

  // Call the original open method
  return originalOpen.apply(this, arguments);
};

// Override the setRequestHeader method
XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
  // Store the request headers
  if (!this._requestHeaders) {
    this._requestHeaders = {};
  }
  this._requestHeaders[header] = value;

  // Call the original setRequestHeader method
  return originalSetRequestHeader.apply(this, arguments);
};

// Override the send method
XMLHttpRequest.prototype.send = function (body) {
  // Store the request body
  this._requestBody = body;

  // Add an event listener for the response
  this.addEventListener("load", function () {
    const url = this._url;

    // Check if this is the grades request
    if (url.includes("appelfonction/3")) {
      try {
        let responseBody;
        if (this.responseType === "" || this.responseType === "text") {
          responseBody = JSON.parse(this.responseText);
        } else if (this.responseType === "json") {
          responseBody = this.response;
        }

        // Check if this is the grades data
        if (responseBody?.nom === "DernieresNotes") {
          console.log("Intercepted grades data:", responseBody);

          // Send the data to the content script using window.postMessage
          window.postMessage(
            {
              type: "DernieresNotes",
              data: responseBody,
            },
            "*",
          );
        }
      } catch (error) {
        console.error("Error parsing response:", error);
      }
    }
  });

  // Call the original send method
  return originalSend.apply(this, arguments);
};

console.log("XMLHttpRequest interception is active.");
