Vue.component('comments', {
  props: ['id'],
  data: function () {
    return {
      // movie_id: this.movie,
      comments: [],
      newComment: '',
      isAuthenticated: false,
      mvDetail: {},
    }
  },
  mounted: function () {
    axios.get(`${API_URL}/api/v1/movies/${this.id}/comments/`)
    .then(res => res.data)
    .then(data => {
      data.forEach(comment => this.comments.push(comment))
    });
    axios.get(`${API_URL}/api/v1/account/login/`)
      .then(res => res.data)
      .then(data => {
        this.isAuthenticated = data.is_authenticated
      });
    axios.get(`${API_URL}/api/v1/movies/${this.id}/detail/`)
      .then(res => res.data[0])
      .then(data => {console.log('data', data); this.mvDetail=data});
      
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
            axios.post(`${API_URL}/api/v1/movies/${this.id}/comments/`,
                {content: this.newComment},
                {
                    headers: {
                        'X-CSRFTOKEN': csrftoken,
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
                alert("��� �ۼ��� �����߽��ϴ�.")
            });
        },
    }
    ,
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
      </div>
      <div class="comment-box">
        <div v-for="comment in comments">{{comment.user.username}} {{comment.content}}
        </div>
      </div>
      <div class="comment-add-box" v-show="isAuthenticated">
            <input 
              type="text" 
              class="form-control" v-model="newComment" >
            <button 
              class="btn btn-dark" @click="createComment">
              enter
            </button>
          </div>
    </div> 
    `
});
