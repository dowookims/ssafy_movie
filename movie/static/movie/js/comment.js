Vue.component('star-rating', VueStarRating.default);
Vue.component('comments', {
    props: ['id'],
    data: function () {
        return {
            // movie_id: this.movie,
            comments: [],
            newComment: '',
            isAuthenticated: false,
            mvDetail: {},
            csrfToken: '',
            user:'',
            rating: 0,
        }
    },
    mounted: function () {
        console.log('commentIn', user)
        axios.get(`${API_URL}/api/v1/movies/${this.id}/comments/`)
            .then(res => res.data)
            .then(data => {
                console.log(data)
                data.forEach(comment => this.comments.push(comment))
                this.user= user
            });
        axios.get(`${API_URL}/api/v1/account/login/`)
            .then(res => res.data)
            .then(data => {
                this.isAuthenticated = data.is_authenticated
            });
        axios.get(`${API_URL}/api/v1/movies/${this.id}/detail/`)
            .then(res => res.data[0])
            .then(data => {
                console.log('data', data);
                this.mvDetail = data
            });
        axios.get(`${API_URL}/api/v1/movies/${this.id}/score/`)
            .then(res => res.data)
            .then(data => {
                console.log(data)
                this.rating = data.star / 2
            })
    },
    methods: {
        createComment: function () {
            this.csrftoken = this.getCookie('csrftoken');
            axios.post(`${API_URL}/api/v1/movies/${this.id}/comments/`,
                {content: this.newComment},
                {
                    headers: {
                        'X-CSRFTOKEN': this.csrftoken,
                    }
                }
            ).then(() => {
                axios.get(`${API_URL}/api/v1/movies/${this.id}/comments/`)
                    .then(res => res.data)
                    .then(data => {
                        this.comments.push(data[data.length - 1])
                    });
                this.newComment = '';
            }).catch(function (error) {
                alert("댓글작성에 실패했습니다.")
            });
        },
        deleteComment: function(id){
            this.csrftoken = this.getCookie('csrftoken');
            axios.delete(`${API_URL}/api/v1/movies/${this.id}/comments/${id}/delete/`,
                {headers: {
                    'X-CSRFTOKEN': this.csrftoken,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
                .then(res => {
                    console.log(res)
                    axios.get(`${API_URL}/api/v1/movies/${this.id}/comments/`)
                    .then(res => {
                        this.comments=[]; 
                        return res.data})
                    .then(data => {
                        console.log(data)
                        data.forEach(comment => this.comments.push(comment))
                })})
        },
        getCookie: function (name) {
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
        },
        likeMovie: function () {
            this.csrftoken = this.getCookie('csrftoken');
            axios.post(`${API_URL}/api/v1/movies/${this.id}/like/`,
                {},
                {
                    headers: {
                        'X-CSRFTOKEN': this.csrftoken,
                    }
                }).then(res => res.data)
                .then(data => {
                    console.log(data)
                })
        }
    },
    watch: {
        rating: function (val) {
            this.csrftoken = this.getCookie('csrftoken');
            axios.post(`${API_URL}/api/v1/movies/${this.id}/score/`,
            {
                'star': val * 2
            },
            {
                headers: {
                        'X-CSRFTOKEN': this.csrftoken,
                }
            }
            ).then(res => res.data)
             .then(data => console.log(data))
        }
    },
    template: `
    <div id="comment">
      <div class="detail-content-box">
        <p class="detail-content-title">배우</p>
        <p class="detail-content-text">{{mvDetail.actor1}}</p>
        <p class="detail-content-text">{{mvDetail.actor2}}</p>
        <p class="detail-content-text">{{mvDetail.actor3}}</p>
        <p class="detail-content-text">{{mvDetail.actor4}}</p>
        <p class="detail-content-text">{{mvDetail.actor5}}</p>
        <p class="detail-content-text">{{mvDetail.actor6}}</p>
        <p class="detail-content-title">감독</p>
        <p class="detail-content-text">{{mvDetail.director}}</p>
      </div>
      <div class="comment-box">
         <star-rating :increment="0.5" v-model="rating"></star-rating>
        <div class="row comment-content-box">
          <div class="col-6" v-for="comment in comments">
            <div class="col-10 ml-4 pl-5 col-offset-1">
              <p class="comment-user">
              <span>{{comment.user.username}}</span><span @click="deleteComment(comment.id)"class="comment-delete" v-if="user===comment.user.username">삭제</span></p> 
              <p class="comment-content">{{comment.content}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-add-box d-flex justify-content-center">
        <input 
          type="text" 
          class="form-control" v-model="newComment" v-show="isAuthenticated">
        <button 
          class="btn btn-dark" @click="createComment" v-show="isAuthenticated">
          enter
        </button>
      </div>
    </div> 
    `
});
