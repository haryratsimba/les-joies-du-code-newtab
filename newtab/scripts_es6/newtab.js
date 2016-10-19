(function() {
    // LocalStorage key
    const STORAGE_POSTS_LOGS_KEY = 'storage.posts.logs';

    // Elasped time (in ms) needed to fetch the new posts count, used to generate the post offset
    const POSTS_COUNT_MIN_REFRESH = 3600000 * 24;

    let postsLogs = JSON.parse(localStorage.getItem(STORAGE_POSTS_LOGS_KEY));

    // Get posts count if not stored in localStorage or 24h has passed and new post has been added
    if (!postsLogs || (Date.now() - parseInt(postsLogs.fetchTimestamp)) > POSTS_COUNT_MIN_REFRESH) {

        // Fetch the total number of posts and get a random post
        PostsHTTPHandler.getPostsCount().then((count) => {
            localStorage.setItem(STORAGE_POSTS_LOGS_KEY, JSON.stringify({
                count,
                fetchTimestamp: Date.now()
            }));

            return PostsHTTPHandler.getRandomPost(count);
        }).then(onFetchSuccess).catch(onFetchError);

    } else {
        PostsHTTPHandler.getRandomPost(postsLogs.count).then(onFetchSuccess).catch(onFetchError);
    }

    /**
     * @param {Object} the content view data to append.
     */
    function onFetchSuccess(post) {
        loadContentPost(post);

        // Display the original post link
        document.querySelector('#new-tab-url').style.display = 'inline';
    }

    /**
     * @param {Object} the content view data to append.
     */
    function onFetchError(error) {
        console.warn(error);

        let contentError = {
            title: `Une erreur est survenue lors de la recuperation du GIF :o`,
            content: `<p>Si l'erreur, accessible dans la console de votre navigateur (F12), persiste,
            merci de la remonter.</p><img src="../imgs/error.gif"/></p>`
        };
        loadContentPost(contentError);
    }

    /**
     * @param {Object} the content view data to append.
     */
    function loadContentPost({title, content, url}) {
        document.querySelector('.new-tab-title').innerHTML = title;
        document.querySelector('.new-tab-gif').innerHTML = content;
        document.querySelector('#new-tab-url').href = url;
    }

})();
