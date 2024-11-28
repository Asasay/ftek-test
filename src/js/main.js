// Import our custom CSS
import "../scss/styles.scss";
import { Popover, Dropdown } from "bootstrap";

const cargoList = [
  {
    id: "CARGO001",
    name: "Строительные материалы",
    status: "transit",
    origin: "Москва",
    destination: "Казань",
    departureDate: "2024-11-24",
  },
  {
    id: "CARGO002",
    name: "Хрупкий груз",
    status: "waiting",
    origin: "Санкт-Петербург",
    destination: "Екатеринбург",
    departureDate: "2024-11-26",
  },
];

const cargoTable = document.getElementById("cargoTable");
const cargoForm = document.getElementById("cargoForm");
let filterStatus = "all";

document.querySelectorAll(".filter-option").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    filterStatus = item.getAttribute("data-value");
    renderTable(filterStatus);
  });
});

function renderTable(filter = "all") {
  cargoTable.innerHTML = "";
  cargoList
    .filter((cargo) => filter === "all" || cargo.status === filter)
    .forEach((cargo) => {
      const row = document.createElement("tr");
      switch (cargo.status) {
        case "waiting":
          row.className = "table-warning";
          break;
        case "transit":
          row.className = "table-primary";
          break;
        case "delivered":
          row.className = "table-success";
          break;
        default:
          break;
      }
      row.innerHTML = `
        <td>${cargo.id}</td>
        <td>${cargo.name}</td>
        <td>
          <select class="form-select">
            <option value="waiting" ${
              cargo.status === "waiting" ? "selected" : ""
            }>Ожидает отправки</option>
            <option value="transit" ${cargo.status === "transit" ? "selected" : ""}>В пути</option>
            <option value="delivered" ${
              cargo.status === "delivered" ? "selected" : ""
            }>Доставлен</option>
          </select>
        </td>
        <td>${cargo.origin}</td>
        <td>${cargo.destination}</td>
        <td>${cargo.departureDate}</td>
        <td><button class="btn btn-danger btn-sm">Удалить</button></td>
      `;

      row.querySelector("select").addEventListener("change", (event) => {
        updateStatus(cargo.id, event.target.value);
      });

      row.querySelector("button").addEventListener("click", (event) => {
        removeCargo(cargo.id);
      });

      cargoTable.appendChild(row);
    });
}

function updateStatus(id, status) {
  const cargo = cargoList.find((cargo) => cargo.id === id);
  if (status === "delivered" && new Date(cargo.departureDate) > new Date()) {
    alert("Нельзя установить статус 'Доставлен', если дата отправления в будущем.");
    renderTable(filterStatus);
    return;
  }
  cargo.status = status;
  renderTable(filterStatus);
}

function removeCargo(id) {
  const index = cargoList.findIndex((cargo) => cargo.id === id);
  if (index !== -1) {
    cargoList.splice(index, 1);
    renderTable(filterStatus);
  }
}

cargoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cargoName").value.trim();
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;
  const departureDate = document.getElementById("departureDate").value;

  if (!name || !departureDate) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  const newCargo = {
    id: `CARGO${String(cargoList.length + 1).padStart(3, "0")}`,
    name,
    status: "waiting",
    origin,
    destination,
    departureDate,
  };

  cargoList.push(newCargo);
  renderTable(filterStatus);
  cargoForm.reset();
});

renderTable();
