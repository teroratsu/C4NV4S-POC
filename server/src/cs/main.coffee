canvas = document.getElementById('canvas')

draw = (ctx) ->
    ctx.fillStyle = "rgb(200,0,0)"
    ctx.fillRect 10, 10, canvas.width-20, canvas.height-20
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)"
    ctx.fillRect 30, 30, canvas.width-60, canvas.height-60
    ctx.fillStyle = "white"
    ctx.font = "bold 50px Arial"
    ctx.fillText "Vas te faire foutre Akaba :^)", canvas.width*0.3, canvas.height/2

#compatibility with older browser
if canvas.getContext
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw(ctx)
else
    alert("your browser is not compatible with the application")