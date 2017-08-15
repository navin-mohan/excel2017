import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { fetchImages } from "../actions/gallery-actions";

import GalleryThumbnail from "../partials/gallery-thumbnail.js";

import "../styles/gallery.css";

@connect(store => {
	return {
		images: store.gallery.images,
		fetched: store.gallery.fetched,
		fetching: store.gallery.fetching
	};
})
class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			render: false,
			viewPort: {},
			selectedImage: "",
			pos: 0
		};
		this.prevWidth = 0;
		this.pos = 0;
		this.thumbnails = [];
		this.imageView = this.imageView.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.collectWidth = this.collectWidth.bind(this);
	}

	componentWillMount() {
		this.props.dispatch(fetchImages());
	}

	componentDidMount() {
		let height = document.getElementById("gallery-container").offsetHeight;
		console.log(height);
		if (screen.width > 1000) {
			this.unitHeight = height / 6;
			console.log("something");
		} else {
			this.unitHeight = height / 3;
		}
		this.setState({ renderPosition: true });
	}

	imageView(e) {
		let element = e.target;
		let elem = document.getElementById("viewport-image");
		elem.src = element.src;
		this.thumbPosition = element.getBoundingClientRect();
		let viewPosition = elem.getBoundingClientRect();
		let orientation =
			window.innerWidth - viewPosition.width <
			window.innerHeight - viewPosition.height
				? "landscape"
				: "portrait";
		if (!elem.classList.contains(orientation)) {
			elem.classList.remove("landscape", "portrait");
			elem.classList.add(orientation);
		}
		viewPosition = elem.getBoundingClientRect();
		this.scale = this.thumbPosition.height / viewPosition.height;
		this.setState((prevState, props) => {
			return {
				...prevState,
				imageStyle: {
					transform:
						"translate(" +
						(this.thumbPosition.left - viewPosition.left) +
						"px," +
						(this.thumbPosition.top - viewPosition.top) +
						"px)scale(" +
						this.scale +
						")"
				}
			};
		});
		let animatedStyle = "";
		this.setState((prevState, props) => {
			return {
				...prevState,
				viewPort: {
					zIndex: 1
				}
			};
		});
		setTimeout(() => {
			this.setState((prevState, props) => {
				this.viewPosition = document
					.getElementById("viewport-image")
					.getBoundingClientRect();
				return {
					...prevState,
					imageStyle: {
						transition: "all 0.5s",
						transform: "translate(0,0)scale(1)"
					}
				};
			});
		}, 100);
	}

	handleClose() {
		let viewPosition = document
			.getElementById("viewport-image")
			.getBoundingClientRect();
		console.log(viewPosition);
		this.setState({
			imageStyle: {
				transform:
					"translate(" +
					(this.thumbPosition.left - viewPosition.left) +
					"px," +
					(this.thumbPosition.top - viewPosition.top) +
					"px)scale(" +
					this.scale +
					")",
				transition: "all 0.5s"
			}
		});
		setTimeout(() => {
			this.setState((prevState, props) => {
				return {
					...prevState,
					viewPort: {
						zIndex: -1
					},
					imageStyle: {
						transform: "none"
					}
				};
			});
		}, 500);
	}

	renderStart() {
		this.setState({
			render: true,
			selectedImage: this.thumbnails[0]
		});
	}

	collectWidth(index, width, height) {
		this.setState((prevState, props) => {
			if (count == 17)
				return {
					...prevState,
					count: prevState.count + 1,
					pos: prevState.coords.filter((obj, index) => {
						obj.width = width;
						obj.height = height;
						return true;
					})
				};
		});
	}

	render() {
		return <Redirect to="/under-construction" />;
		if (this.props.fetching) {
			return <h1>Loading....</h1>;
		}
		let pos = 0;
		console.log(this.unitHeight);
		let images = this.props.images.map((link, index) => {
			let styleCSS = {};
			if (this.state.renderPosition) {
				styleCSS = {
					left: pos,
					width: this.unitHeight,
					height: this.unitHeight
				};
				pos += this.unitHeight;
			}

			let thumb = (
				<GalleryThumbnail
					key={index}
					url={link.url}
					onClick={this.imageView}
					style={styleCSS}
				/>
			);
			return thumb;
		});
		return (
			<div
				className="gallery-container"
				id="gallery-container"
				style={{ width: pos }}
			>
				<div className="gallery">
					{images}
				</div>
				<ViewPort
					src={this.state.selectedImage}
					alt={this.state.selectedImage}
					style={this.state.viewPort}
					onClose={this.handleClose}
					imageStyle={this.state.imageStyle}
				/>
			</div>
		);
	}
}

function ViewPort(props) {
	return (
		<div className="viewport-container" style={props.style}>
			<div className="viewport">
				<img id="viewport-image" src={props.src} style={props.imageStyle} />
			</div>
			<div className="close-button">
				<span onClick={props.onClose}>&times;</span>
			</div>
		</div>
	);
}

export default Gallery;
