export default function waitForElement(selector: string, callback: Function) {
  const wrapper = document.querySelector(selector); // Use querySelector with the passed selector

  if (wrapper) {
      callback(wrapper);
  } else {
      const observer = new MutationObserver((_mutations, observer) => {
          const wrapper = document.querySelector(selector); // Check for the selector again
          if (wrapper) {
              observer.disconnect(); // Stop observing once the wrapper is found
              callback(wrapper); // Call the callback with the found element
          }
      });

      // Start observing the document for changes
      observer.observe(document.body, { childList: true, subtree: true });
  }
}
