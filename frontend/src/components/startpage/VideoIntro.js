import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import "./styles.scss";

class VideoIntro extends Component {
    render () {
        return (
        <div className='player-wrapper' style={divStyle}>
            <ReactPlayer
            className='react-player'
            url= '/video.mp4'
			playing
            width='95%'
            height='95%'
            controls = {true}

            />
        </div>
        )
    }
}


const divStyle = {
  textAlign: "center",
  margin: "4vh 8vw",
};


export default VideoIntro;