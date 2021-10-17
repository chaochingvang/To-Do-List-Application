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
    let id = $(this).closest(`tr`).data(`id`);

    let date = ($(this).siblings(`.dateCompletedInput`).val());
    console.log(date.length);

    if (date.length < 10) {
        alert(`Please enter date as mm/dd/yyyy or yyyy/mm/dd`);
        return;
    }

    $.ajax({
        method: `PUT`,
        url: `/list/${id}`,
        data: {
            dateCompleted: date
        }
    }).then(function (response) {
        console.log(`Successfully marked as complete!`);
        getList();

    }).catch(function (response) {
        alert(`ERROR! Please enter date as mm/dd/yyyy or yyyy/mm/dd`);
    })
}

function deleteTask() {
    console.log(`in deleteTask fx`);

    let idToDelete = $(this).closest(`tr`).data(`id`);
    console.log(idToDelete);

    let confirmDelete = confirm(`Are you sure you want to delete this task?`);
    
    if (confirmDelete) {
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
    else {
        return;
    }


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

        let dateFromDb, year, month, date, dateCompleted;

        if (item.dateCompleted != null) {
            dateFromDb = item.dateCompleted.substr(0, 10);
            year = dateFromDb.substr(0, 4);
            month = dateFromDb.substr(5, 2);
            date = dateFromDb.substr(8, 2);
            dateCompleted = `${month}-${date}-${year}`;
        }


        let elToAppend = $(`
            <tr class="${item.completeStatus ? `taskCompleted` : ``}">
                <td class="taskColumn ">${item.task}</td>
                <td class="dateCompletedColumn">${item.dateCompleted === null ? `` : dateCompleted}</td>
                <td class="completeBtnColumn">
                    ${item.completeStatus ? `Completed!` :
                        `<input type="text" placeholder="mm/dd/yyyy" class="dateCompletedInput" required><br />
                        <button class="completeBtn">Mark as Complete</button>`}
                </td>
                <td class="deleteBtnColumn">
                    <button class="deleteBtn">Delete Task</button>
                </td>
            </tr>
        `);

        elToAppend.data(`id`, item.id);
        elToAppend.data(`completeStatus`, item.completeStatus);

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