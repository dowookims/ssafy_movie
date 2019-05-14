const API_URL = 'http://127.0.0.1:8000';

Vue.component('show-more', {
  props:['movie'],
  methods: {
    handleClose: function(){
      app.show = false;
      console.log(app.show)
    }
  },
  template: `
  <div class="show-more-see" :style="{'background': 'url('+movie.image+'), no-repeat linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1))'}">
    <div>
      <div class="row">
        <div class="col-3">
          <h1 class="movie-main-title">{{movie.title}}</h1>
        </div>
        <div class="col-9 d-flex justify-content-end">
          <span class="movie-close-btn mt-n3 mr-5" @click="!app.show">&times;</span>
        </div>
      </div>
      <div class="movie-sub-title">
        <p>
          <span class="sub-box-name">개봉년도</span>
          <span class="sub-box-value">{{movie.pubDate}}</span>
        </p>
        <p>
          <span class="sub-box-name">평점</span>
          <span class="sub-box-value">{{movie.userRating}}</span>
        </p>
      </div>
      <div class="col-4 movie-detail-title">
        <p class="detail-description">{{ movie.description }}</p>
        <p>
          <span class="detail detail-subtitle">개요</span>
          <span class="detail detail-subtext" v-for="genre in movie.genres">{{ genre.name }}</span>
        </p>
      </div>
    </div>
  </div>
  `
  
})
// main app
const app = new Vue({
  el: '#app',
  data: {
    message: "Hello World!!!!",
    movies: [],
    show: false,
    showmovie: {
      'title':'',
      'pubDate':'',
      'userRating':'',
      'genres':'',
      'description':'',
      'image':''
    },
  },
  delimiters: ['[[', ']]'],
  created: function(){
    axios.get(`${API_URL}/api/v1/movies/?page=1`)
      .then(res => res.data.results)
      .then(data => {console.log(data);
        data.forEach(movie => this.movies.push(movie))
      })
  },
  methods: {
    showMore: function(movie){
      if(!this.show){
        this.show = !this.show
      }
      else if(this.showmovie.title === movie.title){
        this.show = !this.show
      }

      if(this.show){
        this.showmovie=movie
        
      }
    }
  }
});