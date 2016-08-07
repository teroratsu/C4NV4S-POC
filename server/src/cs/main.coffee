canvas = document.getElementById('canvas')

ntm = ["Nique tamer","T'es carrément useless", "Tu sert à quoi dans le projet", "Ferme ta gueule srx", "Et sinon, concrètement, t'as rien foutu", "Vas te suicider", "T'es un ramassis d'ordures", "ça fait quoi de se dire qu'on sert à rien", "ntm batar de", "personne ne t'aime", "t'es parent ont pas été gâtés", "T'es moins intéressant qu'une huitre", "Je t'aime et je veux te faire des bébés", "Dans la vie y'a des gens intéressant et y'a", "Je rêve du jour ou tu fermera ta gueule", "Attend... mais on s'en bas les couilles de ta vie", "retourne bosser", "tes parents auraient du songer à l'avortement"]
pd = ["Benji", "Cauwen", "Manu", "Wytrem", "Versus", "Choupi", "Litarvan", "Père Cil", "Vava", "Spooki", "iSach", "Guillaume", "Grimm", "Liliona", "Léo", "OG", "Tero", "Miss"];

draw = (ctx) ->
    ctx.fillStyle = "rgb(200,0,0)"
    ctx.fillRect 10, 10, canvas.width-20, canvas.height-20
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)"
    ctx.fillRect 30, 30, canvas.width-60, canvas.height-60
    ctx.fillStyle = "white"
    ctx.font = "bold 30px Arial"
    r = Math.floor(Math.random() * (ntm.length - 1))
    r2 = Math.floor(Math.random() * (pd.length - 1))
    ctx.fillText "#{ntm[r]} #{pd[r2]}", canvas.width*0.2, canvas.height/2
    setTimeout (() -> draw(ctx)) , 2000

#compatibility with older browser
if canvas.getContext
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw(ctx)
else
    alert("your browser is not compatible with the app, sorry :(")