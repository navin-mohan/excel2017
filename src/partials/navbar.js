import React from "react";
import { Link } from "react-router-dom";

import GoLock from "react-icons/lib/go/lock";
import {
	FaArrowUp,
	FaCameraRetro,
	FaCalendar,
	FaMicrophone
} from "react-icons/lib/fa";

import { MdVideogameAsset } from "react-icons/lib/md";

import "../styles/navbar.css";

class Navbar extends React.Component {
	render() {
		return (
			<div className="navbar-container">
				<div className="navbar">
					<div className="icons">
						<div className="left">
							<div className="lonely-home">
								<Link to="/" className="nav-text">
									Home
								</Link>
							</div>
							<div>
								<Link to="/competitions" className="nav-text">
									Competitions
								</Link>
								<Link to="/competitions">
									<MdVideogameAsset />
								</Link>
							</div>
							<div>
								<Link to="/spotlight" className="nav-text">
									Spotlight
								</Link>
								<Link to="/spotlight">
									<FaCalendar />
								</Link>
							</div>
						</div>
						<div className="right">
							<div>
								<Link to="/events" className="nav-text">
									Events
								</Link>
								<Link to="/events">
									<FaCameraRetro />
								</Link>
							</div>
							<div>
								<Link to="/gallery" className="nav-text">
									Gallery
								</Link>
								<Link to="/gallery">
									<FaArrowUp />
								</Link>
							</div>
						</div>
					</div>
					<div className="bot-spawn">
						<div>
							<FaMicrophone />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Navbar;
