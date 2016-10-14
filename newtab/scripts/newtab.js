'use strict';

(function () {

    var STORAGE_POSTS_LOGS_KEY = 'storage.posts.logs';

    var postsLogs = JSON.parse(localStorage.getItem(STORAGE_POSTS_LOGS_KEY));

    console.log(PostsHTTPHandler);

    // Get post count if it doesnt exist yet or the 24h has passed and new post has been added
    if (!postsLogs || Date.now() - parseInt(postsLogs.fetchTimestamp) > 3600000 * 24) {

        PostsHTTPHandler.getPostsCount().then(function (postsCount) {
            console.log(postsCount);

            // postsLogs = {};
            // postsLogs.count = postsLogs();
            // postsLogs.fetchTimestamp = Date.now();
            //
            // localStorage.setItem(JSON.stringify(postsLogs));
        });
    }
})();