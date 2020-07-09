const axios = require("axios")


module.exports = class DeezerApiControllers {
    static find(req, res, next) {

        // console.log(req.params);

        const { songTitle } = req.params


        axios({
            method: 'GET',
            url: `https://api.deezer.com/search?q=${songTitle}`
        })
            .then((song) => {
                let { data } = song
                let lagu = []
                data.data.forEach((playlist, index) => {
                    if (index < 6) {
                        let temp = {
                            title: playlist.title,
                            preview: playlist.preview,
                            picture: playlist.artist.picture_xl

                        }
                        lagu.push(temp)

                    }

                });
                res.status(200).json(lagu)
                // console.log(data);

            }).catch((err) => {

                console.log(err);

            });
    }
}