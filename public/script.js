document.getElementById('start_search').addEventListener('click', getUsers)
function getUsers() {
    const searchInput = document.getElementById('searched_inp');
    const urlsContainer = document.getElementById('usersContainer');
    urlsContainer.innerHTML = '';
    document.getElementById('loadingSpiner').style.display = 'block';
    fetch(`/user?search=${searchInput.value}`).then(response => {
        return response.json()
    }).then(result => {
        for (let item of result) {
            createRow(item);
        }
        document.getElementById('loadingSpiner').style.display = 'none';

    })
}
function createRow(user) {
    const { first_name, last_name, email, avatar } = user
    const urlsContainer = document.getElementById('usersContainer');
    const elem_th = document.createElement('tr');
    const elem_td1 = document.createElement('td');
    const elem_td2 = document.createElement('td');
    const elem_td3 = document.createElement('td');
    const elem_td4 = document.createElement('td');
    elem_td1.setAttribute('scope', 'row');
    elem_td1.innerText = first_name;
    elem_td2.innerText = last_name;
    elem_td3.innerText = email;
    elem_td4.innerHTML = `<image src=${avatar} style="width: 30px"/>`;
    elem_th.appendChild(elem_td4);
    elem_th.appendChild(elem_td2);
    elem_th.appendChild(elem_td3);
    elem_th.appendChild(elem_td1);
    urlsContainer.appendChild(elem_th);
}
getUsers()