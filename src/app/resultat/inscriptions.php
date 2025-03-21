<?php
// Démarrer la session
session_start();

// Connexion à la base de données
$host = '127.0.0.1';
$db = 'supervision';
$user = 'root'; // remplacez par votre nom d'utilisateur MySQL
$pass = ''; // remplacez par votre mot de passe MySQL

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Récupération des données du formulaire
$nom = $_POST['nom'];
$email = $_POST['email'];
$mot_de_passe = $_POST['mot_de_passe'];
$confirmer_mot_de_passe = $_POST['confirmer_mot_de_passe'];

// Vérification de la correspondance des mots de passe
if ($mot_de_passe !== $confirmer_mot_de_passe) {
    $_SESSION['error'] = "Les mots de passe ne correspondent pas.";
    header('Location: inscription.php');
    exit();
}

// Vérification si l'email ou le nom existe déjà dans la base de données
$sql_check = "SELECT * FROM table_utilisateurs WHERE email = ? OR nom = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("ss", $email, $nom);
$stmt_check->execute();
$result_check = $stmt_check->get_result();

if ($result_check->num_rows > 0) {
    $_SESSION['error'] = "L'email ou le nom existe déjà<br>";
    header('Location: inscription.php');
    exit();
}

$stmt_check->close();

// Hashage du mot de passe
$mot_de_passe_hash = password_hash($mot_de_passe, PASSWORD_BCRYPT);

// Insertion des données dans la base de données
$sql = "INSERT INTO table_utilisateurs (nom, email, motdepasse, validation) VALUES (?, ?, ?, 'non')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nom, $email, $mot_de_passe_hash);

if ($stmt->execute()) {
    $_SESSION['success'] = "Inscription réussie !";
} else {
    $_SESSION['error'] = "Erreur : " . $stmt->error;
}

$stmt->close();
$conn->close();

header('Location: inscription.php');
exit();
?>
