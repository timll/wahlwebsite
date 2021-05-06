window.addEventListener("load", onLoad);

const answer = {
    yes: 0,
    neutral: 1,
    no: 2,
    skip: 3,
    empty: 4,
}

let data = null;
let currentThesis = 0;
let answers = [];
let isImportant = false;

function onLoad() {
    fetch("/data/answers.json").then(res => res.json())
        .then(json => {
            data = json;
            currentThesis = 0;
            initCallbacks();
            initAnswers();
            recreatePagination();
            loadThesis();
            document.querySelector("#loading").classList.add("hidden");
            document.querySelector("#btn-start").classList.remove("hidden");
        })
        .catch(error => {
            document.querySelector("#error-msg").classList.remove("hidden");
        });
}

function initAnswers() {
    for (let i = 0; i < Object.keys(data.theses).length; i++) {
        answers.push([answer.empty, false]);
    }
}

function initCallbacks() {
    document.querySelector("#btn-start").addEventListener("click", showStudiomat);
    document.querySelector("#btn-important").addEventListener("click", toggleImportant);
    document.querySelector("#btn-yes").addEventListener("click", doYes);
    document.querySelector("#btn-neutral").addEventListener("click", doNeutral);
    document.querySelector("#btn-no").addEventListener("click", doNo);
    document.querySelector("#btn-skip").addEventListener("click", doSkip);
}

function showStudiomat() {
    currentThesis = 0;
    document.querySelector("#start").classList.add("hidden");
    document.querySelector("#studiomat").classList.remove("hidden");
}

function resetImportant() {
    const btn = document.querySelector("#btn-important");
    isImportant = false;
    btn.textContent = "These doppelt gewichten";
    btn.classList.remove("text-yellow");
}

function toggleImportant() {
    const btn = document.querySelector("#btn-important");
    if (isImportant) {
        isImportant = false;
        btn.textContent = "These doppelt gewichten";
        btn.classList.remove("text-yellow");
    } else {
        isImportant = true;
        btn.textContent = "These wird doppelt gewichtet";
        btn.classList.add("text-yellow");
    }
}

function doYes() {
    answers[currentThesis] = [answer.yes, isImportant];
    document.querySelector("#btn-yes").blur();
    recreatePagination();
	nextThesisAfterSelection();
}

function doNeutral() {
    answers[currentThesis] = [answer.neutral, isImportant];
    document.querySelector("#btn-neutral").blur();
    recreatePagination();
	nextThesisAfterSelection();
}

function doNo() {
    answers[currentThesis] = [answer.no, isImportant];
    document.querySelector("#btn-no").blur();
    recreatePagination();
	nextThesisAfterSelection();
}

function doSkip() {
    answers[currentThesis] = [answer.skip, isImportant];
    document.querySelector("#btn-skip").blur();
    recreatePagination();
	nextThesisAfterSelection();
}

function recreatePagination() {
    const pagination = document.querySelector("#pagination");
    // clear pagination
    while (pagination.firstChild) {
        pagination.firstChild.remove()
    }

    // add new entries
    for (let i = 0; i < Object.keys(data.theses).length; i++) {
        pagination.innerHTML += '<div class="w-full flex justify-center items-center hover:bg-gray-200 cursor-pointer leading-5 transition duration-150 ease-in border-t-2 border-transparent ' + getPaginationClasses(i) + ' " onclick="loadThesisNumber(' + i + ')">' + (i + 1) + '</div>';
    }
}

function getPaginationClasses(i) {
    switch(answers[i][0]) {
        case answer.yes:
            return "bg-green hover:bg-green-dark text-white";
            break;
        case answer.neutral:
            return "bg-yellow-normal hover:bg-yellow-dark text-white";
            break;
        case answer.no:
            return "bg-red hover:bg-red-dark text-white";
            break;
        case answer.skip:
            return "bg-gray-400 hover:bg-gray-500 text-white";
        case answer.empty:
        default:
            return "";
    }
}

function loadThesis() {
    if (currentThesis < 0) {
        currentThesis = 0;
    }

    if (currentThesis >= Object.keys(data.theses).length) {
        currentThesis = Object.keys(data.theses).length - 1;
    }
    resetImportant();

    let thesis_id = "" + currentThesis;
    document.querySelector("#thesis-text").textContent = data.theses[thesis_id].l;
    document.querySelector("#thesis-number").textContent = "These " + (currentThesis + 1);
	document.querySelector('#thesis-more').textContent = data.theses[thesis_id].x;

    updateProgressBar();
}

function nextThesisAfterSelection() {
    nextThesis();
}

function nextThesis() {
	currentThesis++;
	if (currentThesis == Object.keys(data.theses).length) {
		showResults();
	} else {
		loadThesis();
	}
}

function prevThesis() {
	currentThesis--;
	loadThesis();
}

function loadThesisNumber(i) {
    currentThesis = i;
    loadThesis();
}

