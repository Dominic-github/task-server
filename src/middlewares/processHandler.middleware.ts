const exit = () => {
  process.exit(1)
}

process.on('SIGINT', () => {
  console.log('Ctrl + C:: Service stop!!!')
  exit()
})

// CTRL+C
process.on('SIGQUIT', () => {
  console.log('Keyboard quit:: Service stop!!!')
  exit()
})
// Keyboard quit
process.on('SIGTERM', () => {
  console.log('Kill command:: Service stop!!!')
  exit()
})

export default this
