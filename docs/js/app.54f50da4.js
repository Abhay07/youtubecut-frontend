(function(e){function t(t){for(var n,l,a=t[0],u=t[1],s=t[2],c=0,h=[];c<a.length;c++)l=a[c],Object.prototype.hasOwnProperty.call(o,l)&&o[l]&&h.push(o[l][0]),o[l]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);d&&d(t);while(h.length)h.shift()();return r.push.apply(r,s||[]),i()}function i(){for(var e,t=0;t<r.length;t++){for(var i=r[t],n=!0,a=1;a<i.length;a++){var u=i[a];0!==o[u]&&(n=!1)}n&&(r.splice(t--,1),e=l(l.s=i[0]))}return e}var n={},o={app:0},r=[];function l(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,l),i.l=!0,i.exports}l.m=e,l.c=n,l.d=function(e,t,i){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(l.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(i,n,function(t){return e[t]}.bind(null,n));return i},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],u=a.push.bind(a);a.push=t,a=a.slice();for(var s=0;s<a.length;s++)t(a[s]);var d=u;r.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},"034f":function(e,t,i){"use strict";var n=i("85ec"),o=i.n(n);o.a},"56d7":function(e,t,i){"use strict";i.r(t);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("2b0e"),o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("div",{staticClass:"row top-container"},[i("div",{staticClass:"input-wrapper"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.userUrlInput,expression:"userUrlInput"}],staticClass:"urlInput",attrs:{placeholder:"Paste Youtube video link here"},domProps:{value:e.userUrlInput},on:{input:[function(t){t.target.composing||(e.userUrlInput=t.target.value)},e.setVideoUrl]}}),i("div",{directives:[{name:"show",rawName:"v-show",value:e.invalidVideoUrlError&&e.downloadBtnClicked,expression:"invalidVideoUrlError && downloadBtnClicked"}],staticClass:"error"},[e._v(e._s(e.INVALID_VIDEO_URL_ERROR))])]),i("select",{directives:[{name:"model",rawName:"v-model",value:e.fullVideoQuality,expression:"fullVideoQuality"}],on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.fullVideoQuality=t.target.multiple?i:i[0]}}},[i("option",{attrs:{value:"highest"}},[e._v("Quality highest")]),i("option",{attrs:{value:"18"}},[e._v("Quality medium")])]),i("button",{on:{click:e.downloadFullVideo}},[e._v("Download Video")])]),i("div",{staticClass:"download-link"},[i("a",{directives:[{name:"show",rawName:"v-show",value:e.fullVideoUrl,expression:"fullVideoUrl"}],attrs:{href:e.fullVideoUrl,target:"_blank",download:""}},[e._v("Download Link")])]),e.loading?i("div",{staticClass:"loader"},[e._m(0)]):e._e()])},r=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"lds-ring"},[i("div"),i("div"),i("div"),i("div")])}],l=(i("99af"),i("a9e3"),i("b680"),i("d3b7"),i("ac1f"),i("466d"),i("1276"),"https://api.youtubecut.com/"),a="Please enter a valid youtube video url",u={name:"App",data:function(){return{userUrlInput:"",videoId:null,startTime:"00:00",endTime:null,quality:1,startTimeSeconds:0,endTimeSeconds:0,playerVars:{autoplay:1},loading:!1,showPlayer:!1,downloadVideoUrl:null,playerLoading:!1,startTimeErrMsg:"",endTimeErrMsg:"",cutVideoClicked:!1,fullVideoUrl:"",fullVideoQuality:18,invalidVideoUrlError:!1,INVALID_VIDEO_URL_ERROR:a,downloadBtnClicked:!1}},computed:{},methods:{setVideoUrl:function(){var e,t=this;this.hideDownloadLink(),this.invalidVideoUrlError=!1,this.fullVideoUrl=null,this.playerLoading=!0;var i=this.userUrlInput.match(/^.+youtu\.be\/(.+)$/),n=this.userUrlInput.match(/^.+youtube\.com\/watch\?v=.+$/);if(i)e=i[1];else{if(!n)return void(this.invalidVideoUrlError=!0);e=this.userUrlInput.split(/(\?v=)|&/),e=e[2]}e?(this.downloadVideoUrl=null,this.videoId=e,this.startTimeSeconds=this.endTimeSeconds=0,this.downloadVideoUrl=null):this.videoId=null,setTimeout((function(){t.$refs.youtube&&t.$refs.youtube.player&&t.$refs.youtube.player.getPlayerState().then((function(e){1==e&&(t.playerLoading=!1)})).catch()}),0)},playing:function(){console.log("we are watching!!!"),this.playerLoading=!1,window.scrollTo(0,500)},setStartTime:function(){var e=this;this.player.getCurrentTime().then((function(t){e.startTimeSeconds=Number(t.toFixed(2))}))},setEndTime:function(){var e=this;this.player.getCurrentTime().then((function(t){e.endTimeSeconds=Number(t.toFixed(2))})),this.player.pauseVideo()},preview:function(){var e=this;this.duration&&(this.player.seekTo(this.startTimeSeconds),setTimeout((function(){e.player.pauseVideo()}),1e3*(this.duration+1)),this.player.playVideo())},download:function(){var e=this;if(this.cutVideoClicked=!0,this.duration){this.downloadVideoUrl=null,this.player.pauseVideo(),this.loading=!0;var t=encodeURIComponent("https://www.youtube.com/watch?v=".concat(this.videoId)),i="".concat(l,"?video=").concat(t,"&start=").concat(this.startTimeSeconds,"&end=").concat(this.endTimeSeconds,"&quality=").concat(this.quality);fetch(i,{method:"GET"}).then((function(e){if(200!=e.status)throw"";return e.text()})).then((function(t){e.downloadVideoUrl=t,window.scrollTo(0,550)})).catch((function(){})).finally((function(){e.loading=!1}))}},downloadFullVideo:function(){var e=this;if(this.downloadBtnClicked=!0,!this.invalidVideoUrlError){var t;this.fullVideoUrl=null;var i=this.userUrlInput.match(/^.+youtu\.be\/(.+)$/);i?t=i[1]:(t=this.userUrlInput.split(/(\?v=)|&/),t=t[2]);var n="".concat(l,"full?quality=").concat(this.fullVideoQuality,"&video=https://www.youtube.com/watch?v=").concat(t);this.loading=!0,fetch(n,{method:"GET"}).then((function(e){if(200!=e.status)throw"";return e.text()})).then((function(t){e.fullVideoUrl=t})).catch((function(){})).finally((function(){e.loading=!1}))}},hideDownloadLink:function(){this.downloadVideoUrl=null}}},s=u,d=(i("034f"),i("2877")),c=Object(d["a"])(s,o,r,!1,null,null,null),h=c.exports,p=i("e0ec"),f=i.n(p);n["a"].use(f.a),n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(h)}}).$mount("#app")},"85ec":function(e,t,i){}});
//# sourceMappingURL=app.54f50da4.js.map