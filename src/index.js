//
// *
// Developer: Octanium (octanium91@gmail.com)
// *
//
// props:
//
//  src - source of content. Can be: youtube vide hash\code (example: LXb3EKWsInQ) or url on youtube video *[NOT WORKING IN IE]* (example: https://www.youtube.com/watch?v=LXb3EKWsInQ or https://youtu.be/LXb3EKWsInQ or https://www.youtube.com/embed/LXb3EKWsInQ)
//  params - object with parameters.
//      parameters detail:
//      autoPlay - boolean - set 'true' for autoplay video after press play button
//      thumbnailQuality - string - youtube video preview quality. Can be: default, hq, mq, sd, maxres
//      title - string - img title
//      className - string - custom class name
//
//  example: <VideoContentYT src="LXb3EKWsInQ" params={{autoPlay: true}} />
//

import React, { Component } from 'react';

export default class VideoContentYT extends Component {

  constructor(main) {
    super(main)

    this.state = {
      firstLoad: false,
      autoPlay: false,
      playBtnRed: false,
      title: "",
      className: "",
      videoId: "",
      thumbnailQuality: "",
      showContent: false
    };
  }

  render() {
    const { src = "", params = {}} = this.props;

    if (!this.state.firstLoad) {

      let localState = this.state;

      const thumbnailQuality = {default: "default", hq: "hqdefault", mq: "mqdefault", sd: "sddefault", maxres: "maxresdefault"};
      let findInUrl = false;
      if (src.indexOf("youtube") !== -1 && src.indexOf("watch") !== -1) {
        findInUrl = true;
        try {
          localState.videoId = new URLSearchParams(new URL(src).search).get("v");
        } catch {
          try {
            localState.videoId = new URLSearchParams(new URL("https://"+src).search).get("v");
          } catch {return(<div>error loading, wrong URL...</div>)}};
      };

      if (src.indexOf("youtube") !== -1 && src.indexOf("embed") !== -1) {
        findInUrl = true;
        try {
          localState.videoId = new URL(src).pathname.replace('/embed/', '');
        } catch {
          try {
            localState.videoId = localState.videoId = new URL("https://"+src).pathname.replace('/embed/', '');
          } catch {return(<div>error loading, wrong URL...</div>)}};
      };

      if (src.indexOf("youtu.be") !== -1) {
        findInUrl = true;
        try {
          localState.videoId = new URL(src).pathname.replace('/', '');
        } catch {
          try {
            localState.videoId = new URL("https://"+src).pathname.replace('/', '');
          } catch {return(<div>error loading, wrong URL...</div>)}};
      };

      if (!findInUrl) {
        localState.videoId = src;
      } else {
        if (!this.state.videoId) {
          localState.firstLoad = true;
          return(<div>error loading, not found video ID...</div>);
        };
      };

      if (params.hasOwnProperty("title")) {
        localState.title = params.title;
      } else {
        localState.title = "Video from YouTube";
      };
      if (params.hasOwnProperty("className")) {
        localState.className = params.className;
      } else {
        localState.className = "VideoContent__"+this.state.videoId;
      };
      if (params.hasOwnProperty("autoPlay")) {
        localState.autoPlay = params.autoPlay;
      };
      if (params.hasOwnProperty("thumbnailQuality")) {
        if (params.thumbnailQuality === "auto") {
          localState.thumbnailQuality = "maxresdefault";
        } else {
          try {
            localState.thumbnailQuality = thumbnailQuality[params.thumbnailQuality];
          } catch {
            localState.thumbnailQuality = "maxresdefault";
          };
        };
      } else {
        localState.thumbnailQuality = "maxresdefault";
      };

      localState.firstLoad = true;

    };

    if (this.state.showContent) {
      return (
        <div className={this.state.className+"__iframeVideo"} style={{position: "relative",width:"100%",height:"0",paddingBottom:"56.25%"}}>
          <iframe className={this.state.className+"__iframe"} style={{maxWidth: "100%", width:"100%", position:"absolute", left:"0"}} key={"vc_"+this.state.videoId+"__iframe"} title={this.state.title} alt={this.state.title} src={this.state.autoPlay ? "https://www.youtube.com/embed/"+this.state.videoId+"?rel=false&showinfo=false&autoplay=true" : "https://www.youtube.com/embed/"+this.state.videoId} allow='autoplay; encrypted-media' width="100%" height="100%" frameborder={0} />
        </div>
      );
    } else {
      return (
        <div className={this.state.className+"__imgVideo"} key={"vc_"+this.state.videoId+"__img"} style={{position: "relative",width:"100%",height:"0",paddingBottom:"56.25%",backgroundColor: "#000000"}}>
          <picture>
            <source srcSet= {"https://i.ytimg.com/vi_webp/"+this.state.videoId+"/"+this.state.thumbnailQuality+".webp"} type="image/webp"/>
            <img className={this.state.className+"__media"} key={"vc_"+this.state.videoId+"__media"} title={this.state.title} style={{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",border:"none"}} src={"https://i.ytimg.com/vi/"+this.state.videoId+"/"+this.state.thumbnailQuality+".jpg"} alt={this.state.title}/>
          </picture>
          <button className={this.state.className+"__button"} key={"vc_"+this.state.videoId+"__button"} style={{position:"absolute",top:"50%",left:"50%",zIndex:"1",padding:"0",width:"68px",height:"48px",border:"none",backgroundColor:"transparent",transform:"translate(-50%, -50%)",cursor:"pointer"}} type="button" aria-label="Play video" onMouseOver={(e) => (this.setState({playBtnRed: true}))} onMouseOut={(e) => (this.setState({playBtnRed: false}))} onClick={() => {this.setState({showContent: true})}} >
            <svg width="68" height="48" viewBox="0 0 68 48"><path className={this.state.className+"__button-shape"} key={"vc_"+this.state.videoId+"__button-shape"} style={{fill: this.state.playBtnRed ? "#ff0000" : "rgba(33,33,33,0.8)",fillOpacity: this.state.playBtnRed ? "0.8" : "1"}} d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path><path className={this.state.className+"__button-icon"} key={"vc_"+this.state.videoId+"__button-icon"} style={{fill: "#ffffff"}} d="M 45,24 27,14 27,34"></path></svg>
          </button>
        </div>
      );
    }

  };
};

