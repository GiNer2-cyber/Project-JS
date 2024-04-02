// На post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста
// (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

const postURL = new URL(location.href);
const post = JSON.parse(postURL.searchParams.get('post'));

function renderPostDetails(post) {
    const postBlock = document.getElementById('postInfo');

    for (const key in post) {
        const postP = document.createElement('p');

        postP.innerHTML=`<span>${key}</span>${post[key]}`;

        postBlock.append(postP);
    }
}

const commentsURL = new URL('https://jsonplaceholder.typicode.com/comments');
commentsURL.searchParams.set('postId', post.id);

fetch(commentsURL)
    .then(res => res.json())
    .then(comments => renderComments(comments));

function renderComments(comments) {
    const commentsBlock = document.getElementById('comments');
    const commentsArray = Array.from(comments);

    commentsArray.map(comment => {
        const commBlock = document.createElement('div');
        const commID = document.createElement('span');
        const commName = document.createElement('p');
        const commEmail = document.createElement('p');
        const commBody = document.createElement('p');

        commID.innerText = comment.id;
        commName.innerText = comment.name;
        commEmail.innerText = comment.email;
        commBody.innerText = comment.body;

        commBlock.append(commID, commName, commEmail, commBody);
        commentsBlock.appendChild(commBlock);
    });
}

renderPostDetails(post);
renderComments(post.id);
