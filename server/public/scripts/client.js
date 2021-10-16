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

    $(this).parent().siblings(`.taskCell`).addClass(`taskCompleted`);


}

function deleteTask() {
    console.log(`in deleteTask fx`);

    let idToDelete = $(this).closest(`tr`).data(`id`);
    console.log(idToDelete);

    $.ajax({
        method: `DELETE`,
        url: `/list/${idToDelete}`
    }).then(function (response) {
        console.log(`Successfully deleted ID # `, idToDelete);
        getList();
    }).catch(function (response) {
        console.log(`ERROR! Unable to delete!`);
    });


}

function addTask() {
    console.log(`in addTask fx`);

    $.ajax({
        method: `POST`,
        url: `/list`,
        data: {
            task: $(`#taskInput`).val()
        }
    }).then(function (response) {
        console.log(`Successfully added new quote!`);
        getList();
        $(`#taskInput`).val(``);
    }).catch(function (response) {
        console.log(`ERROR! Unable to add new quote.`);
    });
}

function renderToDOM(list) {
    $(`#taskList`).empty();

    for (let item of list) {
        let elToAppend = $(`
            <tr>
                <td class="taskCell">${item.task}</td>
                <td></td>
                <td>
                    <button class="completeBtn">Mark as Complete</button>
                </td>
                <td>
                    <button class="deleteBtn">Delete Task</button>
                </td>
            </tr>
        `);

        elToAppend.data(`id`, item.id);

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