function sendEmail() {
  const form = document.getElementById("appointment-form");
  const status = document.getElementById("form-status");
  const dateInput = document.getElementById("form-date");
  const submitBtn = document.getElementById("submit-btn");

  // Get input values
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  // ✅ Validate required fields
  if (!name || !email || !subject || !message) {
    status.textContent = "⚠️ Please fill in all required fields.";
    status.style.color = "orange";
    return;
  }

  // ✅ Optional: Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    status.textContent = "⚠️ Please enter a valid email address.";
    status.style.color = "orange";
    return;
  }

  // Set timestamp
  dateInput.value = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Disable button and change text
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  // Send form via EmailJS
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
