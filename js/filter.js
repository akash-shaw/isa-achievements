// query selector
let posts = [];
let filteredPosts = [];
let postToShow = 6;
let maxDisplayPosts = postToShow;
const postContainer = document.querySelector('.post-container');
const search = document.querySelector('[type="search"]');


//  Fetching the data
async function fetchPosts() {
    await fetch('../posts.json').then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    })
        .then((data) => {
            posts = data.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
            filterPosts();
        })
        .catch((error) => {
            console.log(error)
        });
}

fetchPosts();

//  creating cards and updating UI
function generatePost(post) {

    const returnPostDate = (date) =>
        `${['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;


    const article = document.createElement('article');
    article.classList.add('post');
    // article.innerHTML = `
    //                 <div class="post__meta">
    //                     <div class="post__tag--container">
    //                     ${post.meta.tags.map((tag) =>
    //     `<span class="post__tag">${tag}</span>`
    // ).join('')}
    //                     </div>
    //                     <p class="post__date">${returnPostDate(new Date(post.meta.date))}</p>
    //                 </div>
    //                 <div class="box" data-aos="fade-up">
    //                     <img class="image" width="55"
    //                         src="https://i.picsum.photos/id/55/200/300.jpg?hmac=VjTl-6Y6NNyUWof_G17-KlocVl0QuUoxpir1beSTl8A" alt="Random image">
    //                     <div class="content">
    //                         <div class="price">
    //                             <p class="post__author--name">${post.user.name[0].firstName} ${post.user.name[1].lastName}</p>
    //                         </div>
    //                         <p class="post__body">
    //                             ${post.summary}
    //                         </p>
    //                         <a href="#" class="btn">Read More</a>
    //                     </div>
    //                 </div>
                
    // `;

    var randomNumber = Math.floor(Math.random() * 6) + 1;

    article.innerHTML = `
    <div class="box" data-aos="fade-up">
            <div class="image">
                <img src="../images/p-${randomNumber}.jpg" alt="">
            </div>
            <div class="content">
                <div class="price">${post.user.name[0].firstName} ${post.user.name[1].lastName}</div>
                <p>${post.summary}</p>
                <a href="#" class="btn"> Read More</a>
            </div>
        </div>
    
    `;
    return article;
}

const loadPosts = () => {
    const frag = document.createDocumentFragment();
    filteredPosts.slice(0, maxDisplayPosts).map((post) => frag.appendChild(generatePost(post)));
    postContainer.innerHTML = '';
    postContainer.appendChild(frag);
}

function filterPosts() {

    const searchFilter = (post) =>
        [post.summary, post.user.jobTitle, post.title, post.user.name[0].firstName, post.user.name[1].lastName, post.meta.tags.map((t) => t).join('')].map((test) => test)
            .join('')
            .toLowerCase()
            .indexOf(search.value.toLowerCase()) !== -1;


    filteredPosts = posts.filter(searchFilter);
    loadPosts();
}


// updating number of posts with btn click

function viewMorePosts() {
    maxDisplayPosts += postToShow;
    loadPosts();
}

document.querySelector('.btn--view').addEventListener('click', viewMorePosts)

// filter for search
search.addEventListener('keyup', filterPosts);



