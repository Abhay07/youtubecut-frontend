<template>
    <div id="app">
        <div class="row top-container">
                <div class="input-wrapper">
                    <input class="urlInput" placeholder="Paste Youtube video link here" v-model="userUrlInput" @input="setVideoUrl" />
                    <div class="error" v-show="invalidVideoUrlError && downloadBtnClicked">{{INVALID_VIDEO_URL_ERROR}}</div>
                </div>
                <!-- <button @click="setVideoUrl" v-show="userUrlInput" :class="{mb0:!showFullVideoOptions}">Start Cutting</button>   -->
                 <select v-model="fullVideoQuality">
                    <option value="highest">Quality highest</option>
                    <option value="18">Quality medium</option>
                </select>
                <button @click="downloadFullVideo">Download Video</button>
               
        </div>
        <div class="download-link">
            <a :href="actualLink" :download="downloadFileName" v-show="fullVideoUrl" @click="setDownloadFileName" target="_blank">Download Link</a>
        </div>
        <a href="https://www.amazon.in/s?k=mi+phones&amp;ref=nb_sb_noss_1&_encoding=UTF8&tag=abhay0aa-21&linkCode=ur2&linkId=49e735c10916048f75b6bc6d70608e3a&camp=3638&creative=24630" class="adLink" target="_blank">
            <img src="./assets/adBanner.jpg" alt="">
        </a>
        <!-- <iframe src="/ad.html" frameborder="0" id="ad"></iframe> -->
        <!-- <div class="playIns" v-show="!showFullVideoOptions">
      Play Video to see cutting options
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
        <input v-model="startTimeSeconds" maxlength="6" @change="hideDownloadLink"/>
        <span class="second-label">s</span>
      </div>
    </div>
    <div  class="error" v-show="cutVideoClicked && startTimeError">{{startTimeErrMsg}}</div>

    <div>
      <span>END</span>
      <div>
        <input v-model="endTimeSeconds" maxlength="6" @change="hideDownloadLink"/>
        <span class="second-label">s</span>
      </div>
    </div>
    <div  class="error" v-show="cutVideoClicked && endTimeError">{{endTimeErrMsg}}</div>

    <div>
      <span>DURATION</span>
      <div>
        <input type="text" disabled :value="duration"/>
        <span class="second-label">s</span>
      </div>
    </div>
    <div>
      <span>QUALITY</span>
      <select v-model="quality" @change="hideDownloadLink">
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
      <a :href="downloadVideoUrl"  download v-show="downloadVideoUrl">Download Link</a>
    </div>
  </div>
      <youtube :video-id="videoId" ref="youtube" :player-vars="playerVars" @playing="playing" ></youtube>
    </div>
  -->
        <div class="loader" v-if="loading">
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div v-show="downloadingText">Your video is downloading</div>
        </div>
    </div>
