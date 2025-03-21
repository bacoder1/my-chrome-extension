// Listen for messages from the injected script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "DernieresNotes") {
      console.log("Received grades data:", message.data);

      chrome.storage.local.get("DernieresNotes", (result) => {
        const DernieresNotes = result.DernieresNotes || {};

        DernieresNotes[message.data.donneesSec.data.listeDevoirs.V[0].periode.V.L] = message.data;

        chrome.storage.local.set({ [message.type]: DernieresNotes }, () => {
            console.log("Grades data saved to chrome.storage");
        });
        
      });
      
      // Store the data in chrome.storage
    }
  });
  