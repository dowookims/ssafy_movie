// Vue.component('show-more', {
//   props:['movie', 'show'],
//   methods: {
//     handleClose: function(){
//       show = false;
//       console.log(show)
//     }
//   },
//   template: `
//   <div class="show-more-see">
//     <div>
//       <div class="row">
//         <div class="col-4">
//           <h1 class="movie-main-title">{{movie.title}}</h1>
//           <div class="movie-sub-title">
//             <p>
//               <span class="sub-box-name">개봉년도</span>
//               <span class="sub-box-value">{{movie.pubDate}}</span>
//             </p>
//             <p>
//               <span class="sub-box-name">평점</span>
//               <span class="sub-box-value">{{movie.userRating}}</span>
//             </p>
//           </div>
//           <div class="mt-4 ml-5 movie-detail-title">
//             <p class="detail-description">{{ movie.description }}</p>
//             <p>
//               <span class="detail detail-subtitle">개요</span>
//               <span class="detail detail-subtext" v-for="genre in movie.genres">{{ genre.name }}</span>
//             </p>
//           </div>
//         </div>
//         <div class="col-8 d-flex justify-content-end">
//           <img class="movie-detail-pics" :src="'https://image.tmdb.org/t/p/w500'+movie.image" />
//           <span class="movie-close-btn mt-n3 mr-5" @click="handleClose()">&times;</span>
//         </div>
//       </div>
//     </div>
//   </div>
//   `
// })
// main app

const app2 = new Vue({
    el: '#comment',
    data: {
        comments: [],
        newComment: '',
    },
    delimiters: ['[[', ']]'],
    created: function () {
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
                alert("댓글 작성에 실패했습니다.")
            });
        }
    },
});