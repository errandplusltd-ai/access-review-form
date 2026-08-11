const SUPABASE_URL = "https://bzkezkimoanooecughxa.supabase.co/rest/v1/";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_9AxpZKClWmvqxjea8YS8EA_smmSm4JN";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

document.getElementById("accessForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const message = document.getElementById("message");

  const data = {
    name: document.getElementById("fullName").value.trim(),
    school_email: document.getElementById("schoolEmail").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    personal_email: document.getElementById("personalEmail").value.trim(),
    document_requested: document.getElementById("schoolemailpassword").value.trim(),
    reason: document.getElementById("reason").value.trim()
  };

  message.textContent = "Submitting...";

  const { error } = await supabaseClient
    .from("access_review_responses")
    .insert([data]);

  if (error) {
    console.error(error);
    message.textContent = "There was a problem submitting your request.";
    return;
  }

  message.textContent = "Your request has been submitted successfully.";
  this.reset();
});
