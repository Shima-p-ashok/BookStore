const books = require('../models/bookModel')

exports.addBook = async (req, res) => {
    console.log("Inside addBookController");
    const { title, author, noofpages, imageUrl, price, dprice, abstract, publisher, language, isbn, category } = req.body

    UploadedImage = []
    req.files.map((item) => UploadedImage.push(item.filename))

    console.log(req.files); //array
    console.log(req.body);

    const email = req.payload?.userMail

    try {
        const existingBook = await books.findOne({ title, userMail: email })
        if (existingBook) {
            res.status(401).json("Book already existing...")
        }
        else {
            const newBook = new books({
                title, author, noofpages, imageUrl, price, dprice, abstract, publisher, language, isbn, category, UploadedImage, userMail:email
            })
            await newBook.save()
            res.status(200).json(newBook)
        }
    }
    catch (err) {
        res.status(500).json("Err" + err)
    }
}

exports.getHomeBooks = async(req, res)=>{
    try {
    const homeBooks = await books.find().sort({ _id: -1 }).limit(4); 
    res.status(200).json(homeBooks);
  } catch (err) {
    res.status(500).json("Err" + err)
  }       
}

exports.getAllBooks=async(req, res)=>{
    
  try {
    const allBooks = await books.find()
    res.status(200).json(allBooks);
  } catch (err) {
    res.status(500).json("Err" + err)
  }
}

exports.getABook=async(req, res)=>{
  console.log("Inside getABook");
  const {id} = req.params
  console.log(id);
  
  try {
    const AllBooks = await books.findOne({_id:id})
    res.status(200).json(AllBooks);
  } catch (err) {
    res.status(500).json("Err" + err)
  }
}