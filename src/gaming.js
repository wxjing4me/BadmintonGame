
var point_left = 0
var point_right = 0
var hour = 0
var min = 0
var sec = 0
var ctype = 'double'
var cpoint = 15
var ball_in = 'leftBottom'  //发球权
var player_leftTop = 'PlayerA1'
var player_leftBottom = 'PlayerA2'
var player_rightTop = 'PlayerB1'
var player_rightBottom = 'PlayerB2'

$(function () {
  ['left', 'right'].forEach(function (side) {
    $(`[name='pointBoard_${side}']`).prop("disabled", "disabled")
  })
})

$('#btn_prepareGame').click(function () {
  init_prepareModal()
})

function init_prepareModal() {
  $("input:radio[name='ctype'][data-ctype='single']").parent('label').removeClass("active")
  $("input:radio[name='ctype'][data-ctype='single']").removeAttr("checked")
  $("input:radio[name='ctype'][data-ctype='double']").parent('label').addClass("active")
  $("input:radio[name='ctype'][data-ctype='double']").prop("checked", "checked")
  $('#text_open_player').val($("input:radio[name='open_player']:checked").prev().val())
}

$("input:radio[name='open_player']").click(function () {
  ball_in = $(this).attr('data-position')
  console.log(ball_in)
  var open_player = $(this).prev().val()
  if (open_player == undefined) {
    open_player = $(this).next().val()
  }
  // console.log(open_player)
  $('#text_open_player').val(open_player)
})

$('#btn_startGame').click(function () {
  ctype = $("input:radio[name='ctype']:checked").attr('data-ctype')
  cpoint = $("input:radio[name='cpoint']:checked").attr('data-cpoint')
  // console.log(`类型: ${ctype}, 比分: ${cpoint}`)
  startGame()
})

function startGame() {
  point_left = 0;
  point_right = 0;
  hour = 0
  min = 0
  sec = 0
  $('#btn_prepareGame').prop("disabled", "disabled")
  init_players()
  flush_pointBoard()
  flush_timingBoard()
  timing()
  count_pointBoard()
}

function time_str(num) {
  if (num < 10) {
    return `0${num}`
  }
  else {
    return `${num}`
  }
}

function timing() {
  setInterval(function () {
    sec += 1
    if (sec > 59) {
      sec = 0
      min += 1
    }
    if (min > 59) {
      min = 0
      hour += 1
    }
    flush_timingBoard()
  }, 1000)
}

function init_players() {
  player_leftTop = $('#set_player_leftTop').val()
  player_leftBottom = $('#set_player_leftBottom').val()
  player_rightTop = $('#set_player_rightTop').val()
  player_rightBottom = $('#set_player_rightBottom').val()
  $('#player_leftTop').text(player_leftTop)
  $('#player_leftBottom').text(player_leftBottom)
  $('#player_rightTop').text(player_rightTop)
  $('#player_rightBottom').text(player_rightBottom)

  //初始化发球
  $(`#ball_leftBottom`).removeAttr("checked")
  $(`#ball_${ball_in}`).prop("checked", "checked")

}

function flush_timingBoard() {
  $('#hour').text(time_str(hour))
  $('#min').text(time_str(min))
  $('#sec').text(time_str(sec))

}
function flush_pointBoard() {
  // console.log(`A: ${point_left}  B: ${point_right}`)
  $("[name='pointBoard_left']").text(point_left)
  $("[name='pointBoard_right']").text(point_right)
}

function point_add(side) {
  if (side == 'left') {
    point_left += 1
  } else if (side == 'right') {
    point_right += 1
  }
}

function count_pointBoard() {
  ['left', 'right'].forEach(function (side) {
    $(`[name='pointBoard_${side}']`).click(function () {
      point_add(side)
      if (ball_in == `${side}Top` || ball_in == `${side}Bottom`) {
        changeSameSide(side)
      } else {
        changeOpposite(side)
      }
      flush_pointBoard()
    })
  })
}

// 连赢，换边发球
function changeSameSide(side) {
  var temp_name = $(`#player_${side}Top`).text()
  $(`#player_${side}Top`).text($(`#player_${side}Bottom`).text())
  $(`#player_${side}Bottom`).text(temp_name)

  $(`#ball_${ball_in}`).removeAttr("checked")
  if (ball_in == `${side}Top`) {
    ball_in = `${side}Bottom`
  } else if (ball_in == `${side}Bottom`) {
    ball_in = `${side}Top`
  }
  $(`#ball_${ball_in}`).prop("checked", "checked")
}

// 换对手发球
function changeOpposite(side) {
  $(`#ball_${ball_in}`).removeAttr("checked")
  point = eval(`point_${side}`)
  if (side == 'left') {
    if (point % 2 == 0) {
      ball_in = `${side}Bottom`
    } else {
      ball_in = `${side}Top`
    }
  } else if (side == 'right') {
    if (point % 2 == 0) {
      ball_in = `${side}Top`
    } else {
      ball_in = `${side}Bottom`
    }
  }
  $(`#ball_${ball_in}`).prop("checked", "checked")
}

$('#btn_endGame').click(function () {
  endGame()
})

function endGame() {
  window.location.reload()
}


$('#btn_maxBoard').click(function () {
  $('#big_pointBoard').removeClass('d-none')
})

$('#btn_minBoard').click(function () {
  $('#big_pointBoard').addClass('d-none')
})
