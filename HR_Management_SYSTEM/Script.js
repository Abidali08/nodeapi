document.addEventListener("DOMContentLoaded", () => {
    fetchRegions();
    fetchCountries();
    fetchEmployees();
    fetchDepartments();
    fetchJobs();
    fetchJobHistory();
    fetchLocations();
});

const BASE_URL = "https://super-disco-7pj9jg69qwvcw6qx-3000.app.github.dev";

// CRUD functions for Regions
function fetchRegions() {
    fetch(`${BASE_URL}/regions`).then(res => res.json()).then(data => {
        const table = document.querySelector("#regionsTable tbody");
        table.innerHTML = data.map(region => `<tr>
            <td>${region.region_id}</td>
            <td>${region.region_name}</td>
            <td>
                <button onclick="updateRegion(${region.region_id})">Update</button>
                <button onclick="deleteRegion(${region.region_id})">Delete</button>
            </td>
        </tr>`).join("");
    });
}

function addRegion() {
    const regionName = document.getElementById("regionName").value;
    fetch(`${BASE_URL}/regions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region_name: regionName })
    }).then(() => fetchRegions());
}

function deleteRegion(id) {
    fetch(`${BASE_URL}/regions/${id}`, { method: "DELETE" }).then(() => fetchRegions());
}

function updateRegion(id) {
    const newName = prompt("Enter new region name:");
    fetch(`${BASE_URL}/regions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region_name: newName })
    }).then(() => fetchRegions());
}

// CRUD functions for Countries
function fetchCountries() {
    fetch(`${BASE_URL}/countries`).then(res => res.json()).then(data => {
        const table = document.querySelector("#countriesTable tbody");
        table.innerHTML = data.map(country => `<tr>
            <td>${country.country_id}</td>
            <td>${country.country_name}</td>
            <td>${country.region_id}</td>
            <td>
                <button onclick="updateCountry('${country.country_id}')">Update</button>
                <button onclick="deleteCountry('${country.country_id}')">Delete</button>
            </td>
        </tr>`).join("");
    });
}

function addCountry() {
    const countryName = document.getElementById("countryName").value;
    const regionId = document.getElementById("regionId").value;
    fetch(`${BASE_URL}/countries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country_name: countryName, region_id: regionId })
    }).then(() => fetchCountries());
}

function deleteCountry(id) {
    fetch(`${BASE_URL}/countries/${id}`, { method: "DELETE" }).then(() => fetchCountries());
}

function updateCountry(id) {
    const newName = prompt("Enter new country name:");
    const newRegionId = prompt("Enter new region ID:");
    fetch(`${BASE_URL}/countries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country_name: newName, region_id: newRegionId })
    }).then(() => fetchCountries());
}

// CRUD functions for Employees
function fetchEmployees() {
    fetch(`${BASE_URL}/employees`).then(res => res.json()).then(data => {
        const table = document.querySelector("#employeesTable tbody");
        table.innerHTML = data.map(employee => `<tr>
            <td>${employee.employee_id}</td>
            <td>${employee.first_name}</td>
            <td>${employee.last_name}</td>
            <td>${employee.email}</td>
            <td>${employee.phone_number}</td>
            <td>${employee.job_id}</td>
            <td>${employee.department_id}</td>
            <td>
                <button onclick="updateEmployee(${employee.employee_id})">Update</button>
                <button onclick="deleteEmployee(${employee.employee_id})">Delete</button>
            </td>
        </tr>`).join("");
    });
}

function addEmployee() {
    const employee = {
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone_number: document.getElementById("phone").value,
        job_id: document.getElementById("jobId").value,
        department_id: document.getElementById("departmentId").value,
    };
    fetch(`${BASE_URL}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
    }).then(() => fetchEmployees());
}

function deleteEmployee(id) {
    fetch(`${BASE_URL}/employees/${id}`, { method: "DELETE" }).then(() => fetchEmployees());
}

function updateEmployee(id) {
    const newFirstName = prompt("Enter new first name:");
    const newLastName = prompt("Enter new last name:");
    fetch(`${BASE_URL}/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: newFirstName, last_name: newLastName })
    }).then(() => fetchEmployees());
}
