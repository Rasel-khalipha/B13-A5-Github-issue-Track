if (document.referrer === "") {
	window.location.href = "index.html";
}

// Toggle button style when clicked
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

let allIssues = [];

// loading spinner

const loadingSpinner = (status) => {
	if (status === true) {
		document.getElementById("spinner").classList.remove("hidden");
		document.getElementById("card-container").classList.add("hidden");
	} else {
		document.getElementById("spinner").classList.add("hidden");
		document.getElementById("card-container").classList.remove("hidden");
	}
};

const loadingModalSpinner = (status) => {
	if (status === true) {
		document.getElementById("modal-spinner").classList.remove("hidden");
	} else {
		document.getElementById("modal-spinner").classList.add("hidden");
	}
};

function toggleBtnStyle(id) {
	loadingSpinner(true);
	setTimeout(() => {
		const buttons = [allBtn, openBtn, closedBtn];
		buttons.forEach((btn) => {
			if (btn.id === id) {
				btn.classList.add("bg-[#4A00FF]", "text-white");
			} else {
				btn.classList.remove("bg-[#4A00FF]", "text-white");
			}
		});

		let filteredData = [];

		if (id === "all-btn") {
			filteredData = allIssues;
		} else if (id === "open-btn") {
			filteredData = allIssues.filter((issue) => issue.status === "open");
		} else if (id === "closed-btn") {
			filteredData = allIssues.filter((issue) => issue.status === "closed");
		}
		document.getElementById("total-count").innerText = filteredData.length;
		loadCardIssues(filteredData);
	}, 50);
}

// Card container

const cardContainer = async () => {
	loadingSpinner(true);
	const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
	const res = await fetch(url);
	const data = await res.json();
	allIssues = data.data;
	toggleBtnStyle("all-btn");
	loadingSpinner(false);
};
cardContainer();

// multiple labels button show
const createElements = (arr) => {
	const htmlElements = arr.map((el) => {
		const label = labelMap[el] || labelMap["wanted"];
		return ` <span style="background: ${label.bg}; border: 1px solid ${label.border}; color:${label.text};"
					 class=" rounded-full uppercase text-xs font-medium px-3 py-[5px] mt-4 flex items-center gap-1 "
					>
					<i class="${label.icon}"></i> ${el}
				</span>`;
	});
	return htmlElements.join(" ");
};

const labelMap = {
	enhancement: {
		bg: " #DEFCE8",
		border: " #BBF7D0",
		text: "#00A96E",
		icon: "fa-regular fa-star",
	},
	bug: {
		bg: " #FEECEC",
		border: " #FECACA",
		text: "#EF4444",
		icon: "fa-solid fa-bug",
	},
	wanted: {
		bg: " #FFF8DB",
		border: " #FDE68A",
		text: "#D97706",
		icon: "fa-solid fa-life-ring",
	},
};

