/**
 * EcoCalc &mdash; Carbon Footprint Calculator & Eco Dashboard
 * Author: Kola Sailaja
 * Technology: HTML5, CSS3, Vanilla JS, Chart.js
 */

// ==========================================================================
// 1. CONFIGURATIONS & EMISSION FACTORS (kg CO2e per unit)
// ==========================================================================
const EMISSION_FACTORS = {
  transport: {
    car: 0.18,       // per km
    bike: 0.02,      // per km
    bus: 0.08,       // per km
    train: 0.04,     // per km
    flight: 150.0    // per hour of flight
  },
  energy: {
    electricity: 0.45, // per kWh
    lpg: 2.98,         // per kg
    ac: 0.80,          // per hour of AC use
    water: 0.0003      // per liter (daily inputs scaled to monthly)
  },
  food: {
    veg: 1.5,          // per vegetarian meal
    nonveg: 6.0,       // per non-veg meal
    dairy: 0.4         // per portion of dairy
  },
  waste: {
    plastic: 2.0,      // per kg
    paper: 0.5,        // per kg
    recycled: -0.5,    // offset credit per kg
    composted: -0.2    // offset credit per kg
  }
};

const MOTIVATIONAL_SLOGANS = [
  "Small changes lead to a sustainable future.",
  "Your ecological choices shape tomorrow.",
  "Ditch the car, grab a bike, save the planet!",
  "Switch off a light, switch on your future.",
  "One less plastic bottle is a victory for the ocean.",
  "Every eco-friendly choice builds a greener tomorrow.",
  "Sustainable living is not a trend, it is our survival."
];

// Target average monthly footprint of a sustainable global citizen: ~150 kg CO2e
const TARGET_EMISSIONS_GOAL = 150.0;
// Maximum reference monthly footprint for comparison bar (e.g. high footprint limit): 800 kg CO2e
const MAX_EMISSIONS_LIMIT = 800.0;

// ==========================================================================
// 2. STATE MANAGEMENT
// ==========================================================================
let state = {
  theme: 'dark',
  inputs: {
    car: '',
    bike: '',
    bus: '',
    train: '',
    flight: '',
    electricity: '',
    lpg: '',
    ac: '',
    water: '',
    veg: '',
    nonveg: '',
    dairy: '',
    plastic: '',
    paper: '',
    recycled: '',
    composted: ''
  },
  history: []
};

// Global Chart variables for cleanup
let doughnutChartInstance = null;
let barChartInstance = null;
let lineChartInstance = null;

// Debounce helper for live calculations
function debounce(func, delay = 250) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// ==========================================================================
// 3. INITIALIZATION & DOMELEMENTS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  cacheDOM();
  loadLocalStorage();
  bindEvents();
  updateThemeUI();
  updateTabsUI();
  
  // Set random slogan
  setRandomSlogan();
  
  // First render
  runCalculations();
}

let DOM = {};
function cacheDOM() {
  DOM.html = document.documentElement;
  DOM.themeToggle = document.getElementById('theme-toggle');
  DOM.sloganBadge = document.getElementById('slogan-badge');
  DOM.mainContent = document.getElementById('main-content');
  
  // Calculator Tab Elements
  DOM.tabButtons = document.querySelectorAll('.tabs-list .tab-btn');
  DOM.tabPanels = document.querySelectorAll('.tab-panel');
  DOM.footprintForm = document.getElementById('footprint-form');
  DOM.btnPrevTab = document.getElementById('btn-prev-tab');
  DOM.btnNextTab = document.getElementById('btn-next-tab');
  DOM.validationAlert = document.getElementById('validation-alert');
  
  // Inputs
  DOM.inputs = {
    car: document.getElementById('input-transport-car'),
    bike: document.getElementById('input-transport-bike'),
    bus: document.getElementById('input-transport-bus'),
    train: document.getElementById('input-transport-train'),
    flight: document.getElementById('input-transport-flight'),
    electricity: document.getElementById('input-energy-electricity'),
    lpg: document.getElementById('input-energy-lpg'),
    ac: document.getElementById('input-energy-ac'),
    water: document.getElementById('input-energy-water'),
    veg: document.getElementById('input-food-veg'),
    nonveg: document.getElementById('input-food-nonveg'),
    dairy: document.getElementById('input-food-dairy'),
    plastic: document.getElementById('input-waste-plastic'),
    paper: document.getElementById('input-waste-paper'),
    recycled: document.getElementById('input-waste-recycled'),
    composted: document.getElementById('input-waste-composted')
  };

  // Outputs / Widgets
  DOM.qsTotalFootprint = document.getElementById('qs-total-footprint');
  DOM.qsEcoGrade = document.getElementById('qs-eco-grade');
  DOM.scoreValue = document.getElementById('score-value');
  DOM.scoreGrade = document.getElementById('score-grade');
  DOM.scoreVerdict = document.getElementById('score-verdict');
  DOM.scoreRing = document.getElementById('score-ring-indicator');
  
  DOM.totalEmissionsVal = document.getElementById('total-emissions-val');
  DOM.comparisonIndicator = document.getElementById('comparison-indicator');
  DOM.comparisonVerdict = document.getElementById('comparison-verdict');

  // Category values
  DOM.statTransportVal = document.getElementById('stat-transport-val');
  DOM.pctTransport = document.getElementById('pct-transport');
  DOM.statEnergyVal = document.getElementById('stat-energy-val');
  DOM.pctEnergy = document.getElementById('pct-energy');
  DOM.statFoodVal = document.getElementById('stat-food-val');
  DOM.pctFood = document.getElementById('pct-food');
  DOM.statWasteVal = document.getElementById('stat-waste-val');
  DOM.pctWaste = document.getElementById('pct-waste');

  // Recommendations
  DOM.recsContainer = document.getElementById('recommendations-container');

  // History & actions
  DOM.historyTableBody = document.getElementById('history-table-body');
  DOM.btnExportHistory = document.getElementById('btn-export-history');
  DOM.btnResetAll = document.getElementById('btn-reset-all');

  // Chart Toggle Buttons
  DOM.btnChartDoughnut = document.getElementById('btn-chart-doughnut');
  DOM.btnChartBar = document.getElementById('btn-chart-bar');
  DOM.btnChartLine = document.getElementById('btn-chart-line');
  DOM.chartViews = document.querySelectorAll('.chart-wrapper');
  DOM.lineChartPlaceholderInfo = document.getElementById('line-chart-placeholder-info');
}

