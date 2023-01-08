//todo: fix alert removal bug: two alerts are not showing up at the same time because they erase each other;

// REFERENCES:

// to HTML elements
const html = document.querySelector("html");
const form = document.querySelector(".b-form");
const weight = document.querySelector(".b-weight__input");
const height = document.querySelector(".b-height__input");
const submitBtn = document.querySelector(".b-btn[type='submit']");

const wContainer = document.querySelector(".b-w_alert");
const hContainer = document.querySelector(".b-h_alert");

const wAlert = document.createElement("p");
const hAlert = document.createElement("p");

let weightValue;
let heightValue;

// FUNCTIONS:

// to fix form overflow by changing viewport height on html
function fixVH() {
    if (form.lastElementChild.tagName === "P") {
        html.removeAttribute("class");
        html.classList.add("b-html__vh140");
    } else if (wAlert.textContent !== '' || hAlert.textContent !== '') {
        html.removeAttribute("class");
        html.classList.add("b-html__vh120");
    } else {
        html.removeAttribute("class");
        html.classList.add("b-html__vh110");
    }
};

// to calculate Body Mass Index
function calcBMI(weight, height) {
    let BMI = weight / ((height*1E-2) ** 2);
    BMI = Math.round(BMI*100)/100;
    console.log(BMI);
    return BMI;
};

// to alert: weight limit
function wLimitAlert() {
    weight.focus();
    weight.classList.add("alert");
    wAlert.classList.add("alert");
    wAlert.textContent = `Please type a number between 2 and 650 Kg.`;
    wContainer.appendChild(wAlert);
};

// to alert: height limit
function hLimitAlert() {
    height.focus();
    height.classList.add("alert");
    hAlert.classList.add("alert");
    hAlert.textContent = `Please type a number between 30 and 250 cm.`;
    hContainer.appendChild(hAlert);
};

// to alert: weight NaN input
function wNaNAlert() {
    weight.focus();
    weight.classList.add("alert");
    wAlert.classList.add("alert");
    wAlert.textContent = `Please type a number.`;
    wContainer.appendChild(wAlert);
};

// to alert: height NaN input
function hNaNAlert() {
    height.focus();
    height.classList.add("alert");
    hAlert.classList.add("alert");
    hAlert.textContent = `Please type a number.`;
    hContainer.appendChild(hAlert);
};

// to check if values are within limits
function inputLimit() {
    if (weightValue < 2 || weightValue > 650) {
        removeAlerts();
        removeResults();
        wLimitAlert();

    } else if (heightValue < 30 || heightValue > 250) {
        removeAlerts();
        removeResults();
        hLimitAlert();

    } else {
        return true;
    }
};

// to remove previous alerts:
function removeAlerts() {
    if (wAlert.textContent !== '') {
        weight.classList.remove("alert");
        wContainer.removeChild(wAlert);
        wAlert.textContent = '';
    } else if (hAlert.textContent !== '') {
        height.classList.remove("alert");
        hContainer.removeChild(hAlert);
        hAlert.textContent = '';
    }
};

// to remove previous results
function removeResults() {
    while (form.lastElementChild.tagName === "P") {
    form.removeChild(form.lastElementChild);
    console.log(`Deleted 1 paragraph.`);
}
};

// FUNCTIONALITY:

// begin ready for typing
weight.focus();

// Event listeners:
weight.addEventListener("input", (e) => {
    
    weightValue = Number(e.target.value);

    if (!weightValue) {
        removeAlerts();
        removeResults();
        wNaNAlert();

    } else if (weightValue < 2 || weightValue > 650) {
        removeAlerts();
        removeResults();
        wLimitAlert();

    } else {
        removeAlerts();
        removeResults();
    }
});

height.addEventListener("input", (e) => {
    
    heightValue = Number(e.target.value);

    if (!heightValue) {
        removeAlerts();
        removeResults();
        hNaNAlert();

    } else if (heightValue < 30 || heightValue > 250) {
        removeAlerts();
        removeResults();
        hLimitAlert();

    } else {
        removeAlerts();
        removeResults();
    }
});

submitBtn.addEventListener('click', (e) => {

    // avoid sending form
    e.preventDefault();

    //taking value strings and returning numbers
    weightValue = Number(weight.value);
    heightValue = Number(height.value);

    // checking if both inputs are there && are numbers && are not empty strings
    if (weightValue && heightValue) {
        
        // removing alerts and results
        removeAlerts();
        removeResults();

        // checking if values are within limits
        if (inputLimit()) {
            
            // declaring result and paragraphs, then appending main result first
            const result = calcBMI(weightValue, heightValue);
            const paraResult = document.createElement("p");
            const paraClassification = document.createElement("p");
            
            paraResult.textContent = `With ${weightValue} Kg and ${heightValue} cm you have a BMI of ${result}Kg/m\u00B2.`;
            form.appendChild(paraResult);

            // choosing correct classification and appending it after main result
            if (result < 18.5) {
                paraClassification.textContent = `Go eat a cupcake, you are underweight.`;
            } else if (18.5 <= result && result < 24.9) {
                paraClassification.textContent = `Keep doing what you're doing, you are in the healthy weight range.`;
            } else if (24.9 <= result && result < 29.9) {
                paraClassification.textContent = `Maybe try to spend some more calories and avoid those cookies, because you are overweight...
                But don't stress over it, life is too short. 
                On second thought, go on and eat those cookies!`;
            } else {
                paraClassification.textContent = `Okay, it may be time to visit the doctor and make sure you are doing alright, because it seems you are obese.
                Remember to take care of yourself too.`;
            }
            form.appendChild(paraClassification);
            weight.value = '';
            height.value = '';
        };
        
    } else if (!weightValue) {
        removeAlerts();
        removeResults();
        wNaNAlert();
        
    } else if (!heightValue) {
        removeAlerts();
        removeResults();
        hNaNAlert();
    } 
    fixVH();
});