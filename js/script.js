// Get DOM elements
const bmiForm = document.getElementById('bmiForm');
const resultDiv = document.getElementById('result');

// Add form submit event listener
bmiForm.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateBMI();
});

/**
 * Calculate BMI and display results
 */
function calculateBMI() {
    // Get input values
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    // Validate inputs
    if (!weight || !height || weight <= 0 || height <= 0) {
        alert('Please enter valid weight and height values');
        return;
    }

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmi * 10) / 10;

    // Determine BMI category and appropriate styling
    const { category, resultClass } = getBMICategory(bmi);

    // Display results
    displayResults(gender, roundedBMI, category, resultClass);
}

/**
 * Determine BMI category and corresponding CSS class
 * @param {number} bmi - Calculated BMI value
 * @returns {Object} Object containing category and CSS class
 */
function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return {
            category: "Berat Badan Kurang",
            resultClass: "result-warning"
        };
    } else if (bmi < 25) {
        return {
            category: "Berat Badan Normal",
            resultClass: "result-normal"
        };
    } else if (bmi < 30) {
        return {
            category: "Berat Badan Berlebih",
            resultClass: "result-warning"
        };
    } else {
        return {
            category: "Obesitas",
            resultClass: "result-danger"
        };
    }
}

/**
 * Display BMI results in the result div
 * @param {string} gender - Selected gender
 * @param {number} bmi - Calculated BMI value
 * @param {string} category - BMI category
 * @param {string} resultClass - CSS class for styling
 */
function displayResults(gender, bmi, category, resultClass) {
    resultDiv.innerHTML = `
        <h3>Hasil BMI Anda</h3>
        <p>Jenis Kelamin: ${gender === 'male' ? 'Laki-laki' : 'Perempuan'}</p>
        <p>BMI: ${bmi}</p>
        <p>Kategori: ${category}</p>
    `;

    // Update result styling
    resultDiv.className = `result show ${resultClass}`;
}

// Input validation for weight and height
document.getElementById('weight').addEventListener('input', function(e) {
    if (this.value < 0) this.value = 0;
    if (this.value > 300) this.value = 300;
});

document.getElementById('height').addEventListener('input', function(e) {
    if (this.value < 0) this.value = 0;
    if (this.value > 300) this.value = 300;
});