// ==========================================================================
// 4. STORAGE & STATE PERSISTENCE
// ==========================================================================
function loadLocalStorage() {
  try {
    // Theme
    const storedTheme = localStorage.getItem('ecoTheme');
    if (storedTheme) {
      state.theme = storedTheme;
    } else {
      // System default preference
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      state.theme = prefersLight ? 'light' : 'dark';
    }

    // Inputs
    const storedInputs = localStorage.getItem('carbonInputs');
    if (storedInputs) {
      state.inputs = { ...state.inputs, ...JSON.parse(storedInputs) };
      // Distribute to DOM elements
      Object.keys(state.inputs).forEach(key => {
        if (DOM.inputs[key]) {
          DOM.inputs[key].value = state.inputs[key];
        }
      });
    }

    // History
    const storedHistory = localStorage.getItem('ecoHistory');
    if (storedHistory) {
      state.history = JSON.parse(storedHistory);
    }
  } catch (error) {
    console.error('LocalStorage not available or corrupted:', error);
  }
}

function saveInputsToStorage() {
  try {
    Object.keys(DOM.inputs).forEach(key => {
      state.inputs[key] = DOM.inputs[key].value;
    });
    localStorage.setItem('carbonInputs', JSON.stringify(state.inputs));
  } catch (error) {
    console.error('Error saving inputs to LocalStorage:', error);
  }
}

function saveHistoryToStorage() {
  try {
    localStorage.setItem('ecoHistory', JSON.stringify(state.history));
  } catch (error) {
    console.error('Error saving history to LocalStorage:', error);
  }
}

// ==========================================================================
// 5. EVENT BINDING & HANDLERS
// ==========================================================================
function bindEvents() {
  // Theme Toggle
  DOM.themeToggle.addEventListener('click', toggleTheme);

  // Live Input calculation (debounced)
  const debouncedCalculate = debounce(() => {
    saveInputsToStorage();
    runCalculations();
  }, 300);

  Object.values(DOM.inputs).forEach(input => {
    input.addEventListener('input', () => {
      // Quick validation before calculation
      if (parseFloat(input.value) < 0) {
        DOM.validationAlert.removeAttribute('hidden');
        DOM.validationAlert.textContent = `Error in "${input.previousElementSibling ? input.previousElementSibling.textContent : 'Field'}": Value cannot be negative.`;
      } else {
        DOM.validationAlert.setAttribute('hidden', '');
        debouncedCalculate();
      }
    });
  });

  // Tab buttons click
  DOM.tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      switchTab(e.currentTarget.id);
    });
    // Keyboard navigation in tabs
    btn.addEventListener('keydown', handleTabKeyboard);
  });

  // Prev/Next tab buttons
  DOM.btnPrevTab.addEventListener('click', () => navigateTab(-1));
  DOM.btnNextTab.addEventListener('click', () => navigateTab(1));

  // Form Submission (Save current calculation to history)
  DOM.footprintForm.addEventListener('submit', handleFormSubmit);

  // Chart view switches
  DOM.btnChartDoughnut.addEventListener('click', () => switchChartView('doughnut'));
  DOM.btnChartBar.addEventListener('click', () => switchChartView('bar'));
  DOM.btnChartLine.addEventListener('click', () => switchChartView('line'));

  // Export & Reset buttons
  DOM.btnExportHistory.addEventListener('click', exportHistoryJSON);
  DOM.btnResetAll.addEventListener('click', handleResetAll);
}

