let companies = [];

const companySelect = document.getElementById("companySelect");
const calculateBtn = document.getElementById("calculateBtn");
const results = document.getElementById("results");

const companyName = document.getElementById("companyName");
const csmName = document.getElementById("csmName");
const segment = document.getElementById("segment");
const arr = document.getElementById("arr");
const renewalDate = document.getElementById("renewalDate");
const slaScore = document.getElementById("slaScore");
const incidentScore = document.getElementById("incidentScore");
const csatScore = document.getElementById("csatScore");
const adoptionScore = document.getElementById("adoptionScore");
const npsScore = document.getElementById("npsScore");
const openTickets = document.getElementById("openTickets");
const executiveEngagement = document.getElementById("executiveEngagement");
const healthScore = document.getElementById("healthScore");
const healthStatus = document.getElementById("healthStatus");
const healthNotes = document.getElementById("healthNotes");

async function loadCSV() {
  const response = await fetch("customer_data.csv");
  const csvText = await response.text();
  companies = parseCSV(csvText);
  populateDropdown();
}

function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map(line => {
    const values = line.split(",");
    let company = {};

    headers.forEach((header, index) => {
      company[header.trim()] = values[index].trim();
    });

    return company;
  });
}

function populateDropdown() {
  companySelect.innerHTML = '<option value="">-- Select a company --</option>';

  companies.forEach((company, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = company.company_name;
    companySelect.appendChild(option);
  });
}

function formatARR(value) {
  return "$" + Number(value).toLocaleString();
}

function calculateOverallHealth(company) {
  const sla = Number(company.sla_score);
  const incident = Number(company.incident_score);
  const csat = Number(company.csat_score);
  const adoption = Number(company.adoption_score);

  return Math.round((sla + incident + csat + adoption) / 4);
}

function getHealthStatus(score) {
  if (score >= 90) {
    return { label: "Healthy", className: "healthy" };
  } else if (score >= 75) {
    return { label: "Watch", className: "watch" };
  } else {
    return { label: "At Risk", className: "at-risk" };
  }
}

function displayResults(company) {
  const score = calculateOverallHealth(company);
  const status = getHealthStatus(score);

  companyName.textContent = company.company_name;
  csmName.textContent = company.csm_name;
  segment.textContent = company.segment;
  arr.textContent = formatARR(company.arr);
  renewalDate.textContent = company.renewal_date;
  slaScore.textContent = company.sla_score;
  incidentScore.textContent = company.incident_score;
  csatScore.textContent = company.csat_score;
  adoptionScore.textContent = company.adoption_score;
  npsScore.textContent = company.nps_score;
  openTickets.textContent = company.open_tickets;
  executiveEngagement.textContent = company.executive_engagement;
  healthScore.textContent = score;
  healthNotes.textContent = company.health_notes;

  healthStatus.textContent = status.label;
  healthStatus.className = "status-pill " + status.className;

  results.classList.remove("hidden");
}

calculateBtn.addEventListener("click", () => {
  const selectedIndex = companySelect.value;

  if (selectedIndex === "") {
    alert("Please select a company first.");
    return;
  }

  const selectedCompany = companies[selectedIndex];
  displayResults(selectedCompany);
});

loadCSV();
