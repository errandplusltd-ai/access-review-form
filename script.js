```javascript
const SUPABASE_URL = "https://bzkezkimoanooecughxa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_PUBLISHABLE_KEY";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const form = document.getElementById("accessForm");
const message = document.getElementById("message");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";
  message.textContent = "";

  const data = {
    name: document.getElementById("fullName").value.trim(),
    school_email: document.getElementById("schoolEmail").value.trim(),
    personal_email: document.getElementById("personalEmail").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    document_requested: document.getElementById("document").value.trim(),
    reason: document.getElementById("reason").value.trim()
  };

  const { error } = await supabaseClient
    .from("access_review_responses")
    .insert([data]);

  if (error) {
    console.error("Supabase error:", error);
    message.textContent = "Unable to submit your request. Please try again.";
    submitButton.disabled = false;
    submitButton.textContent = "Submit request";
    return;
  }

  message.textContent = "Your request has been submitted successfully.";
  form.reset();

  submitButton.disabled = false;
  submitButton.textContent = "Submit request";
});
```
