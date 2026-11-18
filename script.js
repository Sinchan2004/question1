function getLatestAnswers(updates) {
    let answers = {};

    for (let i = 0; i < updates.length; i++) {
        let update = updates[i];
        let questionId = update.questionId;

        if (
            answers[questionId] === undefined ||
            update.timestamp > answers[questionId].timestamp
        ) {
            answers[questionId] = {
                answer: update.answer,
                timestamp: update.timestamp
            };
        }
    }

    let finalAnswers = {};

    for (let questionId in answers) {
        finalAnswers[questionId] = answers[questionId].answer;
    }

    return finalAnswers;
}

document.getElementById("processButton").addEventListener("click", function () {

    let input = document.getElementById("updates").value;
    let result = document.getElementById("result");
    let error = document.getElementById("error");

    try {
        let updates = JSON.parse(input);

        let finalAnswers = getLatestAnswers(updates);

        result.textContent = JSON.stringify(finalAnswers, null, 2);

        error.textContent = "";

    } catch (e) {
        error.textContent = "Please enter valid JSON.";
        result.textContent = "";
    }

});

document.getElementById("processButton").click();