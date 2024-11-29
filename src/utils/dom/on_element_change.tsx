export default function onElementChange(selector: string, callback: Function) {
  // Check for the initial presence of the element
  callback();
  console.log("first call")

  // Specify the target node to observe
  const targetNode = document.querySelector(".interface_affV_client")!; // Observe the entire body or a more specific parent
  const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
          callback(); // Call the function if the element is present
          console.log("called")
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
