import React, { Component } from "react";
import { Redirect } from "react-router";

import DribbbleThumbnail from "../partials/dribbble-thumbnail";

import "../styles/competitions.css";

class Competitions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hide: ""
		};
		this.selectEvent = this.selectEvent.bind(this);
	}

	selectEvent(e) {
		let element = e.target.parentNode;
		element.style.opacity = 1;
		let pos = element.getBoundingClientRect();
		this.setState({ hide: "hide-class" });
		let midWidth = parseInt(window.innerWidth) / 2;
		let midHeight = parseInt(window.innerHeight) / 2;
		console.log("translate(" + midWidth - pos.left + "px,");
		element.style.transform =
			"translate(" +
			(midWidth - pos.left - pos.width / 2) +
			"px," +
			(midHeight - pos.top - pos.height / 2) +
			"px)";
	}

	render() {
		let files = [
			"3eye.png",
			"4x120small.png",
			"android.png",
			"bestSmall.png",
			"binbash.png",
			"binbashsmall.png",
			"bomb.png",
			"circum.png",
			"commerceSmallText.png",
			"csiSmall.png",
			"defactoSmall.png",
			"ecEventSmall.png",
			"ext.png",
			"funSmall.png",
			"gameSmall.png",
			"generalQuiz.png",
			"hackmastersmall.png"
		];
		let thumbs = files.map((image, index) => {
			return (
				<DribbbleThumbnail
					src={`images/${image}`}
					className={this.state.hide}
					alt={image}
					key={index}
				/>
			);
		});
		return <Redirect to="/under-construction" />;
	}
}

export default Competitions;
