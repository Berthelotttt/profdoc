
<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: index.php');
    exit();
}
?>
<?php
try 
{
    $access = new pdo("mysql:host=localhost;dbname=supervision;charset=utf8", "root", "");

    $access->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

} catch (Exception $e) 
{
	$e->getMessage();
}

    /*/ Définissez vos variables ThingSpeak
    $apiKey = "KAK59M9YC3EAOYGJ";
    $channelId = "2646251";
    $field1 = "CourantPV";
    $field2 = "TensionPV";
    $field3 = "CourantREG";
    $field4 = "TensionREG";
    $field5 = "Temperature";
    $field6 = "Rayonsolaire";
    $field7 = "Energieproduite";
    $field8 = "Energieconsommé";

    date_default_timezone_set('Europe/Moscow');
    $heure = date('H:i:s');

    // Connectez-vous à ThingSpeak
    $ch = curl_init("https://api.thingspeak.com/channels/" . $channelId . "/feeds/last.json?api_key=" . $apiKey);

    // Envoyez la demande
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);

    // Vérifiez la réponse
    if ($response === false) {
        echo "Erreur : " . curl_error($ch);
        exit;
    }

    // Décodez la réponse JSON
    $data = json_decode($response, true);

    if(isset($data['field1'])AND isset($data['field2']) AND isset($data['field3']) AND isset($data['field4']) AND isset($data['field5']) AND isset($data['field6']) AND isset($data['field7']) AND isset($data['field8']))
    {
        $requete = $access->prepare('INSERT INTO donnees(courant_panneau, tension_panneau, courant_regulateur, tension_regulateur, temperature, ensoleillement, energie_produite, energie_consomme, time) VALUES(:field1, :field2, :field3, :field4, :field5, :field6, :field7, :field8, :field9)');

        $requete->bindvalue(':field1', $data['field1'] );
        $requete->bindvalue(':field2', $data['field2'] );
        $requete->bindvalue(':field3', $data['field3'] );
        $requete->bindvalue(':field4', $data['field4'] );
        $requete->bindvalue(':field5', $data['field5'] );
        $requete->bindvalue(':field6', $data['field6'] );
        $requete->bindvalue(':field7', $data['field7'] );
        $requete->bindvalue(':field8', $data['field8'] );
        $requete->bindvalue(':field9', date('Y-m-d H:i:s'));


        $requete->execute();

        $requete->closeCursor();

    }*/

    // Requête SQL
    $stmt = $access->prepare("SELECT time, courant_panneau,tension_panneau,temperature,ensoleillement,courant_regulateur,tension_regulateur,energie_produite,energie_consomme FROM donnees");
    $stmt->execute();

    // Nombre de lignes retournées
    $rowCount = $stmt->rowCount();

    if ($rowCount > 0) {
        // Traiter les résultats
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
           $courantpanneau[] = $row["courant_panneau"];
           $tensionpanneau[] = $row["tension_panneau"];
           $temperature[] = $row["temperature"];
           $ensoleillement[] = $row["ensoleillement"];
           $courant_regulateur[] = $row["courant_regulateur"];
           $tension_regulateur[] = $row["tension_regulateur"];
           $energie_produite[] = $row["energie_produite"];
           $energie_consomme[] = $row["energie_consomme"];
           $time[] = $row["time"];
           
        }
    } else {
        echo "0 résultats";
    }
$stmt = $access->prepare("SELECT id, time, courant_panneau, tension_panneau, temperature, ensoleillement, courant_regulateur, tension_regulateur FROM donnees ORDER BY time DESC");
$stmt->execute();
    ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Visualisation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom"></script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
    * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #fff;
    margin-top: 60px;
}

/* Style de l'en-tête */
header {
    position: fixed;
    top: 4px;
    left: 0;
    width: 80%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5fbff;
    padding: 10px 20px;
    box-shadow: 0 5px 4px rgba(67, 67, 238, 0.4);
    z-index: 1000;
    margin-left: 230px;
}
.header-left {
    display: flex;
    align-items: center;
    
}

.header-left .title {
    font-size: 18px;
    font-weight: bold;
    color: blue;
    
}

.header-right ul {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
}

.header-right ul li {
    margin-left: 20px;
    font-size: 16px;
    color: #666;
    display: flex;
    align-items: center;
}

.sidebar {
    width: 180px;
    background-color: #4e73df;
    color: #ffffff;
    padding: 20px;
    box-sizing: border-box;
    height: 100vh;
    position: fixed;
   top: 0;
}

