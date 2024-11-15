let tabIndexCounter = 1; // Start tab index after buttons

function addCustomer() {
  const customerName = prompt("Enter Customer Name:");
  if (customerName) {
    addRow(customerName);
  }
}

function addRow(customerName) {
  const table = document.getElementById("customerTable");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
        <td>${customerName}</td>
        <td><input type="number" class="quantity" placeholder="Monthly Quantity" tabindex="${tabIndexCounter++}"></td>
        <td class="result">0</td>
        <td class="status">Not Calculated</td>
        <td class="print-status">Not Printed</td>
    `;

  table.appendChild(newRow);
}

function calculateResults() {
  const rate = parseFloat(document.getElementById("rateInput").value);
  const rows = document.querySelectorAll("#customerTable tr");

  rows.forEach((row) => {
    const quantityInput = row.querySelector(".quantity");
    const resultCell = row.querySelector(".result");
    const statusCell = row.querySelector(".status");

    if (quantityInput && quantityInput.value) {
      const quantity = parseFloat(quantityInput.value);
      const result = quantity * rate;

      resultCell.innerText = result.toFixed(2);
      statusCell.innerText = "Calculated";
    } else {
      resultCell.innerText = "0";
      statusCell.innerText = "Not Calculated";
    }
  });
}

function printRows() {
  const rows = document.querySelectorAll("#customerTable tr");
  const printSection = document.getElementById("printSection");
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const rate = parseFloat(document.getElementById("rateInput").value);

  printSection.innerHTML = ""; // Clear previous print data

  rows.forEach((row) => {
    const customerName = row.cells[0].textContent; // Correctly fetch customerName from first cell
    const quantity = row.querySelector(".quantity").value;
    const result = row.querySelector(".result").innerText;
    const status = row.querySelector(".status").innerText;
    const printStatus = row.querySelector(".print-status");

    if (status === "Not Calculated") {
      return; // Skip rows that are not calculated
    }

    if (printStatus.innerText === "Not Printed") {
      // Mark row as printed
      printStatus.innerText = "Printed";

      // Calculate the total amount
      const totalAmount =
        quantity && result !== "0"
          ? (parseFloat(quantity) * rate).toFixed(2)
          : "0";

      // Add row data to print section in the desired format
      printSection.innerHTML += `
        <div style="margin-bottom: 20px; width: 300px; border: 2px solid black; padding: 5px;">
          <div style="float: left; width: 100%; display: flex; flex-direction: column; justify-content: space-between; row-gap: 5px;">
            <center><h2>Quba Infotech</h2></center>
            <div><strong>Name:</strong> ${customerName}</div>
            <div><strong>From:</strong> ${fromDate}</div>
            <div><strong>To:</strong> ${toDate}</div>
            <div>
              <strong>Total Quantity:</strong>
              ${quantity}
            </div>
            <div>
              <strong>Total Amount:</strong>
              ${totalAmount}
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
      `;
    }
  });

  // Print the formatted rows in a new window
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Rows</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          p { margin: 10px 0; font-size: 14px; }
          hr { border-top: 1px solid #000; }
          h2 { text-align: center; }
        </style>
      </head>
      <body>
        ${printSection.innerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}
