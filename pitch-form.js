document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('[data-attribute="pitch-form"]');
    const steps = [...form.querySelectorAll('[data-attribute^="pitch-form-step"]')];
    const nextButtons = form.querySelectorAll('[data-attribute="pitch-form-next-btn"]');
    const prevButtons = form.querySelectorAll('[data-attribute="pitch-form-prev-btn"]');

    let currentStep = 0;

    // Initialize steps (only show step 1)
    steps.forEach((step, index) => {
        step.style.display = index === 0 ? "flex" : "none";
    });

    console.log(`Current Step: ${currentStep + 1}/${steps.length}`);

    // Email regex for basic validation
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Function to show the correct step
    const showStep = (stepIndex) => {
        if (stepIndex < 0 || stepIndex >= steps.length) return;

        steps.forEach(step => (step.style.display = "none")); // Hide all steps
        steps[stepIndex].style.display = "flex"; // Show only the correct step

        currentStep = stepIndex;
        console.log(`Current Step: ${currentStep + 1}/${steps.length}`);
        validateStep();
    };

    // Function to validate inputs in the current step
    const validateStep = () => {
        const inputs = steps[currentStep].querySelectorAll("input, textarea, select");
        const nextBtn = steps[currentStep].querySelector('[data-attribute="pitch-form-next-btn"]');

        let isValid = true;

        inputs.forEach(input => {
            if (input.type === "checkbox" || input.type === "radio") {
                const isChecked = steps[currentStep].querySelector(`input[name="${input.name}"]:checked`);
                if (!isChecked) isValid = false;
            } else {
                if (input.value.trim() === "") {
                    isValid = false;
                }

                if (currentStep === 0 && input.type === "email") {
                    const emailValue = input.value.trim();
                    if (emailValue !== "" && !isValidEmail(emailValue)) {
                        isValid = false;
                    }
                }
            }
        });

        if (nextBtn) {
            nextBtn.classList.toggle("disabled", !isValid);
        }
    };

    // Handle red border logic only on blur
    const emailInput = steps[0].querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener("blur", () => {
            const value = emailInput.value.trim();
            if (value !== "" && !isValidEmail(value)) {
                emailInput.style.border = "1px solid red";
            } else {
                emailInput.style.border = "";
            }
        });

        // Also remove red border as soon as it becomes valid while typing
        emailInput.addEventListener("input", () => {
            const value = emailInput.value.trim();
            if (isValidEmail(value)) {
                emailInput.style.border = "";
            }
        });
    }

    // Event listeners for "Next" buttons
    nextButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            if (!button.classList.contains("disabled")) {
                showStep(currentStep + 1);
            }
            event.preventDefault();
        });
    });

    // Event listeners for "Previous" buttons
    prevButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            showStep(currentStep - 1);
            validateStep();
            event.preventDefault();
        });
    });

    // Live input validation
    form.addEventListener("input", validateStep);
    form.addEventListener("change", validateStep);

    // Ensure "Next" button is disabled at the start
    validateStep();
});