.sidebar nav ul {
    list-style: none;
    padding: 0;
}

.sidebar nav ul li {
    padding: 10px;
    text-align: center;
}

.sidebar .input-box li a, .sidebar .input-box li a i {
    display: flex;
    align-items: center;
}

.sidebar nav ul li a {
    color: #ffffff;
    font-size: 16px;
    text-decoration: none;
    display: block;
    padding: 10px;
    border-radius: 3px;
    transition: background-color 0.3s;
    margin-bottom: 7px;
}
.sidebar nav ul .input-box i {
    font-size: 20px;
    color: white;
    padding-right: 10px;
}

.sidebar button.deconnect {
    color: blue;
    background-color: #ffb700;
    width: 100%;
    height: 40px;
    margin-top: 25px;
    border-radius: 5px;
    outline: none;
    border: none;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 3px 0 10px rgba(0, 0, 0, 0.5);
    transition: background-color 0.3s ease;
}
.sidebar button.deconnect:hover {
    background-color: #ffffff;
    color: blue;
    font-weight: bold;
}

#chartbar{
    width: 500px;
   
}
#chartbar2{
    width: 500px;
    
}
#chartbar3{
    width: 500px;
}
#chartbar33{
    width: 500px;
    
}
#chartbar34{
    width: 500px;
}
#chartbar35{
    width: 500px;
    
}

#chartbar6{
    width: 500px;
}

#chartbar4{
    width: 500px;
}
#chartbar5{
    width: 500px;
}


#chartbar666{
    width: 500px;
}

#chartbar777{
    width: 500px;
    height: 500px
}

.container{
    display: flex;
}
.panneau{
    margin-top: 20px;
}
.regulateur{
    margin-top: 20px;
}
.chart-container {
    display: flex;
    justify-content: space-between; /* Espace entre les éléments */
    align-items: center; /* Aligner les graphiques verticalement */
    gap: 20px; /* Espacement entre les graphiques */
    margin: 20px; /* Marge autour de la zone des graphiques */
}
canvas {
    width: 150px; /* Largeur des graphiques */
    height: 150px; /* Hauteur des graphiques */
}

main {
    margin-left: 170px;
    padding: 20px;
}

h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

canvas {
    width: 100% !important;
    max-width: 500px;
    height: auto !important;
}
.chart-wrapper {
    display: flex;
    flex-direction: column; /* Disposition en colonnes */
    gap: 30px; /* Espace entre les lignes */
}

.chart-row {
    display: flex; /* Aligner les graphiques côte à côte */
    justify-content: space-between; /* Ajouter de l'espace entre les graphiques */
    align-items: center; /* Aligner verticalement */
    gap: 30px; /* Espace entre les graphiques sur la même ligne */
}

canvas {
    width: 200px; /* Largeur des graphiques */
    height: 50px; /* Hauteur des graphiques */
}

/* Style par défaut des liens */
aside ul li a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: black; /* Couleur du texte */
  background-color: transparent; /* Couleur de fond par défaut */
  transition: background-color 0.3s ease; /* Transition douce pour le changement de couleur */
}

/* Style pour l'élément actif */
aside ul li.active a {
  background-color: white; /* Couleur de fond lorsque l'élément est actif */
  color: blue; /* Couleur du texte lorsque l'élément est actif */
  font-size:18px;
  border-radius: 20px;
  width: 164px;
   
}
.sidebar nav ul li.active i{
    color: blue;
};


