$('#btn_prepareGame').click(function () {
    init_prepareModal()
})
var ctype = 'double'
var cpoint = 15
$('#btn_startGame').click(function () {
    ctype = $("input:radio[name='ctype']:checked").attr('data-ctype')
    cpoint = $("input:radio[name='cpoint']:checked").attr('data-cpoint')
    console.log(`类型: ${ctype}, 比分: ${cpoint}`)
    startGame()
})
$('#btn_endGame').click(function () {
    endGame()
})

function init_prepareModal() {
    $("input:radio[name='ctype'][data-ctype='single']").parent('label').removeClass("active")
    $("input:radio[name='ctype'][data-ctype='single']").removeAttr("checked")
    $("input:radio[name='ctype'][data-ctype='double']").parent('label').addClass("active")
    $("input:radio[name='ctype'][data-ctype='double']").prop("checked", "checked")
    $('#text_open_player').val($("input:radio[name='open_player']:checked").prev().val())
}

$("input:radio[name='open_player']").click(function () {
    var open_player = $(this).prev().val()
    if (open_player == undefined) {
        open_player = $(this).next().val()
    }
    console.log(open_player)
    $('#text_open_player').val(open_player)
})

var PlayerA_point = 0
var PlayerB_point = 0
var hour = 0
var min = 0
var sec = 0

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


$(function () {
    PlayerA_point = 0;
    PlayerB_point = 0;
    hour = 0
    min = 0
    sec = 0
    flush_pointBoard()
    flush_timingBoard()
    timing()
})

function flush_timingBoard() {
    $('#hour').text(time_str(hour))
    $('#min').text(time_str(min))
    $('#sec').text(time_str(sec))

}
function flush_pointBoard() {
    console.log(`A: ${PlayerA_point}  B: ${PlayerB_point}`)
    $("[name='pointBoard_PlayerA']").text(PlayerA_point)
    $("[name='pointBoard_PlayerB']").text(PlayerB_point)
}


$("[name='pointBoard_PlayerA']").click(function () {
    PlayerA_point += 1
    flush_pointBoard()
})

$("[name='pointBoard_PlayerB']").click(function () {
    PlayerB_point += 1
    flush_pointBoard()
})

function startGame() {
    window.location.href = 'game_ing.html'
}

function endGame() {
    window.location.href = 'index.html'
}

$('#btn_maxBoard').click(function () {
    $('#big_pointBoard').removeClass('d-none')
})

$('#btn_minBoard').click(function () {
    $('#big_pointBoard').addClass('d-none')
})