// ==========================================================================
// 6. LAYOUT NAVIGATION & THEME LOGIC
// ==========================================================================
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  updateThemeUI();
  
  // Re-render charts to update grid/axis colors for light/dark mode
  renderCharts(getCategoryFootprints());
}

function updateThemeUI() {
  DOM.html.setAttribute('data-theme', state.theme);
  try {
    localStorage.setItem('ecoTheme', state.theme);
  } catch (error) {
    console.error('Error saving theme to storage:', error);
  }
}

function setRandomSlogan() {
  const randIdx = Math.floor(Math.random() * MOTIVATIONAL_SLOGANS.length);
  DOM.sloganBadge.textContent = `"${MOTIVATIONAL_SLOGANS[randIdx]}"`;
}

// Tab Switches
function switchTab(tabId) {
  DOM.tabButtons.forEach(btn => {
    if (btn.id === tabId) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      btn.setAttribute('tabindex', '0');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('tabindex', '-1');
    }
  });

  const activeControl = tabId.replace('tab-', 'panel-');
  DOM.tabPanels.forEach(panel => {
    if (panel.id === activeControl) {
      panel.classList.add('active');
      panel.removeAttribute('hidden');
    } else {
      panel.classList.remove('active');
      panel.setAttribute('hidden', '');
    }
  });

  updateTabsUI();
}

function handleTabKeyboard(e) {
  const tabs = Array.from(DOM.tabButtons);
  const curIdx = tabs.indexOf(e.currentTarget);
  let nextIdx;

  if (e.key === 'ArrowRight') {
    nextIdx = (curIdx + 1) % tabs.length;
  } else if (e.key === 'ArrowLeft') {
    nextIdx = (curIdx - 1 + tabs.length) % tabs.length;
  } else if (e.key === 'Home') {
    nextIdx = 0;
  } else if (e.key === 'End') {
    nextIdx = tabs.length - 1;
  } else {
    return;
  }

  e.preventDefault();
  tabs[nextIdx].focus();
  switchTab(tabs[nextIdx].id);
}

function navigateTab(direction) {
  const tabs = Array.from(DOM.tabButtons);
  const activeTabIdx = tabs.findIndex(btn => btn.classList.contains('active'));
  const newIdx = activeTabIdx + direction;
  
  if (newIdx >= 0 && newIdx < tabs.length) {
    switchTab(tabs[newIdx].id);
    tabs[newIdx].focus();
  }
}

function updateTabsUI() {
  const tabs = Array.from(DOM.tabButtons);
  const activeTabIdx = tabs.findIndex(btn => btn.classList.contains('active'));

  DOM.btnPrevTab.disabled = activeTabIdx === 0;
  
  if (activeTabIdx === tabs.length - 1) {
    DOM.btnNextTab.textContent = "Review Results";
    DOM.btnNextTab.disabled = true;
  } else {
    DOM.btnNextTab.textContent = "Next Tab \u2192";
    DOM.btnNextTab.disabled = false;
  }
}

// Chart view switches
function switchChartView(viewName) {
  const viewBtns = [DOM.btnChartDoughnut, DOM.btnChartBar, DOM.btnChartLine];
  const activeBtnId = `btn-chart-${viewName}`;
  
  viewBtns.forEach(btn => {
    if (btn.id === activeTabButtonId(viewName)) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      btn.setAttribute('tabindex', '0');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('tabindex', '-1');
    }
  });

  const activeContainerId = `container-${viewName}`;
  DOM.chartViews.forEach(wrapper => {
    if (wrapper.id === activeContainerId) {
      wrapper.classList.add('active');
      wrapper.removeAttribute('hidden');
    } else {
      wrapper.classList.remove('active');
      wrapper.setAttribute('hidden', '');
    }
  });
}

function activeTabButtonId(viewName) {
  return `btn-chart-${viewName}`;
}

// ==========================================================================
// 7. CALCULATION ENGINE
// ==========================================================================
function safeFloat(val, fallback = 0.0) {
  const parsed = parseFloat(val);
  return isNaN(parsed) || parsed < 0 ? fallback : parsed;
}

function runCalculations() {
  // Input Validation checks
  let hasNegatives = false;
  Object.keys(DOM.inputs).forEach(key => {
    const val = parseFloat(DOM.inputs[key].value);
    if (!isNaN(val) && val < 0) {
      hasNegatives = true;
    }
  });

  if (hasNegatives) {
    DOM.validationAlert.removeAttribute('hidden');
    return;
  } else {
    DOM.validationAlert.setAttribute('hidden', '');
  }

  const categoryEmissions = getCategoryFootprints();
  const totalEmissions = categoryEmissions.transport + categoryEmissions.energy + categoryEmissions.food + categoryEmissions.waste;
  
  // Calculate Eco Score
  // 100 is best, score goes down as footprint goes up.
  // 800 kg CO2e is typically a very high score limit where Eco Score becomes 0.
  const score = Math.max(0, Math.min(100, Math.round(100 - (totalEmissions / 8.0))));
  
  updateWidgets(totalEmissions, score, categoryEmissions);
  generateRecommendations(categoryEmissions);
  renderCharts(categoryEmissions);
  renderHistoryTable();
}