</style>
<style>
        body { font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; }
        table { width: 90%; margin: 20px auto; border-collapse: collapse; background: #fff; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: center; }
        th { background-color: #4CAF50; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        h2 { color: #333; }
        .file-label {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
} 
</style>
</head>
<body>
    <header>
        <div class="header-left">
            <span class="title" style="font-family: arial;">TABLEAU DE BORD</span>
        </div>
        <div class="separator-vertical">
            <h2 style="color: blue; font-size: 16px; margin-top: 25px; font-family: arial;">
                <i class='bx bx-calendar'></i> 06/03/2025
            </h2>
        </div>
    </header>
    <div class="sidebar">
    <nav>
    <div class="site-name">
                <h1 style="color: white; font-size: 19px; font-family: italic;  text-shadow: 1px 1px 1px rgba(0, 0, 0));">
                    <img src="logo lab.png" alt="logo" style="width: 150px; margin-left: 0px;">ENR<span style="color: rgb(255, 187, 0); font-family: italic;">LAB'VISION</span>
                </h1>
            </div><br><br><br>
        <aside class="aside" style="font-size: 16px; font-family: arial, sans-serif;">
            <ul>
                <div class="input-box">
                    <li><a href="#" onclick="showPage('typesbat')" ><i class='bx bx-battery'></i> Accueil</a></li>
                </div>
                <div class="input-box">
                    <li><a href="#" onclick="showPage('alertes')"> <i class='bx bx-timer'></i> Prédiction</a></li>
                    <audio id="alertSound" src="alert_sound.mp3"></audio> 
                </div>
                <div class="input-box">
                    <li><a href="#" onclick="showPage('centrales')"><i class='bx bxs-bell-ring'></i>  Alerte</a></li>
                </div>
            </ul>
        </aside>
        <div>
            <button class="btn deconnect" onclick="deconnecter()">Déconnecter</button>
        </div>
    </nav>
</div>

    <main>
    <section id="typesbat" style="margin-bottom: 600px; margin-top: 250px;">
    <h2 style="margin-bottom: 20px; color: red;">Importation de Données de Batterie</h2>
        <form id="uploadForm">
            <label for="fileInput" class="file-label">Choisir un fichier Excel</label>
            <input type="file" id="fileInput" accept=".csv, .xls, .xlsx" hidden>
            <button type="button" onclick="processFile()" style="margin-top: 10px; padding: 10px 20px; background-color: #28a745;
            color: #fff; border: none; border-radius: 5px; cursor: pointer;">Importer</button>
            <div id="fileInfo"></div>
        </form>
    </section>
    <script>
        function processFile() {
            const fileInput = document.getElementById("fileInput");
            fileInput.click();
            fileInput.onchange = () => {
                const file = fileInput.files[0];
                if (file) {
                    document.getElementById("fileInfo").innerText = "Fichier sélectionné : " + file.name;
                    // Vous pouvez traiter le fichier ici
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const content = e.target.result;
                        console.log("Contenu du fichier :", content);
                        alert("Fichier importé avec succès !");
                        // Vous pouvez appeler une API ou un traitement IA ici
                    };
                    reader.readAsText(file);
                }
            };
        }
    </script>

    <section id="centrales">
        <div class="courbe">
            <div class="panneau">
                <br><h1 style="text-align: center; color: blue; margin-bottom: 2px; font-size: 22px; font-family: cursive;">Anomalies</h1>
                <div class="container" style="margin-left:50px;">
                    <div id="chartbar">
                        <canvas id="myChart" width="150" height="120"></canvas>
                    </div>
                    
                    <div id="chartbar3">
                        <canvas id="myChart3" width="150" height="100"></canvas>
                    </div>
                </div><br>
                
                <div class="container" style="margin-left:50px;">
                <div id="chartbar34">
                        <canvas id="myChart34" width="120" height="120"></canvas>
                    </div>
                    <div id="chartbar35">
                        <canvas id="myChart35" width="120" height="120"></canvas>
                    </div>
                    
                </div>
            </div><br><hr>
            <div class="regulateur">
                <h1 style="text-align: center; color: blue; margin-bottom: 15px; font-size: 20px; font-family: cursive;">Regulateur</h1>
                <div class="container" style="margin-left:50px;">
                    <div id="chartbar4">
                        <canvas id="myChart4" width="120" height="125"></canvas>
                    </div>
                    <div id="chartbar5">
                        <canvas id="myChart5" width="120" height="125"></canvas>
                    </div>
                    
                </div><br><hr>
            <div class="regulateur">
                <h1 style="text-align: center; color: blue; margin-bottom: 15px; font-size: 20px; font-family: cursive;">Panneau Solaire et Regulateur </h1>
                <div class="container" style="margin-left:50px;">
                    <div id="chartbar66" style="margin-left: 20px;">
                        <canvas id="myChart77" width="650" height="450"></canvas>
                    </div>
                    <div id="chartbar66" style="margin-left: 20px;">
                        <canvas id="myChart88" width="600" height="450"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="alertes" style="display:none;">
        <h2 style="color: black; margin-left: 10px; margin-bottom: 40px; font-size: 20px; font-family: cursive; margin-top: 50px;">Prédiction</h2>
        <div class="regulateur">
            <div class="container">
                <div id="chartbar666" style="margin-left: 20px;">
                    <canvas id="myChart666" width="650" height="450"></canvas>
                </div>
                <div id="chartbar777" style="margin-left: 20px;">
                    <canvas id="myChart777" width="600" height="650"></canvas>
                </div>
            </div>
        </div>
    </section>        
</main>
    <script>
        // Récupérer les données PHP dans JavaScript
        var courantpanneau = <?php echo json_encode($courantpanneau); ?>;
        var tensionpanneau = <?php echo json_encode($tensionpanneau); ?>;
        var temperature = <?php echo json_encode($temperature); ?>;
        var ensoleillement = <?php echo json_encode($ensoleillement); ?>;
        var courant_regulateur = <?php echo json_encode($courant_regulateur); ?>;
        var tension_regulateur = <?php echo json_encode($tension_regulateur); ?>;
        var time = <?php echo json_encode($time); ?>;
         // Calcul de la puissance (par exemple, pour chaque heure si courantpanneau et tensionpanneau sont des tableaux)
        var puissancepanneau = courantpanneau.map(function(value, index) {
            return value * tensionpanneau[index];
        });

        // Calcul de la puissance (par exemple, pour chaque heure si courant_regulateur et tension_regulateur sont des tableaux)
        var puissance_regulateur = courant_regulateur.map(function(value, index) {
            return value * tension_regulateur[index];
        });
        
        function deconnecter() {
            window.location.href = "deconnexion.php"; // Change this to the correct path to your connexion page
        }

        function showPage(pageId) {
            const sections = document.querySelectorAll('main section');
            sections.forEach(section => section.style.display = 'none');
            document.getElementById(pageId).style.display = 'block';
        }

        document.addEventListener('DOMContentLoaded', function() {
            const menuItems = document.querySelectorAll('.aside ul li a');
            const sections = document.querySelectorAll('main section typesbat');
        
            menuItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    menuItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    const targetId = item.getAttribute('onclick').split("'")[1];
                    sections.forEach(section => {
                        if (section.id === targetId) {
                            section.style.display = 'block';
                        } else {
                            section.style.display = 'none';
                        }
                    });
                });
            });
        });

