const companies = [
  {
    name: "Salesforce",
    sla: 96,
    incident: 91,
    csat: 94,
    adoption: 92
  },
  {
    name: "HubSpot",
    sla: 88,
    incident: 84,
    csat: 90,
    adoption: 86
  },
  {
    name: "Datadog",
    sla: 78,
    incident: 72,
    csat: 80,
    adoption: 76
  },
  {
    name: "Workday",
    sla: 93,
    incident: 89,
    csat: 91,
    adoption: 90
  },
  {
    name: "Okta",
    sla: 70,
    incident: 68,
    csat: 74,
    adoption: 71
  }
];

const companySelect = document.getElementById("companySelect");
const calculateBtn = document.getElementById("calculateBtn");
const results = document.getElementById("results");

const companyName = document.getElementById("companyName");
const slaScore = document.getElementById("slaScore");
const incidentScore = document.getElementById("incidentScore");
const csatScore = document.getElementById("csatScore");
const adoptionScore = document.getElementById("adoptionScore");
const healthScore = document.getElementById("healthScore");
const healthStatus = document.getElementById("healthStatus");

function populateDropdown() {
  companies.forEach((company, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = company.name;
    companySelect.appendChild(option);
  });
}

function calculateOverallHealth(company) {
  return Math.round(
    (company.sla + company.incident + company.csat + company.adoption) / 4
  );
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

  companyName.textContent = company.name;
  slaScore.textContent = company.sla;
  incidentScore.textContent = company.incident;
  csatScore.textContent = company.csat;
  adoptionScore.textContent = company.adoption;
  healthScore.textContent = score;

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

populateDropdown();
