export function getObjectFromStore(store, id) {
	let objArray = store.filter((obj, index) => {
		return obj.id === id;
	});
	if (objArray.length == 0 || objArray.length > 1) return {};
	return objArray[0];
}
