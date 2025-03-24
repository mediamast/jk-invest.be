document.addEventListener("DOMContentLoaded", () => {

    // Get all dialog elements
    const dialogs = document.querySelectorAll("dialog");
    // Get the corresponding show buttons for each dialog
    const showButtons = document.querySelectorAll("dialog + button");
    // Get the corresponding close buttons for each dialog
    const closeButtons = document.querySelectorAll("dialog button");

    // Loop through each dialog and add event listeners
    dialogs.forEach((dialog, index) => {
        // "Show the dialog" button opens the dialog modally
        showButtons[index].addEventListener("click", () => {
            dialog.showModal();
        });

        // "Close" button closes the dialog
        closeButtons[index].addEventListener("click", () => {
            dialog.close();
        });

        // Close the dialog when clicking outside of it
        dialog.addEventListener("click", (e) => {
            const dialogDimensions = dialog.getBoundingClientRect();
            if (e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right || e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom) {
                dialog.close();
            }
        });
    });
    
});