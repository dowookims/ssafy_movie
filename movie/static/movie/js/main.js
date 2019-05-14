const API_URL = 'http://127.0.0.1:8000';

Vue.component('show-more', {
  props:['movie'],
  template: `
  <div class="show-more-see">
    <div>
      <h1>{{movie.title}}</h1>
      <div class="movie-sub-title">
      <p><span class="sub-box-name">개봉년도</span><span class="sub-box-value">{{movie.pubDate}}</span></p>
      <p><span class="sub-box-name">평점</span><span class="sub-box-value">{{movie.userRating}}</span></p>
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
      'actor':'',
      'pubDate':'',
      'userRating':''
    },
  },
  delimiters: ['[[', ']]'],
  created: async function(){
    const res = await axios.get(`${API_URL}/movies/list/`)
    res.data.forEach(movie => this.movies.push(movie))
    console.log(res.data)
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
        const regActor = this.showmovie.actor.split('|')
        console.log(regActor)
        let actors = ''
        regActor.forEach((name, idx) => 
        { if(regActor.length-2  > idx) 
          actors+=`${name}, `
          else
          actors+=name
        })
        this.showmovie.actor = actors
      } else{
        this.showmovie=''
      }
    }
  }
});