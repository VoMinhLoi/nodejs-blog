// Vì Schema dùng Constructor Function nên có property trong propoto và không thể . gọi trực tiếp thuộc tính. Vì vậy viết util mongoose này chuyển từ Constructor Function sang Object để .property
module.exports = {
    multipleMongooseToObject: (mongooses)=>{
        return mongooses.map(mongoose => mongoose.toObject())
    },
    mongooseToObject: (mongoose)=>{
        return mongoose.toObject()
    }
}