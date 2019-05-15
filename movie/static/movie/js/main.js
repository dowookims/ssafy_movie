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
            app.show = false;
            app.show2 = false;
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
          <div v-show="detail" class="detail-comment-box">
            sdfasdfdsfhjkhjkhsdfhsk
            <comments v-show="detail"></comments>  
          </div>
          <div class="close-box">
            <span @click="handleClose" class="movie-close-btn mt-n3 mr-5">&times;</span>
          </div>
        </div>
        
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
        movies: [],
        movies2: [],
        show: false,
        show2: false,
        showmovie: {
            'title': '',
            'pubDate': '',
            'userRating': '',
            'genres': '',
            'description': '',
            'image': ''
        },
        showmovie2: {
          'title': '',
          'pubDate': '',
          'userRating': '',
          'genres': '',
          'description': '',
          'image': ''
        },
        page: 0,
        page2: 0
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