const loadIssueDetail = async (id) => {
	loadingModalSpinner(true);
	const url = ` https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

	const res = await fetch(url);
	const details = await res.json();

	document.getElementById("issue_detail").showModal();
	displayIssueDetail(details.data);
	loadingModalSpinner(false);
};

const displayIssueDetail = (issue) => {
	const author = issue.author
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
	const assignee = issue.assignee
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	const style =
		issue.priority.trim().toLowerCase() === "high"
			? "bg-[#EF4444] text-[#fff]"
			: issue.priority.trim().toLowerCase() === "medium"
				? "bg-[#F59E0B] text-[#fff]"
				: "bg-[#9CA3AF] text-[#fff]";

	const issueDetail = document.getElementById("issue-detail");
	issueDetail.innerHTML = `

						<div>
							<h2 class="font-bold text-2xl text-[#1F2937] mb-2">
								${issue.title}
							</h2>
						</div>
						<div class="flex items-center gap-2">
							${
								issue.status === "open"
									? `<button class="bg-[#00A96E] font-medium text-xs text-white rounded-full px-2 py-[6px] border-none outline-none">
								Opened
							</button>`
									: `<button class="bg-[#A855F7] font-medium text-xs text-white rounded-full px-2 py-[6px] border-none outline-none">
								Closed
							</button>`
							}
							<span class="w-1 h-1 bg-[#64748B] rounded-full"></span>
							<span class="font-normal text-xs text-[#64748B]"
								> Opened by ${author} </span
							>

							<span class="w-1 h-1 bg-[#64748B] rounded-full"></span>
							<span class="font-normal text-xs text-[#647488]">${new Date(issue.createdAt).toLocaleDateString("en-US")}</span>
						</div>
						<div class="flex justify-start items-center gap-1 my-6">
							${createElements(issue.labels)}
						</div>
						<div class="flex justify-start items-center gap-1">
							<p class="font-normal text-base text-[#64748B]">
								${issue.description}
							</p>
						</div>
						<div class="grid grid-cols-2 items-center bg-[#F8FAFC] rounded-lg mt-6 p-4">
							<div>
								<p class="font-normal text-base text-[#64748B] mb-1">Assignee:</p>
								<h3 class="font-semibold text-base text-[#1F2937]">
									${issue.assignee === "" || issue.assignee === null ? "No Name" : assignee}
								</h3>
							</div>
							<div>
								<p class="font-normal text-base text-[#64748B] mb-1">Priority:</p>
								<button
									class="font-medium text-xs ${style} rounded-full py-[6px] px-4"
								>
									${issue.priority.toUpperCase()}
								</button>
							</div>
						</div>
	
	
	`;
};

const loadCardIssues = async (array) => {
	loadingSpinner(true);

	array.forEach((issue) => {
		const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issue.id}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				const arr = Array.isArray(data.data) ? data.data : [data.data];
			});
	});

	// 	{
	//     "id": 46,
	//     "title": "Implement data backup system",
	//     "description": "Set up automated daily backups of database with retention policy and restore procedures.",
	//     "status": "open",
	//     "labels": [
	//         "enhancement"
	//     ],
	//     "priority": "high",
	//     "author": "backup_bruce",
	//     "assignee": "db_admin",
	//     "createdAt": "2024-02-08T09:15:00Z",
	//     "updatedAt": "2024-02-08T09:15:00Z"
	// }

	const cardContainer = document.getElementById("card-container");
	cardContainer.innerHTML = "";

	array.forEach((issueItem) => {
		const style =
			issueItem.priority.trim().toLowerCase() === "high"
				? "bg-[#FEECEC] text-[#EF4444]"
				: issueItem.priority.trim().toLowerCase() === "medium"
					? "bg-[#FFF6D1] text-[#F59E0B]"
					: "bg-[#EEEFF2] text-[#9CA3AF]";

		const borderColor =
			issueItem.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]";

		const statusIcon =
			issueItem.status === "open"
				? "./assets/Open-Status.png"
				: "./assets/Closed- Status .png";

		const issueCard = document.createElement("div");
		issueCard.innerHTML = `<div  onclick="loadIssueDetail(${issueItem.id})" class="card-item card-box-shadow rounded max-w-[350px] border-t-4 ${borderColor}">
						<div class="pt-4 pl-4 pr-4">
							<div class="flex justify-between items-center">
								<img src="${statusIcon}" alt="" />
								
							
							<button class="${style} rounded-2xl w-20 py-[5px] px-3 font-medium text-xs uppercase">
								${issueItem.priority}
							</button>
							</div>
							<div class="mt-3 flex-grow">
								<h3 class="font-semibold text-sm text-[#1F2937]">
									${issueItem.title}
								</h3>
								<p class="font-normal text-xs text-[#64748B] mt-2 line-clamp-2">
									${issueItem.description}
								</p>
							</div>
							<div class="flex justify-start items-center gap-1">	
							${createElements(issueItem.labels)}
							</div>
						</div>
						<div class="divider"></div>

						<div class="pl-4 pb-4 pr-4 space-y-[8px]">
							<p class="font-normal text-xs text-[#64748B]">#${issueItem.id} by ${issueItem.author}</p>
							<p class="font-normal text-xs text-[#64748B]">${new Date(issueItem.createdAt).toLocaleDateString("en-US")}</p>
						</div>
					</div>`;

		cardContainer.append(issueCard);
	});
	loadingSpinner(false);
};

document.getElementById("btn-search").addEventListener("click", () => {
	const input = document.getElementById("input-search");
	const searchValue = input.value.trim().toLowerCase();
	console.log(searchValue);
	input.value = "";

	loadingSpinner(true);
	fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
		.then((res) => res.json())
		.then((data) => {
			const allIssues = data.data;

			loadingSpinner(true);
			const filterIssues = allIssues.filter((issue) =>
				issue.title.toLowerCase().includes(searchValue),
			);
			document.getElementById("total-count").innerText = filterIssues.length;
			loadCardIssues(filterIssues);
			loadingSpinner(false);
		});

	loadingSpinner(false);
});