function getCategoryFootprints() {
  // 1. Transportation
  const carD = safeFloat(DOM.inputs.car.value);
  const bikeD = safeFloat(DOM.inputs.bike.value);
  const busD = safeFloat(DOM.inputs.bus.value);
  const trainD = safeFloat(DOM.inputs.train.value);
  const flightH = safeFloat(DOM.inputs.flight.value);

  const transportTotal = (carD * EMISSION_FACTORS.transport.car) +
                         (bikeD * EMISSION_FACTORS.transport.bike) +
                         (busD * EMISSION_FACTORS.transport.bus) +
                         (trainD * EMISSION_FACTORS.transport.train) +
                         (flightH * EMISSION_FACTORS.transport.flight);

  // 2. Energy
  const electricity = safeFloat(DOM.inputs.electricity.value);
  const lpg = safeFloat(DOM.inputs.lpg.value);
  const ac = safeFloat(DOM.inputs.ac.value);
  const water = safeFloat(DOM.inputs.water.value); // daily

  const energyTotal = (electricity * EMISSION_FACTORS.energy.electricity) +
                      (lpg * EMISSION_FACTORS.energy.lpg) +
                      (ac * EMISSION_FACTORS.energy.ac) +
                      (water * 30 * EMISSION_FACTORS.energy.water); // scaled to monthly

  // 3. Food (weekly to monthly: * 4.33 weeks per month)
  const veg = safeFloat(DOM.inputs.veg.value);
  const nonveg = safeFloat(DOM.inputs.nonveg.value);
  const dairy = safeFloat(DOM.inputs.dairy.value);

  const foodTotal = ((veg * EMISSION_FACTORS.food.veg) +
                     (nonveg * EMISSION_FACTORS.food.nonveg) +
                     (dairy * EMISSION_FACTORS.food.dairy)) * 4.33;

  // 4. Waste (with subtraction/offsets for recycling and composting)
  const plastic = safeFloat(DOM.inputs.plastic.value);
  const paper = safeFloat(DOM.inputs.paper.value);
  const recycled = safeFloat(DOM.inputs.recycled.value);
  const composted = safeFloat(DOM.inputs.composted.value);

  const rawWaste = (plastic * EMISSION_FACTORS.waste.plastic) + 
                   (paper * EMISSION_FACTORS.waste.paper);
  const offsets = (recycled * Math.abs(EMISSION_FACTORS.waste.recycled)) + 
                  (composted * Math.abs(EMISSION_FACTORS.waste.composted));
  
  // Net Waste footprint (must not go below zero)
  const wasteTotal = Math.max(0, rawWaste - offsets);

  return {
    transport: transportTotal,
    energy: energyTotal,
    food: foodTotal,
    waste: wasteTotal,
    detailed: {
      car: carD * EMISSION_FACTORS.transport.car,
      bike: bikeD * EMISSION_FACTORS.transport.bike,
      bus: busD * EMISSION_FACTORS.transport.bus,
      train: trainD * EMISSION_FACTORS.transport.train,
      flight: flightH * EMISSION_FACTORS.transport.flight,
      electricity: electricity * EMISSION_FACTORS.energy.electricity,
      lpg: lpg * EMISSION_FACTORS.energy.lpg,
      ac: ac * EMISSION_FACTORS.energy.ac,
      water: water * 30 * EMISSION_FACTORS.energy.water,
      veg: veg * EMISSION_FACTORS.food.veg * 4.33,
      nonveg: nonveg * EMISSION_FACTORS.food.nonveg * 4.33,
      dairy: dairy * EMISSION_FACTORS.food.dairy * 4.33,
      plastic: plastic * EMISSION_FACTORS.waste.plastic,
      paper: paper * EMISSION_FACTORS.waste.paper,
      recycledOffset: -recycled * Math.abs(EMISSION_FACTORS.waste.recycled),
      compostOffset: -composted * Math.abs(EMISSION_FACTORS.waste.composted)
    }
  };
}

