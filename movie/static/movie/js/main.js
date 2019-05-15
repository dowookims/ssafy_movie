const API_URL = 'http://127.0.0.1:8000';
var API_KEY = '05559a3dcb74279f43087d2deb4ca13c';
Vue.component('show-more', {
    props: ['movie', 'show'],
    data: function () {
        return {
            basic: true,
            detail: false,
            recommend: false,
        }
    },
    methods: {
        handleClose: function () {
            console.log('start')
            app.show = false;
            show = false;
            console.log(show)
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
        activeRecommend: function (movie_id) {
            this.basic = false
            this.detail = false
            this.recommend = true
            axios.get(
                `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${API_KEY}&language=ko-KR`
            ).then(data => console.log(data))
        },
    },
    template: `
  <div class="show-more-see mx-0">
    <div>
      <div class="row">
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
          </div>
          <div v-show="basic" class="mt-4 ml-5 movie-detail-title">
            <p class="detail-description">{{ movie.description }}</p>
            <p>
              <span class="detail detail-subtitle">개요</span>
              <span class="detail detail-subtext" v-for="genre in movie.genres">{{ genre.name }}</span>
            </p> 
          </div>
        </div>
        <div class="col-8 px-0">
          <div class="img-div" :class="{'blur-image': !basic}" :style="{'background-image': 'url(https://image.tmdb.org/t/p/original'+movie.backdrop+')', 'background-size': 'cover',
          }">
          </div>
          <div class="close-box">
            <span @click="handleClose" class="movie-close-btn mt-n3 mr-5">x</span>
          </div>
        </div>
        <comments v-show="detail"></comments>
      </div>
      <div class="row d-flex justify-content-center bottom-menu" v-show="show">
        <span @click="activeBasic" :class="{'menu-click': basic}">기본정보</span>
        <span @click="activeDetail" :class="{'menu-click': detail}">상세정보</span>
        <span @click="activeRecommend(movie.id)" :class="{ 'menu-click': recommend }">비슷한 작품</span>
      </div>
    </div>
  </div>
  
  `
});
// main app
const app = new Vue({
    el: '#app',
    data: {
        message: "Hello World!!!!",
        movies: [],
        show: false,
        showmovie: {
            'title': '',
            'pubDate': '',
            'userRating': '',
            'genres': '',
            'description': '',
            'image': ''
        },
        page: 0
    },
    delimiters: ['[[', ']]'],
    created: function () {
        axios.get(`${API_URL}/api/v1/movies/?page=1`)
            .then(res => res.data.results)
            .then(data => {
                console.log(data);
                data.forEach(movie => this.movies.push(movie))
            })
    },
    methods: {
        showMore: function (movie) {
            if (!this.show) {
                this.show = !this.show
            } else if (this.showmovie.title === movie.title) {
                this.show = !this.show
            }

            if (this.show) {
                this.showmovie = movie

            }
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
        }
    }
});