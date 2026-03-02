let currentTab = "all";
const tabActive = ['bg-blue-800', 'border-navy', 'text-white'];
const tebInactive = ['bg-transparent', 'text-slate-700', 'border-slate-700'];

const allContainer = document.getElementById("all-container");
const interviewContainer = document.getElementById("interview-container");
const rejectedContainer = document.getElementById("reject-container");
const emptyState = document.getElementById("empty-state")



function switchTab(tab) {

    const tabs = ["all", "interview", "rejected"];
    for (const t of tabs) {
        const tabName = document.getElementById("tab-" + t);
        if (t === tab) {
            tabName.classList.remove(...tebInactive);
            tabName.classList.add(...tabActive);
        }
        else {
            tabName.classList.remove(...tabActive);
            tabName.classList.add(...tebInactive);
        }
    }
    const pages = [allContainer, interviewContainer, rejectedContainer];
    for (const section of pages) {
        section.classList.add("hidden");
    }
}
    // emptyState.classList.add("hidden");
    if (tab === "all") {
        allContainer.classList.remove("hidden");
        if (allContainer.children.length < 1) {
            emptyState.classList.remove("hidden")

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
        }
        //state update
        const totalState = document.getElementById("state-all");
        const interviewState = document.getElementById("state-interview");
        const rejectedSate = document.getElementById("state-rejected");
        totalState.innerText = allContainer.children.length;
        console.log(totalState)


        switchTab(currentTab);

        // all container
        document.getElementById("jobs-container").addEventListener("click", function (event) {
            const clickElement = event.target;
            const card = clickElement.closest(".card");
            const status = card.querySelector(".state-applied")
            const parent = card.parentNode;
            if (clickElement.classList.contains("interview")) {
                status.classList.add("bg-green")
                status.innerText = "Interview "
                interviewContainer.appendChild(card)
                updateState()
            }
            if (clickElement.classList.contains("rejected")) {
                status.classList.add("bg-green")
                status.innerText = "Rejected"
                rejectedContainer.appendChild(card)
                updateState()
            }
            if (clickElement.classList.contains("delete-btn")) {
                parent.removeChild(card)
                updateState()
            }

        })
        function updateState() {
            totalState.innerText = allContainer.children.length;
            interviewState.innerText = interviewContainer.children.length;
            rejectedSate.innerText = rejectedContainer.children.length;
        }
        updateState()