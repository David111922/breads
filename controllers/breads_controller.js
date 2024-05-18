const express = require("express");
const breads = express.Router();
const Bread = require("../models/bread.js");

// INDEX
breads.get("/", (req, res) => {
  Bread.find().then((foundBreads) => {
    // console.log(foundBreads)
    res.render("index", {
      breads: foundBreads,
      title: "Index Page",
    });
  });
});

// NEW
breads.get("/new", (req, res) => {
  res.render("new");
});

// SHOW
breads.get("/:id", (req, res) => {
  Bread.findById(req.params.id)
    .then((foundBread) => {
      res.render("show", {
        bread: foundBread,
      });
    })
    .catch((err) => {
      res.send("404");
    });
});

// EDIT
breads.get("/:id/edit", (req, res) => {
  Bread.findById(req.params.id)
    .then((foundBread) => {
      res.render("edit", {
        bread: foundBread,
      });
    })
    .catch((err) => {
      res.status(404).send("404");
    });
});


// !original edit code
// breads.get("/:indexArray/edit", (req, res) => {
//   res.render("edit", {
//     bread: Bread[req.params.indexArray],
//     index: req.params.indexArray,
//   });
// });

// CREATE
breads.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }

  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }

  Bread.create(req.body)
    .then(() => {
      res.redirect("/breads");
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});








// !original create code
// breads.post("/", (req, res) => {
//   if (req.body.image) {
//     req.body.image = undefined;
// }

//   if (req.body.hasGluten === "on") {
//     req.body.hasGluten = "true";
//   } else {
//     req.body.hasGluten = "false";
//   }
//   Bread.create(req.body)
//   res.redirect("/breads");


// DELETE
breads.delete("/:id", (req, res) => {
  Bread.findByIdAndDelete(req.params.id).then((deletedBread) => {
    res.status(303).redirect("/breads");
  });
});

// update
breads.put("/:id", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }

  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedBread) => {
      res.redirect(`/breads/${req.params.id}`);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});



// !original update code
// breads.put("/:arrayIndex", (req, res) => {
//   if (req.body.hasGluten === "on") {
//     req.body.hasGluten = true;
//   } else {
//     req.body.hasGluten = false;
//   }
//   Bread[req.params.arrayIndex] = req.body;
//   res.redirect(`/breads/${req.params.arrayIndex}`)
// })

module.exports = breads
