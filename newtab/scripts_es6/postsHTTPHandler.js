const PostsHTTPHandler = (function() {
    /**
     * API key.
     */
    const API_KEY = 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4';

    /**
     * Lesjoiesducode TUMBLR access url.
     */
    const BASE_URL = 'http://api.tumblr.com/v2/blog/lesjoiesducode.fr';

    /**
     * Posts HTTP singleton.
     */
    let PostsHTTPHandler = {
        /**
         * @return a promise which resolves the posts count. The promise return :
         * - {integer} the total number of posts
         * - {Error} in case of errors.
         */
        getPostsCount() {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();

                xhr.open('GET', `${BASE_URL}/info?api_key=${API_KEY}`);

                xhr.onload = function() {
                    // Catch HTTP and object parsing error (Tumblr API responses may change)
                    try {
                        if (this.status < 200 && this.status > 300) {
                            throw new Error(`[HTTP] La requete HTTP a renvoyée les informations suviantes : code=${this.status}, status=${xhr.statusText}`);
                        }
                        let content = JSON.parse(xhr.response);

                        // Send the posts count through resolve
                        resolve(content.response.blog.total_posts || content.response.blog.posts);
                    } catch (e) {
                        if (e instanceof TypeError) {
                            // Add additionnal informations
                            e.message = `[API] Un problème est survenu lors du parsing des donnes renvoyée par l'API : ${e.message}`;
                        }
                        reject(e);
                    }
                };
                xhr.onerror = function() {
                    reject(new Error(`[HTTP] ${this.status}  : ${xhr.statusText}`));
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
        getRandomPost(postsCount) {
            // Generate random post offset between [0 ; total posts - 1]
            let randomPostOffset = Math.floor(Math.random() * postsCount);

            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();

                xhr.open('GET', `${BASE_URL}/posts?api_key=${API_KEY}&offset=${randomPostOffset}&limit=1`);

                xhr.onload = function() {
                    // Catch HTTP and object parsing error (Tumblr API responses may change)
                    try {
                        if (this.status < 200 && this.status > 300) {
                            throw new Error(`[HTTP] La requete HTTP a renvoyée les informations suviantes : code=${this.status}, status=${xhr.statusText}`);
                        }
                        let content = JSON.parse(xhr.response);

                        // Send the posts count through resolve
                        let post = content.response.posts[0];
                        resolve({
                            title: post.title,
                            content: post.body,
                            url: post.post_url
                        });
                    } catch (e) {
                        if (e instanceof TypeError) {
                            // Add additionnal informations
                            e.message = `[API] Un problème est survenu lors du parsing des donnes renvoyée par l'API : ${e.message}`;
                        }
                        reject(e);
                    }
                };
                xhr.onerror = function() {
                    reject(new Error(`[HTTP] ${this.status}  : ${xhr.statusText}`));
                };
                xhr.send();
            });
        }
    };

    return PostsHTTPHandler;
})();