function updateProgressBar() {
	let percentage = Math.round(100 * (currentThesis + 0.5) / Object.keys(data.theses).length);
	document.querySelector("#progress-bar").style.width = ""+ percentage + "%";
}

function showResults() {
    document.querySelector("#studiomat").classList.add("hidden");
	let maxAchievablePoints = 0;
	for (let i = 0; i < answers.length; i++) {
		maxAchievablePoints += calculateMaxPoints(answers[i]);
	}

    let results = [];
	for (list_id in data.lists) {
		let pointsForList = 0;
		for (let i = 0; i < answers.length; i++) {
			let thesis_id = "" + i;
			pointsForList += calculatePairPoints(answers[i], data.answers[list_id][thesis_id].selection);
		}
		let list = data.lists[list_id].name_x;
		results.push([list, pointsForList]);
	}

    results.sort(function (a, b) { if (a[1] == b[1]) { return 0; } else if (a[1] > b[1]) return -1; return 1; })
    document.querySelector('#result-summary').innerHTML = "";
    for (let i=0; i < results.length; i++) {
		let result = results[i];
		let list = result[0];
		let pointsForList = result[1];
		addResultSummary(list, pointsForList, maxAchievablePoints);
	}

    document.querySelector('#result-details').innerHTML = "";
    for (i in data.theses)
        addResultDetail(i);

    document.querySelector("#results").classList.remove("hidden");
}

function addResultSummary(list, pointsForList, maxAchievablePoints) {
	let percentage = Math.round(pointsForList / maxAchievablePoints * 100);
	let text_percentage = pointsForList + "/" + maxAchievablePoints + " Punkte";
    const str = `<div class="flex flex-row items-center justify-center my-1">
        <div class="mr-2" style="width: 13ch">` + list + `</div>
        <div class="w-full overflow-hidden h-8 text-sm flex bg-purple bg-purple-light relative">
            <span class="absolute top-0 left-2 text-white leading-8">
                `+ text_percentage +`
            </span>
            <div style="width: `+ percentage +`%"
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple opacity-light">
            </div>
        </div>
    </div>`
	document.querySelector('#result-summary').innerHTML += str;
}

function addResultDetail(thesis_id) {
    if (answers[thesis_id][0] == answer.skip || answers[thesis_id][0] == answer.empty)
        return;

    let html = `<details class="bg-gray-200 rounded p-2 my-4">
                    <summary class="cursor-pointer">
                        <span>`+ data.theses[thesis_id].s +`</span>
                        <span class="text-xs">`+ data.theses[thesis_id].l +`</span>
                        <div class="flex flex-row flex-wrap">`
    html += getSelectionMarker(answers[thesis_id][1] ? "Deine Wahl" : "Deine Wahl x2", answers[thesis_id][0]) + '</span><span class="m-1">|</span>'
    for (list_id in data.lists)
        html += getSelectionMarker(data.lists[list_id].name_x, data.answers[list_id][thesis_id].selection)
    html +=         `</summary>
                    <div class="flex flex-col pt-4 pl-4">`
    for (list_id in data.lists) {
        html += '<span class="py-2">'
        html += getSelectionMarker(data.lists[list_id].name_x, data.answers[list_id][thesis_id].selection)
        html += statementOrDefault(data.answers[list_id][thesis_id].statement)
        html += '</span>'
    }
    html += "</div></details>"

    document.querySelector("#result-details").innerHTML += html;
}

function calculateMaxPoints(self) {
    if (answer.yes <= self[0] && self[0] <= answer.no) {
        if (self[1])
            return 4;
        return 2;
    }

    return 0;
}

function calculatePairPoints(self, list) {
    points = 0;
    // Same opinion
    if (self[0] == list)
        points = 2;
    // List is neutral and user made an answer
    else if (list == answer.neutral && (answer.yes == self[0] || self[0] == answer.no))
        points = 1;
    // User is neutral and list made an answer
    else if (self[0] == answer.neutral && (answer.yes == list || list == answer.no))
        points = 1;
    

    // is important
    if (self[1])
        return points * 2;
    return points;
}

function initResults() {

}

function statementOrDefault(statement) {
    if (statement == "")
        return '<span class="italic text-sm">Keine Stellungnahme.</span>';
    return '<span class="text-sm">'+statement+'</span>';
}

function getSelectionMarker(list, selection) {
    if (selection == answer.yes)
        return '<span class="bg-green rounded p-1 text-white text-sm m-1">'+ list +'</span>';
    else if (selection == answer.neutral)
        return '<span class="bg-yellow-normal rounded p-1 text-white text-sm m-1">'+ list +'</span>';
    else if (selection == answer.no)
        return '<span class="bg-red rounded p-1 text-white text-sm m-1">'+ list +'</span>';

    return '<span class="bg-gray-400 rounded p-1 text-white text-sm m-1">'+ list +'</span>';
}