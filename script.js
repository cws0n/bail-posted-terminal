const input = document.getElementById('input')
const output = document.getElementById('output')

const files = {
  '/': ['home', 'games', 'config.txt'],
  '/home': ['carson', 'steam'],
  '/home/carson': ['notes.txt'],
  '/games': ['elden_ring.exe', 'minecraft.sh']
}
let cwd = '/home/carson'
let history = []
let historyIndex = -1

input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const command = input.value.trim()
    if (command !== '') {
      history.push(command)
      historyIndex = history.length
    }

    output.innerHTML += `<div class="output-line">[konsle@deck ${cwd}]$ ${command}</div>`
    handleCommand(command.toLowerCase())
    input.value = ''
    output.scrollTop = output.scrollHeight
  } else if (e.key === 'ArrowUp') {
    if (historyIndex > 0) {
      historyIndex--
      input.value = history[historyIndex]
    }
  } else if (e.key === 'ArrowDown') {
    if (historyIndex < history.length - 1) {
      historyIndex++
      input.value = history[historyIndex]
    } else {
      historyIndex = history.length
      input.value = ''
    }
  }
})

function handleCommand(cmd) {
  const args = cmd.split(' ')
  const base = args[0]
  let response = ''

  switch (base) {
    case 'help':
      response = `available commands:
  ls      list files
  cd      change dir
  pwd     print current dir
  echo    print text
  clear   clear screen
  sudo    nope
  launch game  fake launch
  steam   fake steam boot
  carson  surprise mf`
      break
    case 'ls':
      response = files[cwd]?.join('\n') || 'no files here bruh'
      break
    case 'cd':
      const newPath = args[1]
      const fullPath = newPath === '..'
        ? cwd.split('/').slice(0, -1).join('/') || '/'
        : cwd + '/' + newPath

      if (files[fullPath]) {
        cwd = fullPath
        updatePrompt()
      } else {
        response = `cd: no such file or directory: ${newPath}`
      }
      break
    case 'pwd':
      response = cwd
      break
    case 'echo':
      response = args.slice(1).join(' ')
      break
    case 'clear':
      output.innerHTML = ''
      return
    case 'sudo':
      response = `nice try lmao permission denied`
      break
    case 'steam':
      response = `booting Steam... jk bro this fake as hell`
      break
    case 'launch':
      if (args[1] === 'game') {
        response = `Launching game... preparing GPU... loading shaders... oh wait this is fake lol`
      } else {
        response = `launch what now??`
      }
      break
    case 'carson':
      response = `yo it's the legend himself carson the god of code`
      break
    case 'exit':
      response = `exiting... (nah jk you stuck in here forever)`
      break
    default:
      response = `${base}: command not found`
  }

  output.innerHTML += `<div class="output-line">${response}</div>`
}

function updatePrompt() {
  document.getElementById('prompt').textContent = `[konsle@deck ${cwd}]$`
}
