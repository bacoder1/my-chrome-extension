// Listen for messages from the injected script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "DernieresNotes") {
      console.log("Received grades data:", message.data);

      // Store the data in chrome.storage
      chrome.storage.local.set({ [message.type]: message.data }, () => {
          console.log("Grades data saved to chrome.storage");
      });
  }
});