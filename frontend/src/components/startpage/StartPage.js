import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BootstrapMenuBar from "../BootstrapMenuBar";
import LandingContent from "./LandingContent";
import WhoWeAre from "./WhoWeAre";
import HowToHelp from "./HowToHelp";
import HowToReceiveHelp from "./HowToReceiveHelp";
import Partners from "./Partners";
import Footer from "./Footer";
import VideoIntro from "./VideoIntro";

export class StartPage extends Component {
  render() {
    return (
      <div>
        <BootstrapMenuBar />
        <main style={appStyle}>
		  <VideoIntro/>
          <LandingContent />
          <WhoWeAre />
          <HowToHelp />
          <HowToReceiveHelp />
          <Partners />
          <Footer />
        </main>
      </div>
    );
  }
}

const appStyle = {
  height: "90vh",
  overflowY: "scroll",
  scrollBehavior: "smooth",
};

export default withRouter(StartPage);
