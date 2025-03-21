<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="connexion.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <title>Accueil</title>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: url('font.jpg') repeat center center/cover;
    min-height: 100vh;
    width: 100%;
    position: relative;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: fff;
    padding: 10px 20px;
    box-shadow: 0 4px 4px rgba(67, 67, 238, 0.9);
    z-index: 2;
    position: relative;
    background-color: rgb(240, 241, 247);
}

.header-left {
    display: flex;
    align-items: center;
}

.header-right {
    display: flex;
    align-items: center;
}

.header-right h2 {
    margin-right: 20px;
}

header a {
    color: blue;
    text-decoration: none;
}

header a:hover {
    text-decoration: underline;
}

body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(0, 0, 139, 0.6) 30%, transparent 200%);
    z-index: 1;
}

.aside {
    margin-top: 140px;
    position: relative;
    z-index: 2;
}

.button {
    text-align: center;
    margin-top: 50px;
    position: relative; /* Important: pour s'assurer que le bouton reste au-dessus du fond bleu */
    z-index: 3; /* Augmenté pour qu'il soit au-dessus du fond */
}

.btn {
    color: white;
    background: blue;
    width: 18%;
    height: 40px;
    border-radius: 15px;
    outline: none;
    border: none;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 3px 0 10px rgba(0, 0, 0, 0.5);
    margin-left: auto;
    margin-right: auto;
    display: inline-block;
    text-decoration: none;
    text-align: center;
    line-height: 40px;
    z-index: 3; /* S'assurer que le bouton reste au-dessus */
    position: relative;
}

.btn:hover {
    background-color: rgb(255, 187, 0);
    color: black;
    font-weight: bold;
}
</style>
</head>
<body>
    <header>
        <div class="header-left">
            <div class="site-name">
                <h1 style="color: blue; font-size: 30px; font-family: 'Times New Roman', Times, serif;">
                    <img src="logo3.png" alt="logo" style="width: 50px;">ENR
                    <span style="color: rgb(255, 187, 0);">LAB'VISION</span>
                </h1>
            </div>
            <div class="header-right">
                <h2 style="color: blue; font-size: 16px; margin-top: 20px; font-family: Arial; margin-left: 940px;">
                    <a href="inscription.php" style="color: blue; text-decoration: none;"><i class='bx bx-user-check'></i> Inscription</a>
                </h2>
            </div>
        </div>
    </header>
    <section>
        <div class="aside">
            <h2 style="font-size: 25px; color: #fff; margin-left: 30px; text-align: center;">
                <span style="color: rgb(255, 187, 0); font-family: 'Times New Roman', Times, serif; font-size: 40px; font-weight: 200px;">BIENVENUE SUR ENR LAB'VISION</span><br><br>
                <p>Ici, vous pouvez optimiser la maintenance de votre batterie solaire.</p> <p> Mais si vous n'avez pas de compte, inscrivez-vous d'abord !</p>
            </h2>
        </div> 
        <div class="button">
            <a href="connexion.php" class="btn"> Connecter </a>
        </div>
    </section>
</body>
</html>