// Panneaux Solaires - Graphique 1
const ctx = document.getElementById('myChart').getContext('2d');

// Création d'un dégradé pour le premier graphique
const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
gradient1.addColorStop(0, 'rgba(9, 167, 4, 0.5)'); // Dégradé rouge léger au sommet
gradient1.addColorStop(1, 'rgba(255, 255, 255, 0)');  // Dégradé transparent en bas

const data1 = {
    labels:  [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
        '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
        '22:00', '23:00'
    ],
    datasets: [{
        label: 'Tension Mésuré (V)',
        data: courantpanneau ,  // Tes données ici
        fill: true,  // Activer le remplissage
        backgroundColor: gradient1,  // Appliquer le dégradé rouge
        borderColor: 'rgb(9, 167, 4)',  // Couleur de la bordure rouge
        borderWidth: 2.5,  // Épaisseur de la bordure
        tension: 0.3,  // Lisser la courbe (même tension que dans le premier graphique)
        pointRadius: 0,  // Désactiver les points pour une ligne continue
    }]
};

const config1 = {
    type: 'line',
    data: data1,
    options: {
        responsive: true,
        maintainAspectRatio: false,  // S'assurer que le ratio est flexible
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Heure'
                },
                grid: {
                    display: true,  // Désactivation de la grille pour l'axe des X
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Tension Mésuré (V)'
                },
                beginAtZero: true,
                min: 0,  // Commencer l'axe Y à 0
            }
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,  // Le tooltip suit l'index
            },
            title: {
                display: true,
            },
            zoom: {
                pan: {
                    enabled: false,  // Désactiver le pan pour correspondre au premier graphique
                },
                zoom: {
                    enabled: false,  // Désactiver le zoom
                }
            }
        },
        elements: {
            line: {
                borderJoinStyle: 'round'  // Lissage de la courbe
            }
        },
    }
};

const myChart1 = new Chart(ctx, config1);

// Panneaux Solaires - Graphique 2

const ctx3 = document.getElementById('myChart3').getContext('2d');

// Création d'un dégradé pour le troisième graphique
const gradient3 = ctx3.createLinearGradient(0, 0, 0, 400);
gradient3.addColorStop(0, 'rgba(30, 138, 146, 0.5)'); // Dégradé bleu foncé au sommet
gradient3.addColorStop(1, 'rgba(30, 138, 146, 0)');  // Dégradé transparent en bas

