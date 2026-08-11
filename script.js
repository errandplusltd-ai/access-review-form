// ──────────────────────────────────────────────
// 1. CONFIGURATION
// ──────────────────────────────────────────────

const SUPABASE_URL = "https://bzkezkimoanooecughxa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_PUBLISHABLE_KEY"; // ⚠️ Replace with your actual key

// ──────────────────────────────────────────────
// 2. INITIALIZE SUPABASE
// ──────────────────────────────────────────────

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

// ──────────────────────────────────────────────
// 3. DOM REFERENCES
// ──────────────────────────────────────────────

const form = document.getElementById("accessForm");
const message = document.getElementById("message");
const submitButton = form?.querySelector('button[type="submit"]');

// ──────────────────────────────────────────────
// 4. HELPER FUNCTIONS
// ──────────────────────────────────────────────

function setLoading(isLoading) {
  if (!submitButton) return;
  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? "Submitting..." : "Submit Request";
}

function showMessage(text, type = "info") {
  if (!message) return;
  message.textContent = text;
  message.className = "message"; // reset
  if (type === "success") {
    message.classList.add("success");
  } else if (type === "error") {
    message.classList.add("error");
  }
  message.style.display = "block";
}

function getFormData() {
  const getValue = (id) => document.getElementById(id)?.value?.trim() || "";
  return {
    name: getValue("fullName"),
    school_email: getValue("schoolEmail"),
    personal_email: getValue("personalEmail"),
    phone: getValue("phone"),
    document_requested: getValue("document"),
    reason: getValue("reason"),
  };
}

function validateFormData(data) {
  const requiredFields = ["name", "school_email", "document_requested", "reason"];
  const missing = requiredFields.filter((field) => !data[field]);
  if (missing.length > 0) {
    return {
      valid: false,
      message: `⚠️ Please fill in all required fields: ${missing.join(", ")}.`,
    };
  }
  return { valid: true };
}

// ──────────────────────────────────────────────
// 5. SUBMIT HANDLER
// ──────────────────────────────────────────────

async function handleSubmit(event) {
  event.preventDefault();

  // Reset message
  showMessage("", "info");
  setLoading(true);

  // Get & validate form data
  const data = getFormData();
  const validation = validateFormData(data);

  if (!validation.valid) {
    showMessage(validation.message, "error");
    setLoading(false);
    return;
  }

  try {
    // Insert into Supabase
    const { error } = await supabaseClient
      .from("access_review_responses")
      .insert([data]);

    if (error) {
      console.error("Supabase insertion error:", error);
      showMessage("❌ Unable to submit your request. Please try again later.", "error");
      setLoading(false);
      return;
    }

    // Success
    showMessage("✅ Your request has been submitted successfully. You'll receive access confirmation shortly.", "success");
    form.reset();

  } catch (err) {
    console.error("Unexpected error:", err);
    showMessage("❌ Something went wrong. Please check your connection and try again.", "error");
  }

  setLoading(false);
}

// ──────────────────────────────────────────────
// 6. ATTACH EVENT LISTENER
// ──────────────────────────────────────────────

if (form) {
  form.addEventListener("submit", handleSubmit);
} else {
  console.warn("Form with id 'accessForm' not found.");
}
