console.log(`in js`);

$(jqReady);

function jqReady() {
    console.log(`in jq`);
    getList();
    $(`#taskList`).on(`click`, `.completeBtn`, markComplete);
    $(`#taskList`).on(`click`, `.deleteBtn`, deleteTask);
    $(`#submitBtn`).on(`click`, addTask);



}

function markComplete() {
    console.log(`in markComplete fx`);
}

function deleteTask() {
    console.log(`in deleteTask fx`);
}

function addTask() {
    console.log(`in addTask fx`);
}

function renderToDOM(list) {
    $(`#taskList`).empty;

    for (let item of list) {
        let elToAppend = $(`
            <tr>
                <td>${item.task}</td>
                <td></td>
                <td>
                    <button class="completeBtn">Mark as Complete</button>
                </td>
                <td>
                    <button class="deleteBtn">Delete Task</button>
                </td>
            </tr>
        `);

        $(elToAppend).data(`id`, list.id);

        $(`#taskList`).append(elToAppend);
    }
}

function getList() {
    $.ajax({
        method: `GET`,
        url: `list`
    }).then(function (response) {
        console.log(`Successful client GET. Obtained list of`, response);
        renderToDOM(response);
    }).catch(function (response) {
        console.log(`ERROR! Unable to get list! Client Get FAILED!`);
    });
}