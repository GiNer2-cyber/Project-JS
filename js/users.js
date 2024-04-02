// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
// котра має детальну інфорацію про об'єкт на який клікнули

const url = new URL('https://jsonplaceholder.typicode.com/users');

fetch(url)
    .then(res => res.json())
    .then(users => renderUsers(users));

function renderUsers(users) {
    const usersBlock = document.getElementById('users-block');

    users.map(user => {
        const userItem = document.createElement('div');
        userItem.classList.add('user-item');
        userItem.innerHTML = `
            <img src=img/${user.id}.png alt=${user.name}>
            <h3><span>#${user.id} </span>${user.name}</h3>
        `;

        const userDetailsBtn = document.createElement('button');
        userDetailsBtn.innerText = 'See details';

        userDetailsBtn.onclick = function () {
            location.href = `user-details.html?user=${JSON.stringify(user)}`;
        }

        userItem.append(userDetailsBtn);
        usersBlock.appendChild(userItem);
    });
}
