
export function fetchImages(){
    return (dispatch)=>{
        dispatch({type: "FETCHING_IMAGES"});
        let files = [
            "3eye.png",
            "22.jpg",
            "23.jpg",
            "bestSmall.png",
            "binbash.png",
            "binbashsmall.png",
            "bomb.png",
            "circum.png",
            "11.jpg",
            "csiSmall.png",
            "1.jpg",
            "12.jpg",
            "ext.png",
            "funSmall.png",
            "13.jpg",
            "generalQuiz.png",
            "2.jpg"
        ];
        let imagePromises = []
        files.forEach((pic, index) => {
            imagePromises.push(fetch("/static/gallery/" + pic, {
                headers: {
                    "Content-Type": "image/png",
                    Accept: "image/png"
                }
            }))            
        });
        Promise.all(imagePromises)
        .then(images=>{
            return Promise.all(images.map(image=>image.blob()));
        })
        .then(imageBlobs=>{
            let imageJSON = imageBlobs.map((image,index)=>{
                return {
                    url: URL.createObjectURL(image),
                    priority: Math.ceil(Math.random()*3)
                }
            });
            dispatch({type: "FETCHED_IMAGES", payload: imageJSON});
        })
        .catch(err=>console.log(err));
    }
}