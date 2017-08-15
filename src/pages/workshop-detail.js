import React from "react";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";

import { fetchWorkshops } from "../actions/workshop-actions";
import { getObjectFromStore } from "../helpers/excel2017";
import EventTabs from "../partials/event-tabs";

import "../styles/workshop-detail.scss";

@connect(store => {
	return {
		workshops: store.workshops.collection
	};
})
class WorkshopDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			workshop: {},
			activeIndex: 0
		};
		this.handleTab = this.handleTab.bind(this);
	}
	componentWillMount() {
		this.props.dispatch(fetchWorkshops());
	}
	componentWillReceiveProps(nextProps) {
		const workshopId = nextProps.match.params.type;
		let workshop = getObjectFromStore(nextProps.workshops, workshopId);
		workshop.overview = ReactHtmlParser(workshop.overview);
		workshop.schedule = ReactHtmlParser(workshop.schedule);
		workshop.particulars = ReactHtmlParser(workshop.particulars);
		this.setState({ workshop });
	}
	handleTab(tabIndex) {
		this.setState({ activeIndex: tabIndex });
	}
	render() {
		return (
			<div className="workshop-container">
				<img src="/static/images/3eye.png" />
				<h2>
					{this.state.workshop.title}
				</h2>
				<button>
					<a target="_blank" href="http://www.google.com">
						Register
					</a>
				</button>
				<EventTabs
					activeTab={this.handleTab}
					tabLabels={["Overview", "Schedule", "Particulars"]}
				>
					<div className="active-tab">
						{this.state.workshop.overview}
					</div>
					<div>
						{this.state.workshop.schedule}
					</div>
					<div>
						{this.state.workshop.particulars}
					</div>
				</EventTabs>
			</div>
		);
	}
}

export default WorkshopDetail;
