export function fetchWorkshops(workshop) {
	return dispatch => {
		dispatch({ type: "FETCHING_WORKSHOPS" });
		const URL = `/assets/workshops.json`;
		fetch(URL).then(response => response.json()).then(data => {
			dispatch({ type: "FETCHED_WORKSHOPS", payload: data });
		});
	};
}