</template>
<script>
import { API_URL, TIME_FORMAT_ERROR, END_TIME_ERROR, INVALID_VIDEO_URL_ERROR, AD_LINK } from './constants.js';
import {makeid} from './utils.js';
export default {
    name: 'App',
    data: () => ({
        userUrlInput: '',
        videoId: null,
        startTime: '00:00',
        endTime: null,
        quality: 1,
        startTimeSeconds: 0,
        endTimeSeconds: 0,
        playerVars: {
            autoplay: 1
        },
        loading: false,
        showPlayer: false,
        downloadVideoUrl: null,
        playerLoading: false,
        startTimeErrMsg: '',
        endTimeErrMsg: '',
        cutVideoClicked: false,
        fullVideoUrl: '',
        fullVideoQuality: 18,
        invalidVideoUrlError: false,
        INVALID_VIDEO_URL_ERROR,
        downloadBtnClicked:false,
        downloadFileName:'',
        downloadingText:false,
        actualLink:AD_LINK
    }),
    computed: {
        /*duration(){
          if(!isNaN(this.startTimeSeconds) && !isNaN(this.endTimeSeconds) && (this.endTimeSeconds > this.startTimeSeconds)){
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
          if(this.startTimeSeconds && isNaN(this.startTimeSeconds)){
            this.startTimeErrMsg = TIME_FORMAT_ERROR;
            return true;
          }
          return false;
        },
        endTimeError(){
          if(this.endTimeSeconds && (isNaN(this.endTimeSeconds))){
            console.log(this.endTimeSeconds);
            this.endTimeErrMsg = TIME_FORMAT_ERROR;
            return true;
          }
          else if(this.endTimeSeconds < this.startTimeSeconds){
            this.endTimeErrMsg = END_TIME_ERROR;
            return true;
          }
          return false;
        }*/
    },
    methods: {
        setVideoUrl() {
            this.hideDownloadLink();
            this.invalidVideoUrlError = false;
            this.fullVideoUrl = null;
            this.playerLoading = true;
            let videoId;
            const mobileUrlMatch = this.userUrlInput.match(/^.+youtu\.be\/(.+)$/);
            const desktopUrlMatch = this.userUrlInput.match(/^.+youtube\.com\/watch\?v=.+$/);;
            if (mobileUrlMatch) {
                videoId = mobileUrlMatch[1];
            } else if (desktopUrlMatch) {
                videoId = this.userUrlInput.split(/(\?v=)|&/);
                videoId = videoId[2]
            } else {
                this.invalidVideoUrlError = true;
                return;
            }
            if (videoId) {
                this.downloadVideoUrl = null;
                this.videoId = videoId;
                this.startTimeSeconds = this.endTimeSeconds = 0;
                this.downloadVideoUrl = null;
            } else {
                this.videoId = null;
            }
            setTimeout(() => {
                if (this.$refs.youtube && this.$refs.youtube.player) {
                    this.$refs.youtube.player.getPlayerState()
                        .then((res) => {
                            if (res == 1) {
                                this.playerLoading = false;
                            }
                        })
                        .catch();
                };
            }, 0)

        },
        playing() {
            console.log('we are watching!!!')
            this.playerLoading = false;
            window.scrollTo(0, 500);
        },
        setStartTime() {
            this.player.getCurrentTime()
                .then(time => {
                    this.startTimeSeconds = Number(time.toFixed(2));
                });
        },
        setEndTime() {
            this.player.getCurrentTime()
                .then(time => {
                    this.endTimeSeconds = Number(time.toFixed(2));
                });
            this.player.pauseVideo();
        },
        preview() {
            if (this.duration) {
                this.player.seekTo(this.startTimeSeconds);
                setTimeout(() => {
                    this.player.pauseVideo();
                }, (this.duration + 1) * 1000);
                this.player.playVideo();
            }
        },
        download() {
            this.cutVideoClicked = true;
            if (!this.duration) {
                return;
            }
            this.downloadVideoUrl = null;
            this.player.pauseVideo();
            this.loading = true;
            const videoUrl = encodeURIComponent(`https://www.youtube.com/watch?v=${this.videoId}`)
            let url = `${API_URL}?video=${videoUrl}&start=${this.startTimeSeconds}&end=${this.endTimeSeconds}&quality=${this.quality}`
            fetch(url, {
                    method: 'GET'
                })
                .then((res) => {
                    if (res.status != 200) {
                        throw '';
                        return;
                    }
                    return res.text();
                })
                .then((res) => {
                    this.downloadVideoUrl = res;
                    window.scrollTo(0, 550);
                })
                .catch(() => {

                })
                .finally(() => {
                    this.loading = false;
                })

        },
        downloadFullVideo() {
          this.downloadBtnClicked = true;
            if (this.invalidVideoUrlError) {
                return;
            }
            this.fullVideoUrl = null;
            let videoId;
            const mobileUrlMatch = this.userUrlInput.match(/^.+youtu\.be\/(.+)$/);
            if (mobileUrlMatch) {
                videoId = mobileUrlMatch[1];
            } else {
                videoId = this.userUrlInput.split(/(\?v=)|&/);
                videoId = videoId[2]
            }
            let url = `${API_URL}full?quality=${this.fullVideoQuality}&video=https://www.youtube.com/watch?v=${videoId}`
            this.loading = true;
            fetch(url, {
                    method: 'GET'
                })
                .then((res) => {
                    if (res.status != 200) {
                        throw '';
                        return;
                    }
                    return res.text();
                })
                .then((res) => {
                    this.fullVideoUrl = res;
                    this.downloadFileName = `Youtubecut.com.${makeid(5)}.mp4`;
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        hideDownloadLink() {
            this.downloadVideoUrl = null;
        },
        setDownloadFileName(){
            this.downloadFileName = `Youtubecut.com.${makeid(5)}.mp4`;

            setTimeout(()=>{
                this.actualLink = this.fullVideoUrl;
            },10);
        }
    }
}
</script>
<style>
@import 'main.css';
</style>