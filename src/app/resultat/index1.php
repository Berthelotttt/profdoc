<?php
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
$email = $_POST['email'];
$mot_de_passe = $_POST['motdepasse'];

// Vérification des informations d'identification
$sql = "SELECT * FROM table_utilisateurs WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($mot_de_passe, $user['motdepasse'])) {
        // Informations d'identification correctes
        $_SESSION['user'] = $user['nom']; // Stocker le nom de l'utilisateur dans la session
        header('Location: accueil1.php');
        exit();
    } else {
        // Mot de passe incorrect
        $_SESSION['error'] = "Mot de passe incorrect.";
        header('Location: index.php');
        exit();
    }
} else {
    // Utilisateur non trouvé
    $_SESSION['error'] = "Email non trouvé.";
    header('Location: index.php');
    exit();
}

$stmt->close();
$conn->close();
?>
