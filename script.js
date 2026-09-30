const projectData = {
  research: { type: "Design Research", meta: "First author · ASME IDETC/CIE 2026", title: "Predictive Models of Human Behavior", lede: "A research framework for bringing human behavior into engineering design decisions.", question: "How can engineers account for human behavior before a product reaches the world?", contribution: "Reviewed more than 500 papers, established a 7-class taxonomy, and mapped model usefulness across stages of engineering design.", evidence: "Peer-reviewed conference publication, presentations at ASME IDETC/CIE and UCUR, and an ASME / NSF student essay competition award.", visual: "research" },
  rover: { type: "Embedded Systems", meta: "Hardware · firmware · testing", title: "Autonomous Task-Specific Rover", lede: "A scale rover that navigates unknown terrain, follows a trajectory, and avoids obstacles.", question: "Can a small autonomous platform respond predictably to a noisy, changing physical environment?", contribution: "Developed embedded C++ finite state machines, sensor processing, PWM drivers, and closed-loop differential steering. Integrated optical and infrared sensors with custom circuits.", evidence: "Hardware-in-the-loop testing and oscilloscope debugging isolated power and signal noise across the sensor interfaces.", visual: "image", image: "assets/work/rover-testing.png", imageAlt: "Rover sensor array and custom electronics during testing" },
  akai: { type: "Product Design", meta: "User reviews · sketching · CAD · rendering", title: "AKAI MPK Mini, Reconsidered", lede: "A controller redesign shaped by the things musicians liked—and the things that kept getting in their way.", question: "How could the MPK Mini feel easier to navigate without losing the compact format people already know?", contribution: "I pulled recurring patterns from product reviews, sketched alternatives, modeled the enclosure and controls in CAD, brought in electronic components, and assembled a complete concept.", evidence: "The final direction concentrates its changes where users felt them most: navigation, display size, control layout, and perceived build quality.", visual: "image", image: "assets/work/akai-comparison.png", imageAlt: "Existing AKAI controller compared with the redesign concept", link: "assets/documents/Justin-Burton-Design-Portfolio.pdf", linkLabel: "Open Design Portfolio" },
  tonaliq: { type: "Independent Product", meta: "Founder · product design · audio", title: "TonaliQ", lede: "A second set of ears for producers who still want the final say.", question: "How can feedback point to a specific moment in a track without taking over the creative decision?", contribution: "I designed the product, including uploads, listening feedback, follow-up conversations, track history, pricing, and privacy controls.", evidence: "The live product listens to a Track, suggests a few useful things to try, and lets the producer ask questions, disagree, revise, and upload another version.", visual: "tonaliq", link: "https://tonaliq.app/", linkLabel: "Visit TonaliQ" },
  move: { type: "Web Application", meta: "Flask · registration · admin tools", title: "BYU Move Team Management", lede: "One system for the participants, mentors, and staff who keep BYU Move running.", question: "How can a growing exercise program replace scattered administrative work with one clear system?", contribution: "I built registration, participant lookup, session changes, mentor attendance, schedules, calendars, reports, semester settings, access controls, and admin tools.", evidence: "The working application combines the public program site, participant tools, and staff tools in one place.", visual: "move", link: "https://justinrburton4.github.io/Synaptech/project-move-team.html", linkLabel: "View Interactive Preview" },
  howlers: { type: "Interactive Web", meta: "React · TypeScript · fan experience", title: "Howlers Central", lede: "A fan-built playground for finding your place in the Red Rising universe.", question: "What if a fan site felt less like a wiki and more like stepping into the world?", contribution: "I designed and built the Color Quiz, Institute House Quiz, choice-driven Institute simulation, solar-system map, Howler registry, downloadable badges, saved browser profiles, and the visual identity that ties them together.", evidence: "The live experience is free at redrising.games. Quiz results can carry into the simulation and Howler profile, while saved data stays in the visitor’s browser.", visual: "howlers", link: "https://redrising.games/", linkLabel: "Enter Howlers Central" }
};

const dialog = document.querySelector(".project-dialog");
const closeButton = dialog.querySelector(".dialog-close");
let lastTrigger = null;

