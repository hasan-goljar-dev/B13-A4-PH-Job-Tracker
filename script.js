let currentTab = "all";
const tabActive = ["bg-blue-800", "border-navy", "text-white"];
const tabInactive = ["bg-transparent", "text-state-700", "border-state-200"];


const allContainer = document.getElementById("all-container");
const interviewContainer = document.getElementById("interview-container");
const rejectedContainer = document.getElementById("reject-container");
const emptyState = document.getElementById("empty-state")
function switchTab(tab) {
    const tabs = ["all", "interview", "rejected"];
    currentTab = tab;
    for (const t of tabs) {
        const tabName = document.getElementById("tab-" + t);
        if (t === tab) {
            tabName.classList.remove(...tabInactive);
            tabName.classList.add(...tabActive);
        }
        else {
            tabName.classList.remove(...tabActive);
            tabName.classList.add(...tabInactive)
        }
    }
    const allPart = [allContainer, interviewContainer, rejectedContainer]
    for (const section of allPart) {
        section.classList.add("hidden");
    }
    emptyState.classList.add("hidden")
    if (tab === "all") {
        allContainer.classList.remove("hidden");
        if (allContainer.children.length < 1) {
            emptyState.classList.remove("hidden")
        }

    }
    else if (tab === "interview") {
        interviewContainer.classList.remove("hidden");
        if (interviewContainer.children.length < 1) {
            emptyState.classList.remove("hidden")
        }
    }
    else {
        rejectedContainer.classList.remove("hidden");
        if (rejectedContainer.children.length < 1) {
            emptyState.classList.remove("hidden")
        }
    }
    updateState();
}

// state Update
const totalStat = document.getElementById("state-total");
const interviewState = document.getElementById("state-interview");
const rejectedState = document.getElementById("state-rejected");



const availableState = document.getElementById("available");

totalStat.innerText = allContainer.children.length;





switchTab(currentTab);
document.getElementById("jobs-container")
    .addEventListener("click", function (event) {
        const clickedElement = event.target;
        const card = clickedElement.closest(".card");
        const parent = card.parentNode;
        if (clickedElement.classList.contains("interview")) {
            const badge = card.querySelector(".state-applied");

            badge.innerText = "Interview";

            interviewContainer.appendChild(card);
            updateState()
        }
        if (clickedElement.classList.contains("rejected")) {
            const badge = card.querySelector(".state-applied");

            badge.innerText = "Rejected";

            rejectedContainer.appendChild(card);
            updateState()
        }
        if (clickedElement.classList.contains("delete-btn")) {
            parent.removeChild(card);
            updateState()
        }

    });
function updateState() {

    const counts = {
        all: allContainer.children.length,
        interview: interviewContainer.children.length,
        rejected: rejectedContainer.children.length
    };
    totalStat.innerText = counts.all;
    interviewState.innerText = counts.interview;
    rejectedState.innerText = counts.rejected;


    availableState.innerText = counts[currentTab];
    if (counts[currentTab] < 1) {
        emptyState.classList.remove("hidden");
    } else {
        emptyState.classList.add("hidden");
    }
}
updateState();