const data3 = {
    labels: [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', 
        '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', 
        '22:00', '23:00'
    ],
    datasets: [{
        label: 'Courant Mésuré (A)',
        data: puissancepanneau,  // Données de température
        fill: true,  // Activer le remplissage sous la courbe
        backgroundColor: gradient3,  // Appliquer le dégradé
        borderColor: 'rgba(30, 138, 146)',  // Couleur de la bordure
        borderWidth: 2.5,  // Épaisseur de la bordure
        tension: 0.3,  // Lisser la courbe
        pointRadius: 0,  // Désactiver les points pour une ligne continue
    }]
};

const config3 = {
    type: 'line',
    data: data3,
    options: {
        responsive: true,
        maintainAspectRatio: false,  // S'assurer que le ratio est flexible
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Heure'
                },
                grid: {
                    display: true,  // Désactiver la grille pour un affichage similaire
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Courant Mésuré (A)'
                },
                beginAtZero: true,
                min: 0,  // Commencer l'axe Y à 0
            }
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,  // Le tooltip suit l'index
            },
            title: {
                display: true,
            },
            zoom: {
                pan: {
                    enabled: false,  // Désactiver le pan pour correspondre au premier graphique
                },
                zoom: {
                    enabled: false,  // Désactiver le zoom
                }
            }
        },
        elements: {
            line: {
                borderJoinStyle: 'round'  // Lissage de la courbe
            }
        },
    }
};
// Créer et afficher le graphique
const myChart3 = new Chart(ctx3, config3);


const ctx34 = document.getElementById('myChart34').getContext('2d');

// Création d'un dégradé pour le troisième graphique
const gradient34 = ctx34.createLinearGradient(0, 0, 0, 400);
gradient34.addColorStop(0, 'rgba(10, 43, 228, 0.5)'); // Dégradé bleu foncé au sommet
gradient34.addColorStop(1, 'rgba(33, 33, 33, 0)');  // Dégradé transparent en bas

const data34 = {
    labels: [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', 
        '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', 
        '22:00', '23:00'
    ],
    datasets: [{
        label: 'Température (°C)',
        data: temperature,  // Données de température
        fill: true,  // Activer le remplissage sous la courbe
        backgroundColor: gradient34,  // Appliquer le dégradé
        borderColor: 'rgba(10, 43, 228)',  // Couleur de la bordure
        borderWidth: 2.5,  // Épaisseur de la bordure
        tension: 0.3,  // Lisser la courbe
        pointRadius: 0,  // Désactiver les points pour une ligne continue
    }]
};

const config34 = {
    type: 'line',
    data: data34,
    options: {
        responsive: true,
        maintainAspectRatio: false,  // S'assurer que le ratio est flexible
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Heure'
                },
                grid: {
                    display: true,  // Désactiver la grille pour un affichage similaire
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Température (°C)'
                },
                beginAtZero: true,
                min: 0,  // Commencer l'axe Y à 0
            }
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,  // Le tooltip suit l'index
            },
            title: {
                display: true,
            },
            zoom: {
                pan: {
                    enabled: false,  // Désactiver le pan pour correspondre au premier graphique
                },
                zoom: {
                    enabled: false,  // Désactiver le zoom
                }
            }
        },
        elements: {
            line: {
                borderJoinStyle: 'round'  // Lissage de la courbe
            }
        },
    }
};
// Créer et afficher le graphique
const myChart34 = new Chart(ctx34, config34);


const ctx35 = document.getElementById('myChart35').getContext('2d');

// Créer un dégradé pour le graphique d'ensoleillement avec des couleurs de soleil
const gradient35 = ctx35.createLinearGradient(0, 0, 0, 400);
gradient35.addColorStop(0, 'rgba(255, 187, 0, 0.5)'); // Dégradé jaune clair au sommet
gradient35.addColorStop(1, 'rgba(255, 255, 255, 255)');  // Dégradé orange clair au bas

const data35 = {
    labels: [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
        '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
        '22:00', '23:00'
    ],
    datasets: [{
        label: 'Tension de charge (V)',
        data: ensoleillement,  // Remplacer par les données réelles
        fill: true,  // Activer le remplissage
        backgroundColor: gradient35,  // Utiliser le même fond que 'Energie Produite'
        borderColor: 'rgb(2255, 187, 0)',  // Même couleur de bordure que 'Energie Produite'
        borderWidth: 2.5,  // Épaisseur de la bordure
        tension: 0.3,  // Lisser la courbe pour correspondre à l'autre
        pointRadius: 0,  // Désactiver les points pour une ligne continue
    }]
};

