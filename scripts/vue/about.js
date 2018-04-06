var about = new Vue({
    el: "#about",
    data: {},
    components: {
        'links': {
            'template': '<div class="links"><a v-for="link in links" :href="link.url" :alt="link.title"><img :src="link.icon" /></a></div>',
            'data': function() {
                return {
                    'links': [
                        {
                            title: "LinkedIn",
                            icon: "./images/btn-linkedin.png",
                            url: "https://www.linkedin.com/in/tuzaiz/"
                        },
                        {
                            title: "Github",
                            icon: "./images/btn-github.png",
                            url: "https://github.com/tuzaiz"
                        },
                        {
                            title: "Blog",
                            icon: "./images/btn-medium.png",
                            url: "https://medium.com/@tuzaiz"
                        },
                        {
                            title: "Facebook",
                            icon: "./images/btn-facebook.png",
                            url: "https://www.facebook.com/tuzaiz"
                        },
                        {
                            title: "Twitter",
                            icon: "./images/btn-twitter.png",
                            url: "https://twitter.com/tuzaiz"
                        }
                    ]
                }
            }
        }
    }
})