function sendEmail() {
  const form = document.getElementById("appointment-form");
  const status = document.getElementById("form-status");
  const dateInput = document.getElementById("form-date");
  const submitBtn = document.getElementById("submit-btn");

  // Set timestamp
  dateInput.value = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  // Disable button and change text
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  emailjs.sendForm("service_f182kmc", "template_1qwyrnf", form)
    .then(() => {
      status.textContent = "✅ Appointment request sent successfully!";
      status.style.color = "green";
      form.reset();
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      status.textContent = "❌ Failed to send. Please try again.";
      status.style.color = "red";
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Request";
    });
}
