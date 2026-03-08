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
`card bg-wight shadow border-t-4 ${border}`

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


function displayIssues(issues){

container.innerHTML = ""

issues.forEach(issue => {

const borderColor =
issue.status === "open"
? "border-green-500"
: "border-purple-500"


/* priority color */

const priorityColor =
issue.priority === "HIGH"
? "bg-red-100 text-red-500"
: issue.priority === "MEDIUM"
? "bg-yellow-100 text-yellow-600"
: "bg-gray-200 text-gray-500"


/* status icon */

const statusIcon =
issue.status === "open"
? "assets/Open-Status.png"
: "assets/ok.png"


const card = document.createElement("div")

card.className =
`bg-white rounded-lg  shadow-sm border-t-4 ${borderColor} p-4 hover:shadow-md transition`

card.innerHTML = `

<div class="flex justify-between items-center mb-3">

<div class="flex items-center gap-2">

<img src="${statusIcon}" class="w-5 h-5"/>

</div>

<span class="text-xs px-3 py-1 rounded-full font-semibold ${priorityColor}">
${issue.priority}
</span>

</div>


<h3 onclick="openModal(${issue.id})"
class="font-semibold text-lg mb-2 cursor-pointer hover:underline">

${issue.title}

</h3>


<p class="text-gray-500 text-sm mb-3">

${issue.description.slice(0,80)}...

</p>


<div class="flex gap-2 mb-3">

<span class="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full">
BUG
</span>

<span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
HELP WANTED
</span>

</div>


<div class="border-t pt-3 text-sm text-gray-500">

<p>#${issue.id} by ${issue.author}</p>

<p>${new Date(issue.createdAt).toLocaleDateString()}</p>

</div>

`

container.appendChild(card)

})

}