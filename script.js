let currentTab = "all";
const tabActive = ["bg-blue-800", "border-navy", "text-white"];
const tabInactive = ["bg-transparent", "text-state-700", "border-state-200"];

const allContainer = document.getElementById("all-container");
const interviewContainer = document.getElementById("interview-container");
const rejectedContainer = document.getElementById("reject-container");
const emptyState = document.getElementById("empty-state");

const totalStat = document.getElementById("state-total");
const interviewState = document.getElementById("state-interview");
const rejectedState = document.getElementById("state-rejected");
const availableState = document.getElementById("available");

function switchTab(tab) {
    const tabs = ["all", "interview", "rejected"];
    currentTab = tab;

    tabs.forEach(t => {
        const tabBtn = document.getElementById("tab-" + t);

        if (t === tab) {
            tabBtn.classList.remove(...tabInactive);
            tabBtn.classList.add(...tabActive);
        } else {
            tabBtn.classList.remove(...tabActive);
            tabBtn.classList.add(...tabInactive);
        }
    });
    [allContainer, interviewContainer, rejectedContainer]
        .forEach(section => section.classList.add("hidden"));
    if (tab === "all") allContainer.classList.remove("hidden");
    if (tab === "interview") interviewContainer.classList.remove("hidden");
    if (tab === "rejected") rejectedContainer.classList.remove("hidden");
    updateState();
}
function removeFromStatus(jobTitle) {
    [interviewContainer, rejectedContainer].forEach(container => {
        [...container.querySelectorAll(".card")].forEach(card => {
            const title = card.querySelector(".title").innerText;

            if (title === jobTitle) {
                card.remove();
            }
        });
    });
}
document.getElementById("jobs-container")
    .addEventListener("click", function (event) {
        const clickedElement = event.target;
        const card = clickedElement.closest(".card");
        if (!card) return;
        const jobTitle = card.querySelector(".title").innerText;
        if (clickedElement.classList.contains("interview")) {
            removeFromStatus(jobTitle);
            const clonedCard = card.cloneNode(true);
            clonedCard.querySelector(".state-applied").innerText = "Interview";
            interviewContainer.appendChild(clonedCard);
        }
        if (clickedElement.classList.contains("rejected")) {
            removeFromStatus(jobTitle);
            const clonedCard = card.cloneNode(true);
            clonedCard.querySelector(".state-applied").innerText = "Rejected";
            rejectedContainer.appendChild(clonedCard);
        }
        if (clickedElement.closest(".delete-btn")) {
            [...allContainer.querySelectorAll(".card")].forEach(el => {
                if (el.querySelector(".title").innerText === jobTitle) {
                    el.remove();
                }
            });
            removeFromStatus(jobTitle);
        }
        updateState();
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
switchTab(currentTab);
updateState();