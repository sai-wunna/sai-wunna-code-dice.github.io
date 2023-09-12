document.addEventListener('DOMContentLoaded', function () {
  const getNode = (node) => document.querySelector(node)
  const createNode = (node) => document.createElement(node)
  const user_img = getNode('#user_img')
  const bot_img = getNode('#bot_img')
  const roll_btn = getNode('#roll')
  const user_score_result = getNode('#user_score')
  const bot_score_result = getNode('#bot_score')
  const result_board = getNode('#result_board')
  const result_box = getNode('#result_box')
  const game_end_result = getNode('#game_end_result')
  const restartBtn = getNode('#restart')
  const playMatches = getNode('.matches-list')
  const modal = getNode('.modal')
  const closeModalBtn = getNode('.close-modal')

  let matches = []
  let user_score = 0
  let bot_score = 0
  let click_btn_period = true
  const rand = () => {
    return Math.floor(Math.random() * 6) + 1
  }
  const showModal = () => {
    modal.classList.add('show-modal')
  }
  const closeModal = () => {
    modal.classList.remove('show-modal')
    let child = playMatches.lastElementChild
    while (child) {
      playMatches.removeChild(child)
      child = playMatches.lastElementChild
    }
  }
  const playedMatchCreator = ({ user_score, bot_score }, index) => {
    const li = createNode('li')
    li.setAttribute('class', 'match')
    li.textContent = `${index + 1}. User ${user_score} - ${bot_score} Bot`
    return li
  }

  result_board.addEventListener('click', () => {
    matches.map((match, index) => {
      playMatches.appendChild(playedMatchCreator(match, index))
    })
    showModal()
  })
  closeModalBtn.addEventListener('click', () => {
    closeModal()
  })

  roll_btn.addEventListener('click', () => {
    let rand_one = rand()
    let rand_two = rand()
    result_board.style.color = ''

    user_img.src = `./imgs/inverted-dice-${rand_one}.png`
    bot_img.src = `./imgs/inverted-dice-${rand_two}.png`

    if (rand_one > rand_two) {
      user_score++
    } else if (rand_one < rand_two) {
      bot_score++
    } else {
      result_board.style.color = 'red'
    }
    user_score_result.textContent = user_score
    bot_score_result.textContent = bot_score
  })

  restartBtn.addEventListener('click', () => {
    if (!click_btn_period) return
    if (bot_score === 0 && user_score === 0) {
      return alert('Not Even Played Yet')
    }
    restartBtn.style.display = 'none'
    matches.push({ user_score, bot_score })
    game_end_result.style.display = 'block'
    roll_btn.style.display = 'none'
    result_box.style.display = 'none'
    if (user_score < bot_score) {
      game_end_result.textContent = 'You Lost'
    } else if (user_score === bot_score) {
      game_end_result.textContent = 'DRAW :P'
    } else {
      game_end_result.textContent = 'YOU ARE THE ONE'
    }
    click_btn_period = false
    setTimeout(() => {
      restartBtn.style.display = ''
      click_btn_period = true
      roll_btn.style.display = ''
      game_end_result.style.display = 'none'
      result_box.style.display = 'flex'
      user_img.src = `./imgs/user.png`
      bot_img.src = `./imgs/bot.png`
      user_score = 0
      bot_score = 0
      user_score_result.textContent = user_score
      bot_score_result.textContent = bot_score
    }, 3000)
  })
})
