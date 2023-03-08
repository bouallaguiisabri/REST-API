const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const { default: mongoose } = require("mongoose")

const Port = process.env.PORT || 3000



// Connect to MongoDB 
mongoose.connect('mongodb://localhost:27017/', {
useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))












// ROUTES




// Get all Users
app.get('/User', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// ADDING NEW USER
app.post('/User', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
// Edit a User
app.put('/User/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Remove a User
app.delete('/User/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({ message: 'User removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})





app.listen(Port, (err) => {
    err ? console.log(err) : console.log(`  server running with success on ${Port}`)

})