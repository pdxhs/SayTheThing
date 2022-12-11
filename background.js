// Listen for the page to load
window.addEventListener("load", function() {
  // Store the text content of the page
  let oldTextContent = document.body.textContent;

  // Listen for the "keydown" event on the page
  window.addEventListener("keydown", function(event) {
    // If the extension is enabled, check if the "Left Ctrl" key was pressed
    if (extensionEnabled && event.code === "ControlLeft") {
      // Get the current text content of the page
      let newTextContent = document.body.textContent;

      // Check for differences between the old and new text content
      let diff = JsDiff.diffWords(oldTextContent, newTextContent);

      // If differences are found, highlight the new text and trigger the keyboard shortcut
      if (diff.length > 0) {
        // Highlight the new text
        diff.forEach(function(part) {
          // Check if the part is new text
          if (part.added) {
            let textNode = document.createTextNode(part.value);
            let highlightedText = document.createElement("span");
            highlightedText.style.backgroundColor = "#FFFF00";
            highlightedText.appendChild(textNode);
            part.element.parentNode.insertBefore(highlightedText, part.element);
          }
        });

        // Trigger the keyboard shortcut
        // ...

        // Store the new text content of the page
        oldTextContent = newTextContent;
      }
    }
  });

  // Listen for the enable/disable button on the extension icon
  document.querySelector(".extension-icon").addEventListener("click", function(e) {
    // Check if the enable/disable button was clicked
    if (e.target.className === "enable-disable-button") {
      // Toggle the extensionEnabled variable
      extensionEnabled = !extensionEnabled;
    }
  });
});
