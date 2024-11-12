// background.js

// Save data
chrome.storage.sync.set({ myKey: 'myValue' }, function() {
  console.log('Data saved');
});

// Retrieve data
chrome.storage.sync.get('myKey', function(result) {
  console.log('Data retrieved:', result.myKey);
});
