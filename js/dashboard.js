const container =
document.getElementById("issuesContainer")

const issueCount =
document.getElementById("issueCount")

async function loadIssues(){

container.innerHTML = "Loading..."

const issues =
await getAllIssues()

issueCount.innerText =
issues.length

displayIssues(issues)

}

function displayIssues(issues){

container.innerHTML = ""

issues.forEach(issue => {

const border =
issue.status === "open"
? "border-green-500"
: "border-purple-500"

const card = document.createElement("div")

card.className =
`card bg-white shadow border-t-4 ${border}`

card.innerHTML = `
<div class="card-body">

<h2 class="card-title cursor-pointer"
onclick="openModal(${issue.id})">
${issue.title}
</h2>

<p class="text-sm text-gray-500">
${issue.description.slice(0,60)}
</p>

<p class="text-xs mt-2">
Author: ${issue.author}
</p>

</div>
`

container.appendChild(card)

})

}

async function openModal(id){

const issue =
await getSingleIssue(id)

document.getElementById("modalTitle").innerText =
issue.title

document.getElementById("modalDescription").innerText =
issue.description

issueModal.showModal()

}

async function searchIssues(){

const text =
document.getElementById("searchInput").value

const result =
await searchIssue(text)

displayIssues(result)

}

loadIssues()