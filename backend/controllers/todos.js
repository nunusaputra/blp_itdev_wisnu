const { default: axios } = require("axios");
const path = require("path");
const fs = require("fs");

const User = require("../models").User;
const Todos = require("../models").Todo;

module.exports = {
  // -------------------------- START FEATURES CONSUME PUBLIC API -------------------------- //
  fetchTodos: async (req, res) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = response.data;
      const todos = data.slice(0, 5);

      const createdTodos = [];

      for (const todo of todos) {
        const title = todo.title;
        const status = todo.completed;

        const newTodo = await Todos.create({
          title: title,
          status: status,
          desc: "todos from public api",
          userId: req.userId,
        });
        createdTodos.push(newTodo);
      }

      // * Response if success store todos to database
      res.status(200).json({
        message: "Todos fetched and stored to database",
        data: createdTodos,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // -------------------------- END FEATURES CONSUME PUBLIC API -------------------------- //

  // -------------------------- START FEATURES GET ALL TODOS -------------------------- //
  getAllTodos: async (req, res) => {
    try {
      // TODO: Get all todos
      const todos = await Todos.findAll({
        attributes: {
          exclude: ["updatedAt"],
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password", "refresh_token", "updatedAt"],
            },
          },
        ],
        where: {
          userId: req.userId,
        },
        order: [["createdAt", "DESC"]],
      });

      //   TODO: Check if todos not found
      if (todos.length === 0) {
        return res.status(404).json({
          message: "Todos not found!",
        });
      }

      // * Response if success get todos
      res.status(200).json({
        message: "Successufully get todos!",
        data: todos,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // -------------------------- END FEATURES GET ALL TODOS -------------------------- //

  //   -------------------------- START FEATURES GET TODOS BY ID -------------------------- //
  getTodosByID: async (req, res) => {
    const { id } = req.params;
    try {
      // TODO: Get todos by id
      const todo = await Todos.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["updatedAt"],
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password", "refresh_token", "updatedAt"],
            },
          },
        ],
      });

      // TODO: Check if todos not found
      if (!todo) {
        return res.status(404).json({
          message: "Todos not found!",
        });
      }

      // * Response if success get todos
      res.status(200).json({
        message: "Successufully get todos by id!",
        data: todo,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  //   -------------------------- END FEATURES GET TODOS BY ID -------------------------- //

  //   -------------------------- START FEATURES CREATE TODOS -------------------------- //
  createTodos: async (req, res) => {
    const { title, desc, status } = req.body;

    if (!req.files) {
      return res.status(400).json({
        message: "You must upload a file!",
      });
    }

    let imageURL = null;
    let docsURL = null;
    let imageName = null;
    let docsName = null;

    const allowedImageTypes = [".png", ".jpg", ".jpeg"];
    const allowedDocsTypes = [".pdf"];

    // TODO: Validation if image exists
    if (req.files.image) {
      const image = req.files.image;
      const imageSize = image.data.length;
      const imageExt = path.extname(image.name).toLowerCase();
      imageName = image.md5 + imageExt;
      imageURL = `${req.protocol}://${req.get("host")}/images/${imageName}`;

      // TODO: Validation if file type is not allowed
      if (!allowedImageTypes.includes(imageExt)) {
        return res.status(422).json({
          message: "Invalid image type! Only PNG, JPG, JPEG are allowed.",
        });
      }

      // TODO: Validation if file size is too large
      if (imageSize > 2000000) {
        return res.status(422).json({
          message: "File size is too large! Max 2 MB.",
        });
      }

      // TODO: Save image to folder images
      image.mv(`./public/images/${imageName}`, (err) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
      });
    }

    // TODO: Validation if file exists
    if (req.files.document) {
      const docs = req.files.document;
      const docsSize = docs.data.length;
      const docsExt = path.extname(docs.name).toLowerCase();
      docsName = docs.md5 + docsExt;
      docsURL = `${req.protocol}://${req.get("host")}/documents/${docsName}`;

      // TODO: Validation if file type is not allowed
      if (!allowedDocsTypes.includes(docsExt)) {
        return res.status(422).json({
          message: "Invalid file type! Only PDF are allowed.",
        });
      }

      // TODO: Validation if file size is too large
      if (docsSize > 3000000) {
        return res.status(422).json({
          message: "File size is too large! Max 3 MB.",
        });
      }

      // TODO: Save file to folder files
      docs.mv(`./public/documents/${docsName}`, (err) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
      });
    }

    try {
      // TODO: Save todos to database
      const todo = await Todos.create({
        title,
        desc,
        status,
        image: imageName,
        document: docsName,
        imageURL: req.files.image ? imageURL : null,
        documentURL: req.files.document ? docsURL : null,
        userId: req.userId,
      });

      // * Response if success store todos to database
      res.status(201).json({
        message: "Successufully create todos!",
        data: todo,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  //   -------------------------- END FEATURES CREATE TODOS -------------------------- //

  //   -------------------------- START FEATURES UPDATE TODOS -------------------------- //
  updateTodos: async (req, res) => {
    const todo = await Todos.findOne({
      where: {
        id: req.params.id,
      },
    });

    // TODO: Validation if todo not found
    if (!todo) {
      return res.status(404).json({
        message: "Todos not found!",
      });
    }

    let imageFileName = todo.image;
    let documentFileName = todo.document;

    // TODO: Validation if new image uploaded
    if (req.files && req.files.image) {
      const image = req.files.image;
      const imageSize = image.data.length;
      const imageExt = path.extname(image.name).toLowerCase();
      imageFileName = image.md5 + imageExt;
      const allowedImageTypes = [".png", ".jpg", ".jpeg"];

      // TODO: Validation if image type is not allowed
      if (!allowedImageTypes.includes(imageExt)) {
        return res.status(422).json({
          message: "Invalid image type! Only PNG, JPG, JPEG are allowed.",
        });
      }

      // TODO: Validation if image size is too large
      if (imageSize > 2000000) {
        return res.status(422).json({
          message: "File size is too large! Max 2 MB.",
        });
      }

      // TODO: Delete old image from folder images
      const imagePath = `./public/images/${todo.image}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      // TODO: Save new image to folder images
      image.mv(`./public/images/${imageFileName}`, (err) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
      });
    }

    // TODO: Validation if new document uploaded
    if (req.files && req.files.document) {
      const docs = req.files.document;
      const docsSize = docs.data.length;
      const docsExt = path.extname(docs.name).toLowerCase();
      documentFileName = docs.md5 + docsExt;
      const allowedDocsTypes = [".pdf"];

      // TODO: Validation if document type is not allowed
      if (!allowedDocsTypes.includes(docsExt)) {
        return res.status(422).json({
          message: "Invalid document type! Only PDF are allowed.",
        });
      }

      // TODO: Validation if document size is too large
      if (docsSize > 3000000) {
        return res.status(422).json({
          message: "File size is too large! Max 3 MB.",
        });
      }

      // TODO: Delete old document from document folder
      const docsPath = `./public/documents/${todo.document}`;
      if (fs.existsSync(docsPath)) {
        fs.unlinkSync(docsPath);
      }

      // TODO: Save new document to document folder
      docs.mv(`./public/documents/${documentFileName}`, (err) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
      });
    }

    const { title, desc, status } = req.body;
    const imageURL = `${req.protocol}://${req.get(
      "host"
    )}/images/${imageFileName}`;
    const docsURL = `${req.protocol}://${req.get(
      "host"
    )}/documents/${documentFileName}`;

    try {
      await Todos.update(
        {
          title,
          desc,
          status,
          image: imageFileName,
          document: documentFileName,
          imageURL: imageURL,
          documentURL: docsURL,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      // * Response if success update todos
      res.status(200).json({
        message: "Successufully update todos!",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  //   -------------------------- END FEATURES UPDATE TODOS -------------------------- //

  //   -------------------------- START FEATURES DELETE TODOS -------------------------- //
  deleteTodos: async (req, res) => {
    const todo = await Todos.findOne({
      where: {
        id: req.params.id,
      },
    });

    // TODO: Check if todos not found
    if (!todo) {
      return res.status(404).json({
        message: "Todos not found!",
      });
    }

    try {
      // TODO: Delete image from folder images if exists
      const imagePath = `./public/images/${todo.image}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      // TODO: Delete document from folder documents if exists
      const docsPath = `./public/documents/${todo.document}`;
      if (fs.existsSync(docsPath)) {
        fs.unlinkSync(docsPath);
      }

      // TODO: Delete todos from database
      await Todos.destroy({
        where: {
          id: req.params.id,
        },
      });

      // * Response if success delete todos
      res.status(200).json({
        message: "Successufully delete todos!",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  //   -------------------------- END FEATURES DELETE TODOS -------------------------- //
};
