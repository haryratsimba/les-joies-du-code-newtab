const PostsHTTPHandler = (function() {
    /**
     * API key.
     */
    const API_KEY = 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4';

    /**
     * Lesjoiesducode TUMBLR access url.
     */
    const BASE_URL = 'https://api.tumblr.com/v2/blog/lesjoiesducode.fr';

    /**
     * Posts HTTP singleton.
     */
    const PostsHTTPHandler = {
        /**
         * @return a promise which resolves the posts count.
         */
        getPostsCount() {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', `${BASE_URL}/info?api_key=${API_KEY}`);
                xhr.onload = function() {
                    // Catch HTTP and object parsing error (Tumblr API responses may change)
                    try {
                        if (this.status < 200 && this.status > 300) {
                            throw `[HTTP] ${this.status}  : ${xhr.statusText}`;
                        }
                        let content = JSON.parse(xhr.response);

                        // Send the posts count through resolve
                        resolve(content.response.blog.total_posts || content.response.blog.posts);
                    } catch (e) {
                        reject(e);
                    }
                };
                xhr.onerror = function() {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                };
                xhr.send();
            });
        },

        getRandomPostContent(postCount) {

        }
    };

    return PostsHTTPHandler;
})();
