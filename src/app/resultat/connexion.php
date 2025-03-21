<?php
                            session_start();
                           
                        ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <title>Connexion</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: cursive;
}

body {
    background: url('font.jpg') repeat center center/cover;
    min-height: 100vh;
    width: 100%;
    position: relative;
}

body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(0, 0, 139, 0.8) 30%, transparent 75%);
    z-index: 1;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color:  #fafafa;
    padding: 10px 20px;
    box-shadow: 0 4px 4px rgba(67, 67, 238, 0.6);
    z-index: 2;
    position: relative;
}

.header-left {
    display: flex;
    align-items: center;
}

.aside {
    margin-right: 700px;
    margin-top: 150px;
    position: fixed;
    z-index: 2;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    z-index: 2;
    position: relative;
}

.form-box {
    position: relative;
    width: 410px;
    height: 500px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(30px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    margin-left: 80px;
    margin-bottom: 50px;
    z-index: 2;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    
}

.form-box h2 {
    color: rgb(255, 187, 0);
    text-align: center;
    font-size: 34px;
    font-weight: 100vh;
    margin-bottom: 40px; 
}

.form-box .input-box {
    position: relative;
    margin: 25px 0;
    width: 330px;
    margin-left: 16px;
    border: 3px solid #f5fbff;
    background-color: #f5fbff;
    border-radius: 20px;
   
}

.form-box .input-box input {
    width: 100%;
    height: 35px;
    background: transparent;
    outline: none;
    border: none;
    padding: 0 20px 0 25px;
    color: #111;
    font-weight: 100vh;
    font-size: 15px;
}

i {
    position: absolute;
    color: #111;
    top: 9px;
    left: 0;
    padding-left: 5px;
}

input::placeholder {
    color: #111;
}

.btn {
    color: black;
    background: rgb(255, 187, 0);
    width: 326px;
    margin-left: 16px;
    height: 40px;
    border-radius: 18px;
    outline: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    box-shadow: 3px 0 10px rgba(0, 0, 0, 0.5);
    font-weight: bold;
}

.group {
    display: flex;
    justify-content: space-between;
}

.group span a {
    color: #fff;
    position: relative;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
}

.group a:focus {
    text-decoration: underline;
}

.login__register {
    margin-top: 40px;
    color: white;
    font-size: 16px;
}

.login__register a {
    padding-left: 25px;
    color: #fff;
    font-size: 17px;
}

.login__register a:hover {
    color: blue;
}

.btn:hover {
    background-color: blue;
    color: white;
}

    </style>
</head>
<body>
    <header>
        <div class="header-left">
            <div class="site-name">
                <h1 style="color: blue; font-size: 30px; font-family: italic;">
                    <img src="logo3.png" alt="logo" style="width: 40px;">ENR
                    <span style="color: rgb(255, 187, 0); font-family: italic;">SOLAIRE</span>
                </h1>
            </div>
        </div>
    </header>
    <section>
        <aside>
            <div class="container">
                <div class="form-box">
                    <form method="POST" action="index1.php">
                        <h2>Connexion</h2>
                        <div class="input-box">
                            <i class='bx bx-envelope'></i>
                            <input type="email" name="email" placeholder="Email" required>
                        </div>
                        <div class="input-box">
                            <i class='bx bx-lock-open-alt'></i>
                            <input type="password" name="motdepasse" placeholder="Mot de passe" required>
                        </div>
                        <div class="button">
                            <input type="submit" class="btn" value="se connecter">
                        </div>
                        </p>
                        <?php
                            
                            if (isset($_SESSION['error'])) {
                                echo "<p style='color: red; text-align: center; padding-top: 10px; font-weight: bold'>" . $_SESSION['error'] . "</p>";
                                unset($_SESSION['error']);
                            }
                        ?>
                        </p>
                        <p class="login__register">
                            Si vous n'avez pas de compte! <a href="inscription.php">inscrivez-vous</a>
                        </p>
                    </form>
                </div>
            </div>
        </aside>
    </section>
    <script>
        function handleSubmit(event) {
            event.preventDefault();
            // Simulate authentication success
            window.location.href = "visualisation.html"; // Change this to the correct path to your visualisation page
        }
    </script>
</body>
</html>
