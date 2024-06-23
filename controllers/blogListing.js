const BlogPost = require("../models/blog.js");

module.exports.index=async(req,res)=>{
    const allListing = await BlogPost.find({});
    res.render("bloglisting/index.ejs",{allListing});
}

module.exports.new=async(req,res)=>{
    res.render("bloglisting/new.ejs");
}

module.exports.create=(async(req,res)=>{
    const newBlog = new BlogPost(req.body.listing);
    newBlog.save();
    req.flash("success","new listing created");
    res.redirect("/bloglisting")
      
  })

  module.exports.show=async(req,res)=>{
    let {id} =req.params;
    const listing =await BlogPost.findById(id);         // .populate("reviews");
    
    if(!listing){
      req.flash("error","error occured");
      res.redirect("/bloglisting");
    }
    res.render("bloglisting/show.ejs",{ listing });
  }

  module.exports.edit=async (req, res) => {
    let { id } = req.params;
    const listing = await BlogPost.findById(id);
    if(!listing){
      req.flash("error","Listing you requested is deleted");
      res.redirect("/listings");
    }
    res.render("bloglisting/edit.ejs", { listing });
  }

  module.exports.update=async (req, res) => {
    let { id } = req.params;
    await BlogPost.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success"," listing updated");

    res.redirect(`/bloglisting/${id}`);
  }

  module.exports.destroy=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await BlogPost.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," listing deleted");

    res.redirect("/bloglisting");
  }