const config35 = {
    type: 'line',
    data: data35,
    options: {
        responsive: true,
        maintainAspectRatio: false,  // S'assurer que le ratio est flexible
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Heure'
                },
                grid: {
                    display: true,  // Désactiver la grille, comme dans l'autre graphique
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Tension de charge (V)'
                },
                beginAtZero: true,
                min: 0,  // Commencer l'axe Y à 0
            }
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,  // Le tooltip suit l'index
            },
            title: {
                display: true,
            },
            zoom: {
                pan: {
                    enabled: false,  // Désactiver le pan pour correspondre au premier graphique
                },
                zoom: {
                    enabled: false,  // Désactiver le zoom
                }
            }
        },
        elements: {
            line: {
                borderJoinStyle: 'round'  // Lissage de la courbe
            }
        },
    }
};

// Initialisation du graphique d'ensoleillement
const myChart35 = new Chart(ctx35, config35);


  // Régulateur
  const ctx4 = document.getElementById('myChart4').getContext('2d');

// Création d'un dégradé pour le graphique de courant régulateur
const gradient4 = ctx4.createLinearGradient(0, 0, 0, 400);
gradient4.addColorStop(0, 'rgba(13, 211, 23, 0.5)'); // Dégradé bleu au sommet
gradient4.addColorStop(1, 'rgba(13, 211, 23, 0)');  // Dégradé transparent en bas

const data4 = {
    labels: [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
        '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
        '22:00', '23:00'
    ],
    datasets: [{
        label: 'Courant de charge (A)',
        data: courant_regulateur,  // Les données de courant régulateur ici
        fill: true,  // Activer le remplissage
        backgroundColor: gradient4,  // Appliquer le dégradé
        borderColor: 'rgba(13, 211, 23)',  // Couleur de la bordure (bleu)
        borderWidth: 2.5,  // Épaisseur de la bordure
        tension: 0.3,  // Lisser la courbe, comme dans consommationChart
        pointRadius: 0,  // Désactiver les points pour une ligne continue
    }]
};

const config4 = {
    type: 'line',
    data: data4,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Heure'
                },
                grid: {
                    display: true,  // Désactiver la grille pour l'axe des x
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Courant de charge (A)'
                },
                beginAtZero: true,
                min: 0,
            }
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,  // Le tooltip suit l'index
            },
            title: {
                display: true,
            },
            zoom: {
                pan: {
                    enabled: false,  // Désactiver le pan pour correspondre au premier graphique
                },
                zoom: {
                    enabled: false,  // Désactiver le zoom
                }
            }
        },
        elements: {
            line: {
                borderJoinStyle: 'round'  // Lissage de la courbe
            }
        },
    }
};
// Initialisation du graphique de courant régulateur
const myChart4 = new Chart(ctx4, config4);

  
const ctx5 = document.getElementById('myChart5').getContext('2d');

// Création d'un dégradé pour le graphique de tension
const gradient5 = ctx5.createLinearGradient(0, 0, 0, 400);
gradient5.addColorStop(0, 'rgba(238, 72, 174, 0.5)'); // Dégradé rose au sommet
gradient5.addColorStop(1, 'rgba(255, 255, 255, 0)');  // Dégradé transparent en bas

const data5 = {
    labels: [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
        '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
        '22:00', '23:00'
    ],
    datasets: [{
        label: 'Capacité (Ah)',
        data: tension_regulateur,  // Les données de tension ici
        fill: true,  // Activer le remplissage
        backgroundColor: gradient5,  // Appliquer le dégradé
        borderColor: 'rgba(238, 72, 174)',  // Couleur de la bordure
        borderWidth: 2.5,  // Épaisseur de la bordure
        tension: 0.3,  // Lisser la courbe
        pointRadius: 0,  // Désactiver les points pour une ligne continue
    }]
};

