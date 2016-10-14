'use strict';

var PostsHTTPHandler = function () {
    /**
     * API key.
     */
    var API_KEY = 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4';

    /**
     * Lesjoiesducode TUMBLR access url.
     */
    var BASE_URL = 'https://api.tumblr.com/v2/blog/lesjoiesducode.fr';

    /**
     * Posts HTTP singleton.
     */
    var PostsHTTPHandler = {
        /**
         * @return a promise which resolves the posts count.
         */
        getPostsCount: function getPostsCount() {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', BASE_URL + '/info?api_key=' + API_KEY);
                xhr.onload = function () {
                    // Catch HTTP and object parsing error (Tumblr API responses may change)
                    try {
                        if (this.status < 200 && this.status > 300) {
                            throw '[HTTP] ' + this.status + '  : ' + xhr.statusText;
                        }
                        var content = JSON.parse(xhr.response);

                        // Send the posts count through resolve
                        resolve(content.response.blog.total_posts || content.response.blog.posts);
                    } catch (e) {
                        reject(e);
                    }
                };
                xhr.onerror = function () {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                };
                xhr.send();
            });
        },
        getRandomPostContent: function getRandomPostContent(postCount) {}
    };

    return PostsHTTPHandler;
}();