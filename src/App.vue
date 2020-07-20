<template>
  <div id="app">
    <div class="row top-container">
      <input class="urlInput" placeholder="Paste Youtube video link here" v-model="userUrlInput" @keypress.enter="setVideoUrl"/>
      <button @click="setVideoUrl">START</button>  
    </div>
    <div class="row main-container" v-if="videoId">
  <div class="action-container" v-if="!playerLoading">
    <div>
      <button @click="setStartTime">SET START TIME</button>
      <button @click="setEndTime">SET END TIME</button>
    </div>
    <div>
      <span>START</span>
      <div>
        <input v-model="startTimeSeconds"/>
        <span class="second-label">s</span>
      </div>
    </div>
    <div  class="error" v-show="startTimeError">Incorrect Start Time</div>

    <div>
      <span>END</span>
      <div>
        <input v-model="endTimeSeconds"/>
        <span class="second-label">s</span>
      </div>
    </div>
    <div  class="error" v-show="endTimeError">Incorrect End Time</div>

    <div>
      <span>DURATION</span>
      <div>
        <input type="text" disabled :value="duration"/>
        <span class="second-label">s</span>
      </div>
    </div>
    <div>
      <span>QUALITY</span>
      <select v-model="quality">
        <option value="1">Low</option>
        <option value="4">Medium</option>
        <option value="9">High</option>
      </select>
    </div>
    <div>
      <button @click="preview">PREVIEW</button>
      <button @click="download">CUT VIDEO</button>
    </div>
    <div class="row">
      <a :href="downloadVideoUrl" target="_blank" download v-show="downloadVideoUrl">Download Link</a>
    </div>
  </div>
      <youtube :video-id="videoId" ref="youtube" :player-vars="playerVars" @playing="playing" ></youtube>
    </div>
  
    <div class="loader" v-if="loading">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import {API_URL} from './constants.js';
export default {
  name: 'App',
  data:()=>({
    userUrlInput:'',
    videoId:null,
    startTime:'00:00',
    endTime:null,
    quality:1,
    startTimeSeconds:0,
    endTimeSeconds:0,
    playerVars:{
      autoplay:1
    },
    loading:false,
    showPlayer:false,
    downloadVideoUrl:null,
    playerLoading:false
  }),
  computed:{
    duration(){
      if(this.startTimeSeconds && this.endTimeSeconds && (this.endTimeSeconds > this.startTimeSeconds)){
        return (this.endTimeSeconds - this.startTimeSeconds).toFixed(2)
      }
      else{
        return null
      }
    },
    player() {
      return this.$refs.youtube && this.$refs.youtube.player
    },
    startTimeError(){
      return this.startTimeSeconds && isNaN(this.startTimeSeconds)
    },
    endTimeError(){
      return this.endTimeSeconds && (isNaN(this.endTimeSeconds) || (this.endTimeSeconds < this.startTimeSeconds))
    }
  },
  methods:{
    setVideoUrl(){
      this.playerLoading = true;
      let videoId;
      const mobileUrlMatch = this.userUrlInput.match(/^.+youtu\.be\/(.+)$/);
      if(mobileUrlMatch){
        videoId = mobileUrlMatch[1];
      }
      else{
        videoId = this.userUrlInput.split(/(\?v=)|&/);
        videoId = videoId[2]
      }
      if(videoId){
        this.downloadVideoUrl = null;
        this.videoId = videoId;
        this.startTimeSeconds = this.endTimeSeconds = 0;
        this.downloadVideoUrl = null;
      }
      else{
        this.videoId = null;
      }
      setTimeout(()=>{
        if(this.$refs.youtube && this.$refs.youtube.player){
        this.$refs.youtube.player.getPlayerState()
        .then((res)=>{
          if(res == 1){
            this.playerLoading = false;
          }
        })
        .catch();
      };
    },0)
      
    },
    playing() {
      console.log('we are watching!!!')
      this.playerLoading = false;
    },
    setStartTime(){
      this.player.getCurrentTime()
      .then(time=>{
        this.startTimeSeconds = Number(time.toFixed(2));
      });
    },
    setEndTime(){
      this.player.getCurrentTime()
      .then(time=>{
        this.endTimeSeconds = Number(time.toFixed(2));
      });
      this.player.pauseVideo();
    },
    preview(){
      if(this.duration){
        this.player.seekTo(this.startTimeSeconds);
        setTimeout(()=>{
          this.player.pauseVideo();
        },(this.duration+1)*1000);
        this.player.playVideo();
      }
    },
    download(){
      if(!this.duration){
        return;
      }
      this.downloadVideoUrl = null;
      this.player.pauseVideo();
      this.loading = true;
      let url = `${API_URL}?video=https://www.youtube.com/watch?v=${this.videoId}&`
      if(this.startTimeSeconds){
        url += `start=${this.startTimeSeconds}&`;
      }
      if(this.endTimeSeconds){
        url += `end=${this.endTimeSeconds}&`
      }
      if(this.quality){
        url += `quality=${this.quality}`
      }
      fetch(url,{
        method:'GET'
      })
      .then((res)=>{
        if(res.status != 200){
          throw '';
          return;
        }
        return res.text();
      })
      .then((res)=>{
         const videoUrl = `${API_URL}${res}`;
         this.downloadVideoUrl = videoUrl;
       })
      .catch(()=>{
        
      })
      .finally(()=>{
        this.loading = false;
      })

    }
  }
}
</script>

<style>
@import 'main.css';
</style>