// ==========================================================================
// 8. UPDATE UI COMPONENTS & ANIMATIONS
// ==========================================================================
function updateWidgets(totalEmissions, score, breakdown) {
  // Format total emissions
  const formattedEmissions = totalEmissions.toFixed(2);
  DOM.qsTotalFootprint.textContent = Math.round(totalEmissions);
  DOM.totalEmissionsVal.textContent = formattedEmissions;

  // Grade evaluation
  let grade = "Excellent";
  let gradeClass = "grade-excellent";
  let verdictText = "Your ecological footprint is small and sustainable. Fantastic job!";
  
  if (score < 50) {
    grade = "Needs Improvement";
    gradeClass = "grade-poor";
    verdictText = "Your carbon footprint is high. Try using public transport or checking electricity leaks.";
  } else if (score < 70) {
    grade = "Average";
    gradeClass = "grade-average";
    verdictText = "You have an average carbon footprint. There are simple steps you can take to improve.";
  } else if (score < 90) {
    grade = "Good";
    gradeClass = "grade-good";
    verdictText = "Great effort! Your footprint is lower than average, but more optimizations are possible.";
  }

  DOM.qsEcoGrade.className = `qs-val ${gradeClass}`;
  DOM.qsEcoGrade.textContent = score >= 90 ? "A" : score >= 70 ? "B" : score >= 50 ? "C" : "D";

  // Animate numeric score text
  animateCounter(DOM.scoreValue, parseInt(DOM.scoreValue.textContent) || 0, score, 800);
  DOM.scoreGrade.className = `score-grade ${gradeClass}`;
  DOM.scoreGrade.textContent = grade;
  DOM.scoreVerdict.textContent = verdictText;

  // Animate SVG circular stroke
  // Circumference is 439.8
  const strokeOffset = 439.8 - (score / 100) * 439.8;
  DOM.scoreRing.style.strokeDashoffset = strokeOffset;
  
  // Set stroke color matching the score classification
  let strokeColor = "var(--color-excellent)";
  if (score < 50) strokeColor = "var(--color-poor)";
  else if (score < 70) strokeColor = "var(--color-average)";
  else if (score < 90) strokeColor = "var(--color-good)";
  DOM.scoreRing.style.stroke = strokeColor;

  // Comparison progress bar
  const pct = Math.min(100, (totalEmissions / MAX_EMISSIONS_LIMIT) * 100);
  DOM.comparisonIndicator.style.width = `${pct}%`;
  
  // Update indicator color based on emissions level
  let barColor = "var(--color-excellent)";
  if (totalEmissions > 450) barColor = "var(--color-poor)";
  else if (totalEmissions > 250) barColor = "var(--color-average)";
  else if (totalEmissions > 120) barColor = "var(--color-good)";
  DOM.comparisonIndicator.style.backgroundColor = barColor;

  // Comparison text
  if (totalEmissions === 0) {
    DOM.comparisonVerdict.textContent = "Start filling details to benchmark your impact.";
  } else if (totalEmissions <= TARGET_EMISSIONS_GOAL) {
    DOM.comparisonVerdict.textContent = `Under target (${Math.round((TARGET_EMISSIONS_GOAL - totalEmissions))} kg below 150kg target!)`;
  } else {
    const times = (totalEmissions / TARGET_EMISSIONS_GOAL).toFixed(1);
    DOM.comparisonVerdict.textContent = `${times}x higher than sustainable target (150 kg/mo).`;
  }

  // Category values and percentage calculations
  const total = totalEmissions || 1; // prevent divide-by-zero
  
  DOM.statTransportVal.textContent = breakdown.transport.toFixed(1);
  DOM.pctTransport.textContent = `${Math.round((breakdown.transport / total) * 100)}%`;

  DOM.statEnergyVal.textContent = breakdown.energy.toFixed(1);
  DOM.pctEnergy.textContent = `${Math.round((breakdown.energy / total) * 100)}%`;

  DOM.statFoodVal.textContent = breakdown.food.toFixed(1);
  DOM.pctFood.textContent = `${Math.round((breakdown.food / total) * 100)}%`;

  DOM.statWasteVal.textContent = breakdown.waste.toFixed(1);
  DOM.pctWaste.textContent = `${Math.round((breakdown.waste / total) * 100)}%`;
}

