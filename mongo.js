const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://asimfso:${password}@fso.e40i0.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fso`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "GET and POST are the most important methods of HTTP protocol",
  important: true,
});

Note.find({ important: true }).then((result) => {
  result.forEach((note) => console.log(note));
  mongoose.connection.close();
});

// save note
// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });
