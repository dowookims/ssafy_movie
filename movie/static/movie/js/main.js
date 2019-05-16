const API_URL = 'http://127.0.0.1:8000';
var API_KEY = '05559a3dcb74279f43087d2deb4ca13c';
const app2 = Vue.component('show-more', {
        props: ['movie', 'show', 'rm', 'liked'],
        data: function () {
            return {
                basic: true,
                detail: false,
                recommend: false,
                origin_url: "https://image.tmdb.org/t/p/original",
                w500_url: "https://image.tmdb.org/t/p/w500",
                csrftoken: '',
            }
        },
        methods: {
            handleClose: function () {
                app.show = false;
                app.show2 = false;
                this.basic = true;
                this.detail = false;
                this.recommend = false;
            },
            activeBasic: function () {
                this.basic = true
                this.detail = false
                this.recommend = false
            },
            activeDetail: function () {
                this.basic = false
                this.detail = true
                this.recommend = false
            },
            activeRecommend: function () {
                this.basic = false
                this.detail = false
                this.recommend = true
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
                axios.post(`${API_URL}/api/v1/movies/${this.movie.id}/like/`,
                    {},
                    {
                        headers: {
                            'X-CSRFTOKEN': this.csrftoken,
                        }
                    }).then(res => res.data)
                    .then(data => {
                        this.liked = !this.liked
                    })
            }
        },
        template:
            `
    <div class="show-more-see mx-0">
      <div>
        <div class="row show-total-data">
          <div class="col-4 movie-spec-info">
            <h1 class="movie-main-title ml-5 mt-5">{{movie.title}}</h1>
            <div class="movie-sub-title ml-5">
              <p>
                <span class="sub-box-name">개봉년도</span>
                <span class="sub-box-value">{{movie.pubDate}}</span>
              </p>
              <p>
                <span class="sub-box-name">평점</span>
                <span class="sub-box-value">{{movie.userRating}}</span>
              </p>
              <p>
                <i v-show="!liked" class="far fa-heart like-heart" @click="likeMovie"></i>
                <i v-show="liked" @click="likeMovie" class="fas fa-heart liked-heart like-heart"></i>
              </p>
            </div>
            <div v-show="basic" class="mt-4 ml-5 movie-detail-title">
              <p class="detail-description">{{ movie.description }}</p>
              <p>
                <span class="detail detail-subtitle">개요</span>
                <span class="detail detail-subtext" v-for="genre in movie.genres">{{ genre.name }}</span>
              </p> 
            </div>
          </div>
          <div class="col-8 px-0 movie-img-div">
            <div class="img-div" 
            :class="{'blur-image': !basic}" 
            :style="{
              'background-image': 'url(https://image.tmdb.org/t/p/original'+movie.backdrop+')', 
              'background-size': 'cover'
            }">
            </div>
            <comments v-if="detail" :id="movie.id"></comments>
            <recommends v-if="recommend" :movieid="movie.id"></recommends>
            <div class="close-box">
              <span @click="handleClose" class="movie-close-btn mt-n3 mr-5">&times;</span>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-center bottom-menu" v-show="show">
          <span 
            @click="activeBasic" 
            :class="{'menu-click': basic}"
          >기본정보</span>
          <span 
            @click="activeDetail" 
            :class="{'menu-click': detail}"
          >상세정보</span>
          <span 
            @click="activeRecommend()" 
            :class="{ 'menu-click': recommend }"
          >비슷한 작품</span>
        </div>
      </div>
    </div>
  `
    })
;
// main app
const app = new Vue({
    el: '#app',
    data: {
        movies: [],
        movies2: [],
        recommendMovies: [{
            'title': '',
            'backdrop_path': ''
        }],
        show: false,
        show2: false,
        showmovie: {
            'id': 0,
            'title': '',
            'pubDate': '',
            'userRating': '',
            'genres': '',
            'description': '',
            'image': ''
        },
        showmovie2: {
            'id': 0,
            'title': '',
            'pubDate': '',
            'userRating': '',
            'genres': '',
            'description': '',
            'image': ''
        },
        page: 0,
        page2: 0,
        liked: false,
    },
    delimiters: ['[[', ']]'],
    created: function () {
        axios.get(`${API_URL}/api/v1/movies/?page=1`)
            .then(res => res.data.results)
            .then(data => {
                console.log(data);
                data.forEach(movie => this.movies.push(movie))
            })
        axios.get(`${API_URL}/api/v1/movies/?page=2`)
            .then(res => res.data.results)
            .then(data => {
                console.log(data);
                data.forEach(movie => this.movies2.push(movie))
            })
    },
    methods: {
        showMore: function (movie) {
            this.show2 = false
            if (!this.show) {
                this.show = !this.show
            } else if (this.showmovie.title === movie.title) {
                this.show = !this.show
            }
            if (this.show) {
                this.showmovie = movie
            }
            axios.get(`${API_URL}/api/v1/movies/${movie.id}/like/`)
              .then(res => res.data)
              .then(data => {
                this.liked = data.msg
              })
        },
        showMore2: function (movie) {
            this.show = false
            if (!this.show2) {
                this.show2 = !this.show2
            } else if (this.showmovie.title === movie.title) {
                this.show2 = !this.show2
            }

            if (this.show2) {
                this.showmovie = movie
            }

            axios.get(`${API_URL}/api/v1/movies/${movie.id}/like/`)
              .then(res => res.data)
              .then(data => {
                this.liked = data.msg
              })
        },
        prevPage: function () {
            if (this.page == 0) {
                this.page = -95
            } else {
                this.page += 95
            }
        },
        nextPage: function () {
            if (this.page == -95) {
                this.page = 0
            } else {
                this.page -= 95
            }
        },
        prevPage2: function () {
            if (this.page2 == 0) {
                this.page2 = -95
            } else {
                this.page2 += 95
            }
        },
        nextPage2: function () {
            if (this.page2 == -95) {
                this.page2 = 0
            } else {
                this.page2 -= 95
            }
        }
    }
});