function animateCounter(element, start, end, duration) {
  let startTime = null;
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.round(start + progress * (end - start));
    element.textContent = value;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// ==========================================================================
// 9. DYNAMIC ACTION RECOMMENDATIONS ENGINE
// ==========================================================================
function generateRecommendations(breakdown) {
  DOM.recsContainer.innerHTML = '';

  const recList = [];

  // Transport details
  const carEmissions = breakdown.detailed.car;
  const flightEmissions = breakdown.detailed.flight;
  if (carEmissions > 80) {
    recList.push({
      category: 'transport',
      icon: '🚗',
      title: 'High Private Car Footprint',
      text: 'Car travel generates substantial emissions. Consider carpooling, combining trips, or switching to public transit (metro/bus) for commutes.',
      impact: carEmissions
    });
  }
  if (flightEmissions > 100) {
    recList.push({
      category: 'transport',
      icon: '✈️',
      title: 'High Air Travel Impact',
      text: 'Long flights produce severe high-altitude carbon. Opt for train journeys for domestic travel, or join conferences virtually to offset flight hours.',
      impact: flightEmissions
    });
  }

  // Energy details
  const electricityEmissions = breakdown.detailed.electricity;
  const acEmissions = breakdown.detailed.ac;
  if (electricityEmissions > 90) {
    recList.push({
      category: 'energy',
      icon: '💡',
      title: 'High Grid Electricity Use',
      text: 'Your household electricity footprint is high. Switch to LED lighting, pull plugs of standby electronics, and seek energy-certified appliances.',
      impact: electricityEmissions
    });
  }
  if (acEmissions > 40) {
    recList.push({
      category: 'energy',
      icon: '❄️',
      title: 'Heavy AC Power Consumption',
      text: 'Air conditioning draws heavy power. Try setting thermostats to 24-25°C (75-77°F), clean AC filters regularly, or utilize cross-ventilation/fans.',
      impact: acEmissions
    });
  }

  // Food details
  const nonvegEmissions = breakdown.detailed.nonveg;
  if (nonvegEmissions > 60) {
    recList.push({
      category: 'food',
      icon: '🥩',
      title: 'Meat-Intensive Dietary Impact',
      text: 'Meat production (especially beef and pork) is highly carbon-intensive. Incorporating a few meat-free days per week cuts diet emissions by up to 50%.',
      impact: nonvegEmissions
    });
  }

  // Waste details
  const plasticEmissions = breakdown.detailed.plastic;
  const recyclingCredit = breakdown.detailed.recycledOffset;
  if (plasticEmissions > 20) {
    recList.push({
      category: 'waste',
      icon: '🥤',
      title: 'Excessive Plastic Packaging',
      text: 'Single-use plastics have huge raw extraction costs. Switch to reusable steel bottles, cloth shopping bags, and buy foods in bulk.',
      impact: plasticEmissions
    });
  }
  if (recyclingCredit === 0 && (plasticEmissions > 0 || breakdown.detailed.paper > 0)) {
    recList.push({
      category: 'waste',
      icon: '♻️',
      title: 'No Active Waste Recycling Logged',
      text: 'You are throwing plastics/papers into normal trash. Setting up a dual-bin recycling system saves materials from landfills and offsets your footprint.',
      impact: 15.0
    });
  }

  // Sort recommendations by footprint impact descending
  recList.sort((a, b) => b.impact - a.impact);

  if (recList.length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty-recs';
    emptyDiv.textContent = 'Keep up the fantastic work! Your footprint is excellent, and you have no major red-flags.';
    DOM.recsContainer.appendChild(emptyDiv);
  } else {
    // Show top 3 recommendations to keep UI clean and actionable
    recList.slice(0, 3).forEach(rec => {
      const recCard = document.createElement('div');
      recCard.className = `rec-card`;
      recCard.innerHTML = `
        <div class="rec-icon" aria-hidden="true">${rec.icon}</div>
        <div class="rec-text">
          <h4>${rec.title}</h4>
          <p>${rec.text}</p>
        </div>
      `;
      DOM.recsContainer.appendChild(recCard);
    });
  }
}

// ==========================================================================
// 10. CHART RENDERING VIA CHART.JS (LIVE RELOAD-SAFE)
// ==========================================================================
function getChartFontColors() {
  return state.theme === 'dark' ? '#94a3b8' : '#475569';
}

function getChartGridColors() {
  return state.theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)';
}

