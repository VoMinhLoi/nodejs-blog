class NewsController {
    index(request, response){
        response.render('news')
    }
    show(req, res){
        res.send('News Detail')
    }
}
module.exports = new NewsController