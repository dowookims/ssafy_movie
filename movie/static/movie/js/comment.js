Vue.component('comments', {
    data: function () {
        return {
            comments: [],
            newComment: '',
        }
    },
    mounted: function () {
        axios.get(`${API_URL}/api/v1/movies/671/comments/`)
            .then(res => res.data)
            .then(data => {
                data.forEach(comment => this.comments.push(comment))
            })
    },
    methods: {
        createComment: function () {
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie !== '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i].trim();
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) === (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }

            var csrftoken = getCookie('csrftoken');
            axios.post(`${API_URL}/api/v1/movies/671/comments/`,
                {content: this.newComment},
                {
                    headers: {
                        'X-CSRFTOKEN': csrftoken,
                    }
                }
            ).then(() => {
                axios.get(`${API_URL}/api/v1/movies/671/comments/`)
                    .then(res => res.data)
                    .then(data => {
                        this.comments.push(data[data.length - 1])
                    });
                this.newComment = '';
            }).catch(function (error) {
                alert("��� �ۼ��� �����߽��ϴ�.")
            });
        }
    },
    template: `
    <div id="comment">
        <div v-for="comment in comments">{{comment.user.username}} {{comment.content}}</div>
            {% if user.is_authenticated %}
                <input type="text" class="form-control" v-model="newComment">
                <button class="btn btn-dark" @click="createComment">enter</button>
            {% endif %}
        </div>
    </div> 
    `
});
// const app2 = new Vue({
//     el: '#comment',
//     data: {
//         comments: [],
//         newComment: '',
//     },
//     delimiters: ['[[', ']]'],
//     created: function () {
//         axios.get(`${API_URL}/api/v1/movies/671/comments/`)
//             .then(res => res.data)
//             .then(data => {
//                 data.forEach(comment => this.comments.push(comment))
//             })
//     },
//     methods: {
//         createComment: function () {
//             function getCookie(name) {
//                 var cookieValue = null;
//                 if (document.cookie && document.cookie !== '') {
//                     var cookies = document.cookie.split(';');
//                     for (var i = 0; i < cookies.length; i++) {
//                         var cookie = cookies[i].trim();
//                         // Does this cookie string begin with the name we want?
//                         if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                             cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                             break;
//                         }
//                     }
//                 }
//                 return cookieValue;
//             }
//
//             var csrftoken = getCookie('csrftoken');
//             axios.post(`${API_URL}/api/v1/movies/671/comments/`,
//                 {content: this.newComment},
//                 {
//                     headers: {
//                         'X-CSRFTOKEN': csrftoken,
//                     }
//                 }
//             ).then(() => {
//                 axios.get(`${API_URL}/api/v1/movies/671/comments/`)
//                     .then(res => res.data)
//                     .then(data => {
//                         this.comments.push(data[data.length - 1])
//                     });
//                 this.newComment = '';
//             }).catch(function (error) {
//                 alert("��� �ۼ��� �����߽��ϴ�.")
//             });
//         }
//     },
// });