const config5 = {
    type: 'line',
    data: data5,
    options: {
        responsive: true,
        maintainAspectRatio: false,  // S'assurer que le ratio est flexible
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Heure'
                },
                grid: {
                    display: true,  // Désactiver la grille pour correspondre aux autres graphes
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Capacité (Ah)'
                },
                beginAtZero: true,
                min: 0,  // Commencer l'axe Y à 0
            }
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,  // Le tooltip suit l'index
            },
            title: {
                display: true,
            },
            zoom: {
                pan: {
                    enabled: false,  // Désactiver le pan pour correspondre au premier graphique
                },
                zoom: {
                    enabled: false,  // Désactiver le zoom
                }
            }
        },
        elements: {
            line: {
                borderJoinStyle: 'round'  // Lissage de la courbe
            }
        },
    }
};
// Initialisation du graphique de tension
const myChart5 = new Chart(ctx5, config5);

const ctx666 = document.getElementById('myChart666').getContext('2d');

// Créer un dégradé pour le graphique d'ensoleillement avec des couleurs de soleil
const gradient666 = ctx666.createLinearGradient(0, 0, 0, 400);
gradient666.addColorStop(0, 'rgba(36, 203, 209, 0.5)'); // Dégradé jaune clair au sommet
gradient666.addColorStop(1, 'rgba(36, 203, 209 ,0)');  // Dégradé orange clair au bas

const data666 = {
    labels: [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
        '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
        '22:00', '23:00'
    ],
    datasets: [{
        label: 'Puissance (w)',
        data: puissance_regulateur,  // Remplacer par les données réelles
        fill: true,  // Activer le remplissage
        backgroundColor: gradient666,
        borderColor: 'rgb( 36, 203, 209)',  // Même couleur de bordure que 'Energie Produite'
        borderWidth: 2.5,  // Épaisseur de la bordure
        tension: 0.3,  // Lisser la courbe pour correspondre à l'autre
        pointRadius: 0,  // Désactiver les points pour une ligne continue
    }]
};

const config666 = {
    type: 'line',
    data: data666,
    options: {
        responsive: true,
        maintainAspectRatio: false,  // S'assurer que le ratio est flexible
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Heure'
                },
                grid: {
                    display: true,  // Désactiver la grille, comme dans l'autre graphique
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Puissance (W)'
                },
                beginAtZero: true,
                min: 0,  // Commencer l'axe Y à 0
            }
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,  // Le tooltip suit l'index
            },
            title: {
                display: true,
            },
            zoom: {
                pan: {
                    enabled: false,  // Désactiver le pan pour correspondre au premier graphique
                },
                zoom: {
                    enabled: false,  // Désactiver le zoom
                }
            }
        },
        elements: {
            line: {
                borderJoinStyle: 'round'  // Lissage de la courbe
            }
        },
    }
};

// Initialisation du graphique d'ensoleillement
const myChart666 = new Chart(ctx666, config666);

const ctx777 = document.getElementById('myChart777').getContext('2d');

// Créer un dégradé pour le graphique d'ensoleillement avec des couleurs de soleil
const gradient777 = ctx777.createLinearGradient(0, 0, 0, 400);
gradient777.addColorStop(0, 'rgba(36, 203, 209, 0.5)'); // Dégradé jaune clair au sommet
gradient777.addColorStop(1, 'rgba(36, 203, 209 ,0)');  // Dégradé orange clair au bas

const data777 = {
    labels: [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
        '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
        '22:00', '23:00'
    ],
    datasets: [{
        label: 'Puissance (w)',
        data: puissance_regulateur,  // Remplacer par les données réelles
        fill: true,  // Activer le remplissage
        backgroundColor: gradient666,
        borderColor: 'rgb( 36, 203, 209)',  // Même couleur de bordure que 'Energie Produite'
        borderWidth: 2.5,  // Épaisseur de la bordure
        tension: 0.3,  // Lisser la courbe pour correspondre à l'autre
        pointRadius: 0,  // Désactiver les points pour une ligne continue
    }]
};

const config777 = {
    type: 'line',
    data: data777,
    options: {
        responsive: true,
        maintainAspectRatio: false,  // S'assurer que le ratio est flexible
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Heure'
                },
                grid: {
                    display: true,  // Désactiver la grille, comme dans l'autre graphique
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Puissance (W)'
                },
                beginAtZero: true,
                min: 0,  // Commencer l'axe Y à 0
            }
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,  // Le tooltip suit l'index
            },
            title: {
                display: true,
            },
            zoom: {
                pan: {
                    enabled: false,  // Désactiver le pan pour correspondre au premier graphique
                },
                zoom: {
                    enabled: false,  // Désactiver le zoom
                }
            }
        },
        elements: {
            line: {
                borderJoinStyle: 'round'  // Lissage de la courbe
            }
        },
    }
};

