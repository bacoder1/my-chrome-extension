export default function onElementChange(selector: string, callback: Function) {
  // Check for the initial presence of the element
  callback();

  // Specify the target node to observe
  const targetNode = document.body; // Observe the entire body or a more specific parent
  const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
          callback(); // Call the function if the element is present
      }
  });

  // Options for the observer
  const config = {
      childList: true,
      subtree: true,
  };

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}
