<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: index.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page d'accueil</title>
</head>
<body>
    <header>
        <h1>Bienvenue, <?php echo htmlspecialchars($_SESSION['user']); ?>!</h1>
        <a href="deconnexion.php">Déconnexion</a>
    </header>
    <main>
        <p>Ceci est la page d'accueil accessible après connexion.</p>
    </main>
</body>
</html>