// Initialisation du graphique d'ensoleillement
const myChart777 = new Chart(ctx777, config777);

const ctx77 = document.getElementById('myChart77').getContext('2d');

// Crée des dégradés pour les courbes
const gradientCourantPN = ctx77.createLinearGradient(0, 0, 0, 400);
gradientCourantPN.addColorStop(1, 'rgba(255, 255, 255, 0)');

const gradientCourantReg = ctx77.createLinearGradient(0, 0, 0, 400);
gradientCourantReg.addColorStop(1, 'rgba(255, 255, 255, 0)');

const data77 = {
    labels: [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', 
        '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', 
        '22:00', '23:00'
    ],
    datasets: [{
        label: 'SoC',
        data: courantpanneau, // Assurez-vous que cette variable est définie dans votre code
        fill: true,
        backgroundColor: gradientCourantPN,
        borderColor: 'rgba(9, 167, 4)',
        borderWidth: 2.5,
        tension: 0.3, // Réduit la tension pour un effet plus doux
        pointRadius: 0 // Aucun point visible
    },]
};

const config77 = {
    type: 'line',
    data: data77,
    options: {
        responsive: true,
        maintainAspectRatio: false,  // S'assurer que le ratio est flexible
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Heure'
                },
                grid: {
                    display: true,  // Désactiver la grille, comme dans l'autre graphique
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'SoC'
                },
                beginAtZero: true,
                min: 0,  // Commencer l'axe Y à 0
            }
        },

        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,  // Le tooltip suit l'index
            },
            title: {
                display: true,
            },
            zoom: {
                pan: {
                    enabled: false,  // Désactiver le pan pour correspondre au premier graphique
                },
                zoom: {
                    enabled: false,  // Désactiver le zoom
                }
            }
        },
        elements: {
            line: {
                borderJoinStyle: 'round'  // Lissage de la courbe
            }
        },
    }
};

const myChart77 = new Chart(ctx77, config77);

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////

const ctx88 = document.getElementById('myChart88').getContext('2d');

// Crée des dégradés pour les courbes
const gradientTensionPN = ctx88.createLinearGradient(0, 0, 0, 400);
gradientTensionPN.addColorStop(1, 'rgba(255, 255, 255, 0)');

const gradientTensionReg = ctx88.createLinearGradient(0, 0, 0, 400);
gradientTensionReg.addColorStop(1, 'rgba(255, 255, 255, 0)');

const data88 = {
    labels: [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', 
        '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', 
        '22:00', '23:00'
    ],
    datasets: [
        {
            label: 'DoD',
            data: tensionpanneau, // Assurez-vous que cette variable contient vos données de tension
            borderColor: 'rgba(228, 10, 10)', // Couleur de la courbe de TensionPN
            backgroundColor: gradientTensionPN,
            borderWidth: 2.5,
            tension: 0.3, // Modifié pour correspondre à la courbe précédente
            pointRadius: 0 // Masque les points
        },
    ]
};

const config88 = {
    type: 'line',
    data: data88,
    options: {
        responsive: true,
        maintainAspectRatio: false,  // S'assurer que le ratio est flexible
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Heure'
                },
                grid: {
                    display: true,  // Désactiver la grille, comme dans l'autre graphique
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'DoD'
                },
                beginAtZero: true,
                min: 0,  // Commencer l'axe Y à 0
            }
        },

         plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,  // Le tooltip suit l'index
            },
            title: {
                display: true,
            },
            zoom: {
                pan: {
                    enabled: false,  // Désactiver le pan pour correspondre au premier graphique
                },
                zoom: {
                    enabled: false,  // Désactiver le zoom
                }
            }
        },
        elements: {
            line: {
                borderJoinStyle: 'round'  // Lissage de la courbe
            }
        },
    }
};
    const myChart88 = new Chart(ctx88, config88);
</script>

    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script>
        document.addEventListener('DOMContentLoaded', (event) => {
  const links = document.querySelectorAll('aside ul li a');

  links.forEach(link => {
    link.addEventListener('click', function() {
      // Retirer la classe 'active' de tous les éléments
      links.forEach(link => link.parentElement.classList.remove('active'));

      // Ajouter la classe 'active' à l'élément cliqué
      this.parentElement.classList.add('active');
    });
  });
});
    </script>
   
</body>
</html>