function makeVisual(project) {
  const visual = dialog.querySelector("[data-dialog-visual]");
  visual.className = `dialog-visual visual-${project.visual}`;
  visual.replaceChildren();
  if (project.visual === "image") {
    const image = document.createElement("img");
    image.src = project.image; image.alt = project.imageAlt;
    image.width = project.image.includes("plainview") ? 1774 : 900;
    image.height = project.image.includes("plainview") ? 887 : 507;
    visual.append(image); return;
  }
  if (project.visual === "research") { visual.innerHTML = '<span class="dialog-seven">7</span><span>model classes</span><i></i><i></i><i></i>'; return; }
  if (project.visual === "tonaliq") { visual.innerHTML = '<img src="assets/brand/tonaliq.png" width="5808" height="1945" alt="TonaliQ logo"><span>Feedback for your Track.</span>'; return; }
  if (project.visual === "move") {
    visual.innerHTML = '<div class="move-dialog-gallery"><img class="move-dialog-home" src="assets/work/byu-move-home.png" width="2507" height="1275" alt="BYU Move public homepage"><img class="move-dialog-signups" src="assets/work/byu-move-signups.png" width="2402" height="1249" alt="BYU Move session signup interface"><img class="move-dialog-sessions" src="assets/work/byu-move-sessions.png" width="2500" height="1282" alt="BYU Move staff sessions dashboard"></div>';
    return;
  }
  visual.innerHTML = '<img src="assets/brand/red-rising.png" width="1254" height="1254" alt="Red Rising Games logo"><span>Howlers Central</span>';
}

function openProject(key, updateUrl = true) {
  const project = projectData[key]; if (!project) return;
  dialog.querySelector("[data-dialog-type]").textContent = project.type;
  dialog.querySelector("[data-dialog-meta]").textContent = project.meta;
  dialog.querySelector("[data-dialog-title]").textContent = project.title;
  dialog.querySelector("[data-dialog-lede]").textContent = project.lede;
  dialog.querySelector("[data-dialog-question]").textContent = project.question;
  dialog.querySelector("[data-dialog-contribution]").textContent = project.contribution;
  dialog.querySelector("[data-dialog-evidence]").textContent = project.evidence;
  makeVisual(project);
  const link = dialog.querySelector("[data-dialog-link]");
  if (project.link) {
    link.hidden = false;
    link.href = project.link;
    link.firstChild.textContent = `${project.linkLabel} `;
  } else {
    link.hidden = true;
    link.removeAttribute("href");
    link.firstChild.textContent = "";
  }
  if (updateUrl) { const url = new URL(window.location.href); url.searchParams.set("project", key); history.pushState({ project: key }, "", url); }
  if (!dialog.open) dialog.showModal();
}

document.querySelectorAll("[data-project]").forEach((button) => button.addEventListener("click", () => { lastTrigger = button; openProject(button.dataset.project); }));

function closeProject(updateUrl = true) {
  if (dialog.open) dialog.close();
  if (updateUrl) { const url = new URL(window.location.href); url.searchParams.delete("project"); history.pushState({}, "", url); }
  lastTrigger?.focus();
}

closeButton.addEventListener("click", () => closeProject());
dialog.addEventListener("click", (event) => { if (event.target === dialog) closeProject(); });
dialog.addEventListener("cancel", (event) => { event.preventDefault(); closeProject(); });
window.addEventListener("popstate", () => { const key = new URL(window.location.href).searchParams.get("project"); if (key && projectData[key]) openProject(key, false); else if (dialog.open) dialog.close(); });
const initialProject = new URL(window.location.href).searchParams.get("project");
if (initialProject && projectData[initialProject]) openProject(initialProject, false);

function applyFilter(filter, updateUrl = true) {
  const validFilter = ["all", "hardware", "digital", "research"].includes(filter) ? filter : "all";
  document.querySelectorAll("[data-filter]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.filter === validFilter)));
  document.querySelectorAll("[data-category]").forEach((tile) => { tile.hidden = validFilter !== "all" && tile.dataset.category !== validFilter; });
  if (updateUrl) {
    const url = new URL(window.location.href);
    if (validFilter === "all") url.searchParams.delete("filter");
    else url.searchParams.set("filter", validFilter);
    history.pushState({ filter: validFilter }, "", url);
  }
}

document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => applyFilter(button.dataset.filter)));
applyFilter(new URL(window.location.href).searchParams.get("filter") || "all", false);

window.addEventListener("popstate", () => applyFilter(new URL(window.location.href).searchParams.get("filter") || "all", false));

const quickProjects = [...document.querySelectorAll("[data-aside]")];
let syncingAside = false;
function openAside(key, updateUrl = true) {
  syncingAside = true;
  quickProjects.forEach((item) => { item.open = item.dataset.aside === key; });
  queueMicrotask(() => { syncingAside = false; });
  if (updateUrl) {
    const url = new URL(window.location.href);
    if (key) url.searchParams.set("aside", key); else url.searchParams.delete("aside");
    history.pushState({ aside: key || null }, "", url);
  }
}
quickProjects.forEach((item) => item.addEventListener("toggle", () => {
  if (syncingAside) return;
  if (item.open) openAside(item.dataset.aside);
  else if (new URL(window.location.href).searchParams.get("aside") === item.dataset.aside) openAside(null);
}));
const initialAside = new URL(window.location.href).searchParams.get("aside");
if (quickProjects.some((item) => item.dataset.aside === initialAside)) openAside(initialAside, false);
window.addEventListener("popstate", () => openAside(new URL(window.location.href).searchParams.get("aside"), false));
