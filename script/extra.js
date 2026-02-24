let interviewList = [];
let rejectedList = [];
let currentTab = 'all';

const totalEl = document.getElementById('total-value');
const interviewEl = document.getElementById('interview-value');
const rejectedEl = document.getElementById('rejected-value');
const jobLengthEl = document.getElementById('job-length');
const allSection = document.getElementById('total-count');
const filterSection = document.getElementById('filtered-section');
const main = document.querySelector('main');

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');

function updateCounts() {

  const totalCards = allSection.querySelectorAll('.card-body').length;

  totalEl.innerText = totalCards;
  interviewEl.innerText = interviewList.length;
  rejectedEl.innerText = rejectedList.length;


  if (currentTab === 'all') {
    jobLengthEl.innerText = totalCards;
  } else if (currentTab === 'interview') {
    jobLengthEl.innerText = interviewList.length;
  } else {
    jobLengthEl.innerText = rejectedList.length;
  }
}
function toggleStyle(id) {
  [allBtn, interviewBtn, rejectedBtn].forEach(btn => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-soft');
  });

  const selected = document.getElementById(id);
  if (selected) {
    selected.classList.remove('btn-soft');
    selected.classList.add('btn-primary');
  }

  if (id === 'all-btn') {
    currentTab = 'all';
    allSection.classList.remove('hidden');
    filterSection.classList.add('hidden');
  } else {
    currentTab = (id === 'interview-btn') ? 'interview' : 'rejected';
    allSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderFiltered();
  }
  updateCounts();
}

main.addEventListener('click', function (event) {
  const card = event.target.closest('.card-body');
  if (!card) return;


  const jobTitle = card.querySelector('.job-title').innerText;
  const job = {
    jobTitle,
    jobName: card.querySelector('.job-name').innerText,
    salaryRange: card.querySelector('.sellery-ranges').innerText,
    description: card.querySelector('.description').innerText
  };


  if (event.target.closest('.interveiew-press')) {

    if (!interviewList.find(j => j.jobTitle === job.jobTitle)) {
      interviewList.push(job);
    }
    rejectedList = rejectedList.filter(j => j.jobTitle !== job.jobTitle);

    const badge = card.querySelector('.applied-btn');
    if (badge) {
      badge.innerText = 'Interview';
      badge.className = 'applied-btn badge badge-outline badge-success';
    }
    refreshView();
  }

  // 2. Rejected Button Logic
  if (event.target.closest('.rejected-press')) {
    if (!rejectedList.find(j => j.jobTitle === job.jobTitle)) {
      rejectedList.push(job);
    }
    interviewList = interviewList.filter(j => j.jobTitle !== job.jobTitle);

    const badge = card.querySelector('.applied-btn');
    if (badge) {
      badge.innerText = 'Rejected';
      badge.className = 'applied-btn badge badge-outline badge-error';
    }
    refreshView();
  }


  if (event.target.closest('.delete-btn')) {
    card.remove();
    interviewList = interviewList.filter(j => j.jobTitle !== jobTitle);
    rejectedList = rejectedList.filter(j => j.jobTitle !== jobTitle);
    refreshView();
  }
});

function refreshView() {
  if (currentTab !== 'all') renderFiltered();
  updateCounts();
}

function renderFiltered() {
  filterSection.innerHTML = '';
  const list = (currentTab === 'interview') ? interviewList : rejectedList;

  if (list.length === 0) {
    filterSection.innerHTML = `
    <div class="w-32 mx-auto mb-2">
    <img src="assets/jobs.png">
    </div>
      <div class="text-center">
        <h3 class="text-2xl font-bold opacity-70">No jobs Available</h3>
        <p class="opacity-50">Check back soon for new job opportunities</p>
      </div>`;
    return;
  }

  list.forEach(job => {
    const div = document.createElement('div');
    div.className = 'card-body bg-base-100 rounded-xl shadow-sm space-y-2 mb-4 border border-gray-100';
    const colorClass = (currentTab === 'interview') ? 'badge-success' : 'badge-error';

    div.innerHTML = `
      <div class="flex justify-between">
        <div>
          <h3 class="job-title font-semibold">${job.jobTitle}</h3>
          <p class="job-name text-sm opacity-60">${job.jobName}</p>
        </div>
        <button class="delete-btn text-error">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
      <p class="sellery-ranges text-sm opacity-50">${job.salaryRange}</p>
      <div class="applied-btn badge badge-outline ${colorClass}">${currentTab.toUpperCase()}</div>
      <p class="description text-sm">${job.description}</p>
      <div class="card-actions">
        <button class="interveiew-press btn btn-outline btn-success btn-xs">INTERVIEW</button>
        <button class="rejected-press btn btn-outline btn-error btn-xs">REJECTED</button>
      </div>
    `;
    filterSection.appendChild(div);
  });
}

updateCounts();