function renderCharts(breakdown) {
  const fontColor = getChartFontColors();
  const gridColor = getChartGridColors();

  // 1. DOUGHNUT CHART (Category Breakdown)
  if (doughnutChartInstance) {
    doughnutChartInstance.destroy();
  }

  const ctxDoughnut = document.getElementById('chart-doughnut').getContext('2d');
  
  const hasEmissionsData = (breakdown.transport + breakdown.energy + breakdown.food + breakdown.waste) > 0;
  const doughnutData = hasEmissionsData 
    ? [breakdown.transport, breakdown.energy, breakdown.food, breakdown.waste]
    : [1, 1, 1, 1]; // placeholder equal split if empty inputs

  doughnutChartInstance = new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: {
      labels: ['Transport', 'Energy', 'Food', 'Waste'],
      datasets: [{
        data: doughnutData,
        backgroundColor: [
          'rgba(59, 130, 246, 0.75)',  // Blue
          'rgba(245, 158, 11, 0.75)',  // Amber/Yellow
          'rgba(16, 185, 129, 0.75)',  // Emerald
          'rgba(239, 68, 68, 0.75)'    // Red
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: fontColor,
            font: { family: 'Inter', size: 12, weight: '500' }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              if (!hasEmissionsData) return 'No data logged';
              const val = context.raw;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((val / total) * 100);
              return `${context.label}: ${val.toFixed(1)} kg CO₂e (${percentage}%)`;
            }
          }
        }
      }
    }
  });

  // 2. BAR CHART (Detailed Sources)
  if (barChartInstance) {
    barChartInstance.destroy();
  }

  const ctxBar = document.getElementById('chart-bar').getContext('2d');
  const d = breakdown.detailed;

  // Filter sources that are non-zero to keep the bar chart tidy and relevant
  const detailedLabels = [
    'Car', 'Bike', 'Bus', 'Train', 'Flight',
    'Electricity', 'LPG', 'AC', 'Water',
    'Veg Food', 'Non-Veg Food', 'Dairy Food',
    'Plastic Waste', 'Paper Waste', 'Recycling Offset', 'Compost Offset'
  ];

  const detailedValues = [
    d.car, d.bike, d.bus, d.train, d.flight,
    d.electricity, d.lpg, d.ac, d.water,
    d.veg, d.nonveg, d.dairy,
    d.plastic, d.paper, d.recycledOffset, d.compostOffset
  ];

  // Colors: Red offsets are negative bars, others are gradients
  const barColors = detailedValues.map(val => {
    if (val < 0) return 'rgba(16, 185, 129, 0.8)'; // Green offset savings
    if (val === 0) return 'rgba(255, 255, 255, 0.05)';
    return 'rgba(59, 130, 246, 0.75)'; // Standard blue
  });
  
  const barBorders = detailedValues.map(val => {
    if (val < 0) return 'rgba(16, 185, 129, 1)';
    if (val === 0) return 'rgba(255, 255, 255, 0.1)';
    return 'rgba(59, 130, 246, 1)';
  });

  barChartInstance = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: detailedLabels,
      datasets: [{
        label: 'Emissions Contribution (kg CO₂e)',
        data: detailedValues,
        backgroundColor: barColors,
        borderColor: barBorders,
        borderWidth: 1.5,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const val = context.raw;
              if (val < 0) {
                return `${context.label}: Saves ${Math.abs(val).toFixed(1)} kg CO₂e`;
              }
              return `${context.label}: ${val.toFixed(1)} kg CO₂e`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: fontColor,
            font: { family: 'Inter', size: 9 },
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: fontColor,
            font: { family: 'Inter', size: 10 }
          }
        }
      }
    }
  });

  // 3. LINE CHART (Monthly Trend)
  if (lineChartInstance) {
    lineChartInstance.destroy();
  }

  const ctxLine = document.getElementById('chart-line').getContext('2d');
  
  if (state.history.length < 2) {
    DOM.lineChartPlaceholderInfo.removeAttribute('hidden');
    DOM.lineChartPlaceholderInfo.style.display = 'block';
    
    // Create empty chart container for rendering
    lineChartInstance = new Chart(ctxLine, {
      type: 'line',
      data: { labels: [], datasets: [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { display: false } },
          y: { grid: { display: false }, ticks: { display: false } }
        }
      }
    });
  } else {
    DOM.lineChartPlaceholderInfo.setAttribute('hidden', '');
    DOM.lineChartPlaceholderInfo.style.display = 'none';

    // Sort history chronologically by timestamp/date representation
    // History contains items: { date, total, score, timestamp }
    const sortedHistory = [...state.history].sort((a, b) => a.timestamp - b.timestamp);
    const lineLabels = sortedHistory.map(h => h.date);
    const lineEmissions = sortedHistory.map(h => h.total);
    const lineScores = sortedHistory.map(h => h.score);

    lineChartInstance = new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: lineLabels,
        datasets: [
          {
            label: 'Emissions (kg CO₂e)',
            data: lineEmissions,
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.12)',
            fill: true,
            tension: 0.3,
            borderWidth: 3,
            pointBackgroundColor: 'rgba(59, 130, 246, 1)',
            yAxisID: 'y'
          },
          {
            label: 'Eco Score',
            data: lineScores,
            borderColor: 'rgba(16, 185, 129, 1)',
            backgroundColor: 'transparent',
            borderWidth: 3,
            borderDash: [5, 5],
            pointBackgroundColor: 'rgba(16, 185, 129, 1)',
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: fontColor,
              font: { family: 'Inter', size: 11, weight: '500' }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: fontColor,
              font: { family: 'Inter', size: 10 }
            }
          },
          y: {
            position: 'left',
            grid: { color: gridColor },
            ticks: {
              color: fontColor,
              font: { family: 'Inter', size: 10 }
            },
            title: {
              display: true,
              text: 'kg CO₂e',
              color: fontColor,
              font: { family: 'Inter', size: 10, weight: '600' }
            }
          },
          y1: {
            position: 'right',
            grid: { drawOnChartArea: false }, // only draw grid lines for the emissions scale
            min: 0,
            max: 100,
            ticks: {
              color: fontColor,
              font: { family: 'Inter', size: 10 }
            },
            title: {
              display: true,
              text: 'Eco Score',
              color: fontColor,
              font: { family: 'Inter', size: 10, weight: '600' }
            }
          }
        }
      }
    });
  }
}

