// На user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
// котра має детальну інфу про поточний пост.

const url = new URL(location.href);
const user = JSON.parse(url.searchParams.get('user'));

const userBlock = document.getElementById('userInfo');
const userImg = document.createElement('img');
userImg.src = `img/${user.id}.png`;
userImg.alt = user.name;
userBlock.appendChild(userImg);

function renderUser(user) {
    for (const key in user) {
        const contentBlock = document.createElement('p');

        if (typeof user[key] === 'object') {
            const nestedBlock = document.createElement('div');
            nestedBlock.innerHTML = `<span>${key}</span>`;
            userBlock.appendChild(nestedBlock);

            renderUser(user[key]);
        } else {
            contentBlock.innerHTML = `<span>${key}</span>${user[key]}`;
            userBlock.appendChild(contentBlock);
        }

    }
}

renderUser(user);

const postsButton = document.getElementById('posts');

postsButton.onclick = (ev) => {
    ev.preventDefault();

    const url = new URL('https://jsonplaceholder.typicode.com/posts');
    url.searchParams.set('userId', user.id);

    fetch(url)
        .then(res => res.json())
        .then(posts => renderPosts(posts));
}

function renderPosts(posts) {
    const postsBlock = document.getElementById('postsInfo');
    postsBlock.innerHTML = '';

    posts.map(post => {
        const postBlock = document.createElement('div');
        const postID = document.createElement('span');
        const postTitle = document.createElement('p');
        const postTitleLink = document.createElement('a');

        postID.innerText = `#${post.id} `;
        postTitleLink.innerText = post.title;

        postTitleLink.href = `post-details.html?post=${JSON.stringify(post)}`

        postTitle.appendChild(postTitleLink);
        postBlock.append(postID, postTitle);
        postsBlock.appendChild(postBlock);
    });
}
