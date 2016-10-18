'use strict';

var PostsHTTPHandler = function () {
    /**
     * API key.
     */
    var API_KEY = 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4';

    /**
     * Lesjoiesducode TUMBLR access url.
     */
    var BASE_URL = 'http://api.tumblr.com/v2/blog/lesjoiesducode.fr';

    /**
     * Posts HTTP singleton.
     */
    var PostsHTTPHandler = {
        /**
         * @return a promise which resolves the posts count. The promise return :
         * - {integer} the total number of posts
         * - {Error} in case of errors.
         */
        getPostsCount: function getPostsCount() {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();

                // TODO : Uncomment this line
                // xhr.open('GET', `${BASE_URL}/info?api_key=${API_KEY}`);

                // TODO : Replace the mock. Mocky is used to generate a mock response
                xhr.open('GET', 'http://www.mocky.io/v2/5805ee6f1000008b00f185a2');

                xhr.onload = function () {
                    // Catch HTTP and object parsing error (Tumblr API responses may change)
                    try {
                        if (this.status < 200 && this.status > 300) {
                            throw new Error('[HTTP] ' + this.status + '  : ' + xhr.statusText);
                        }
                        var content = JSON.parse(xhr.response);

                        // Send the posts count through resolve
                        resolve(content.response.blog.total_posts || content.response.blog.posts);
                    } catch (e) {
                        reject(e);
                    }
                };
                xhr.onerror = function () {
                    reject(new Error('[HTTP] ' + this.status + '  : ' + xhr.statusText));
                };
                xhr.send();
            });
        },

        /**
         * @param {integer} total number of posts.
         * @return a promise which fetch a random post [0 ; total posts - 1] with the total number of posts as offset. The resolve return the post :
         * - {string} title
         * - {string} content
         * - {string} blog url
         */
        getRandomPost: function getRandomPost(postsCount) {
            // Generate random post offset between [0 ; total posts - 1]
            var randomPostOffset = Math.floor(Math.random() * postsCount);

            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();

                // TODO : Uncomment this line
                // xhr.open('GET', `${BASE_URL}/posts?api_key=${API_KEY}&offset=${randomPostOffset}&limit=1`);

                // TODO : Replace the mock. Mocky is used to generate a mock response
                xhr.open('GET', 'http://www.mocky.io/v2/5804e41c130000d4096ab6dd');

                xhr.onload = function () {
                    // Catch HTTP and object parsing error (Tumblr API responses may change)
                    try {
                        if (this.status < 200 && this.status > 300) {
                            throw new Error('[HTTP] ' + this.status + '  : ' + xhr.statusText);
                        }
                        var content = JSON.parse(xhr.response);

                        // Send the posts count through resolve
                        var post = content.response.posts[0];

                        // throw new Error('test');

                        resolve({
                            title: post.title,
                            content: post.body,
                            url: post.post_url
                        });
                    } catch (e) {
                        reject(e);
                    }
                };
                xhr.onerror = function () {
                    reject(new Error('[HTTP] ' + this.status + '  : ' + xhr.statusText));
                };
                xhr.send();
            });
        }
    };

    return PostsHTTPHandler;
}();