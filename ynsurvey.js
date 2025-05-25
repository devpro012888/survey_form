// This script handles the form submission and progress bar update for the survey
document.addEventListener("input", updateProgressBar);

function updateProgressBar() {
  // All required fields
  const requiredFields = document.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let filled = 0;
  const countedRadioNames = new Set();

  requiredFields.forEach(field => {
    if ((field.type === "radio" || field.type === "checkbox") && !countedRadioNames.has(field.name)) {
      countedRadioNames.add(field.name);
      const group = document.querySelectorAll(`input[name='${field.name}']`);
      if ([...group].some(el => el.checked)) filled++;
    } else if (field.type !== "radio" && field.type !== "checkbox" && field.value && field.value.trim() !== "") {
      filled++;
    }
  });

  const percent = requiredFields.length === 0
    ? 0
    : Math.round((filled / requiredFields.length) * 100);

  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  if (progressBar) {
    progressBar.style.width = percent + "%";
    progressBar.setAttribute("aria-valuenow", percent);
  }
  if (progressText) {
    progressText.innerText = percent + "%";
  }
}
//Form Alert
window.onload = function() {
  alert("Welcome to the Yeoman Survey Form! Please fill out the survey form. Your feedback is important to us.");
};