// ==========================================================================
// 11. HISTORY AND SAVING MECHANISMS
// ==========================================================================
function handleFormSubmit(e) {
  e.preventDefault();

  // Validate inputs
  let isValid = true;
  Object.keys(DOM.inputs).forEach(key => {
    const val = parseFloat(DOM.inputs[key].value);
    if (!isNaN(val) && val < 0) {
      isValid = false;
    }
  });

  if (!isValid) {
    DOM.validationAlert.removeAttribute('hidden');
    DOM.validationAlert.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const categoryEmissions = getCategoryFootprints();
  const totalEmissions = categoryEmissions.transport + categoryEmissions.energy + categoryEmissions.food + categoryEmissions.waste;
  const score = Math.max(0, Math.min(100, Math.round(100 - (totalEmissions / 8.0))));

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const timestamp = now.getTime();

  // Create entry
  const entry = {
    id: 'eco-' + timestamp,
    date: dateStr,
    timestamp: timestamp,
    total: totalEmissions,
    score: score,
    breakdown: {
      transport: categoryEmissions.transport,
      energy: categoryEmissions.energy,
      food: categoryEmissions.food,
      waste: categoryEmissions.waste
    }
  };

  // Prevent duplicate entries for the same month - replace it if exists or just append
  // Here we just append to show monthly trend logs (multiple logs allowed in same month)
  state.history.push(entry);
  
  saveHistoryToStorage();
  runCalculations();

  // Show visual notification/feedback of success
  const btn = DOM.footprintForm.querySelector('button[type="submit"]');
  const originalHtml = btn.innerHTML;
  btn.innerHTML = 'Saved Successfully!';
  btn.style.backgroundColor = 'var(--color-excellent)';
  btn.style.color = '#ffffff';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalHtml;
    btn.style.backgroundColor = '';
    btn.style.color = '';
    btn.disabled = false;
  }, 2000);
}

function renderHistoryTable() {
  DOM.historyTableBody.innerHTML = '';

  if (state.history.length === 0) {
    DOM.historyTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="table-empty">No historical logs found. Save a calculation to track your trends over time.</td>
      </tr>
    `;
    return;
  }

  // Display logs from newest to oldest
  const reversedHistory = [...state.history].sort((a, b) => b.timestamp - a.timestamp);

  reversedHistory.forEach(entry => {
    const tr = document.createElement('tr');
    
    // Eco Grade styling for table badge
    let gradeLabel = 'D';
    let badgeClass = 'bg-grade-poor';
    if (entry.score >= 90) {
      gradeLabel = 'A';
      badgeClass = 'bg-grade-excellent';
    } else if (entry.score >= 70) {
      gradeLabel = 'B';
      badgeClass = 'bg-grade-good';
    } else if (entry.score >= 50) {
      gradeLabel = 'C';
      badgeClass = 'bg-grade-average';
    }

    tr.innerHTML = `
      <td><strong>${entry.date}</strong></td>
      <td>
        <span class="history-grade-badge ${badgeClass}" title="Score: ${entry.score}">
          Grade ${gradeLabel} (${entry.score})
        </span>
      </td>
      <td><strong>${entry.total.toFixed(1)}</strong> kg CO₂e</td>
      <td>
        <div class="history-breakdown-badges">
          <span class="breakdown-badge" title="Transport: ${entry.breakdown.transport.toFixed(1)} kg">🚗 ${Math.round(entry.breakdown.transport)}kg</span>
          <span class="breakdown-badge" title="Energy: ${entry.breakdown.energy.toFixed(1)} kg">⚡ ${Math.round(entry.breakdown.energy)}kg</span>
          <span class="breakdown-badge" title="Food: ${entry.breakdown.food.toFixed(1)} kg">🥗 ${Math.round(entry.breakdown.food)}kg</span>
          <span class="breakdown-badge" title="Waste: ${entry.breakdown.waste.toFixed(1)} kg">🗑️ ${Math.round(entry.breakdown.waste)}kg</span>
        </div>
      </td>
      <td>
        <button class="btn-delete-row" data-id="${entry.id}" aria-label="Delete this history entry" title="Delete entry">
          &times;
        </button>
      </td>
    `;

    // Bind delete row
    tr.querySelector('.btn-delete-row').addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      deleteHistoryRow(id);
    });

    DOM.historyTableBody.appendChild(tr);
  });
}

function deleteHistoryRow(id) {
  state.history = state.history.filter(h => h.id !== id);
  saveHistoryToStorage();
  runCalculations();
}

function exportHistoryJSON() {
  if (state.history.length === 0) {
    alert('No history logs to export.');
    return;
  }

  const jsonStr = JSON.stringify(state.history, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `eco-calc-history-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function handleResetAll() {
  if (!confirm('Are you sure you want to reset all calculations? This will clear current input fields and erase your entire monthly history. This action cannot be undone.')) {
    return;
  }

  // Clear inputs
  Object.keys(DOM.inputs).forEach(key => {
    DOM.inputs[key].value = '';
  });
  
  state.inputs = {};
  state.history = [];

  try {
    localStorage.removeItem('carbonInputs');
    localStorage.removeItem('ecoHistory');
  } catch (error) {
    console.error('Error clearing LocalStorage:', error);
  }

  // Reset tab selection
  switchTab(DOM.tabButtons[0].id);

  // Recalculate
  runCalculations();
}
