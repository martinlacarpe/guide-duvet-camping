let duvetDatabase = [];

// Charger la base de données au démarrage
fetch('duvets.json')
    .then(response => response.json())
    .then(data => {
        duvetDatabase = data.duvets;
        console.log('Base de données chargée :', duvetDatabase.length, 'duvets');
    })
    .catch(error => {
        console.error('Erreur de chargement:', error);
        alert('Erreur lors du chargement de la base de données');
    });

function recommanderDuvet() {
    const temperature = parseFloat(document.getElementById('temperature').value);
    const resultat = document.getElementById('resultat');
    
    if (isNaN(temperature)) {
        resultat.innerHTML = '<p style="color: red;">⚠️ Veuillez entrer une température valide</p>';
        return;
    }
    
    if (duvetDatabase.length === 0) {
        resultat.innerHTML = '<p style="color: orange;">⏳ Chargement de la base de données...</p>';
        return;
    }
    
    // Trouver les duvets adaptés
    // Un duvet est adapté si la température demandée est >= température limite
    const duvetsAdaptes = duvetDatabase.filter(duvet => {
        return temperature >= duvet.temperatureLimit;
    });
    
    if (duvetsAdaptes.length === 0) {
        resultat.innerHTML = `
            <div class="recommendation">
                <h2>🧊 Conditions extrêmes</h2>
                <p>À ${temperature}°C, vous avez besoin d'un duvet d'expédition grand froid.</p>
                <p>Nous recommandons de consulter un spécialiste pour des conditions aussi extrêmes.</p>
            </div>
        `;
        return;
    }
    
    // Trier par température confort (du plus chaud au plus froid)
    duvetsAdaptes.sort((a, b) => a.temperatureConfort - b.temperatureConfort);
    
    // Prendre les 3 premiers (ou moins si pas assez)
    const topDuvets = duvetsAdaptes.slice(0, 3);
    
    let html = `
        <div class="recommendation">
            <h2>🎯 Recommandations pour ${temperature}°C</h2>
            <p>Voici ${topDuvets.length} duvet(s) adapté(s) à vos besoins :</p>
        </div>
    `;
    
    topDuvets.forEach((duvet, index) => {
        const badge = index === 0 ? '⭐ MEILLEUR CHOIX' : `Option ${index + 1}`;
        html += `
            <div class="duvet-card ${index === 0 ? 'best-choice' : ''}">
                <div class="badge">${badge}</div>
                <img src="${duvet.image}" alt="${duvet.nom}">
                <h3>${duvet.nom}</h3>
                <p class="marque">${duvet.marque}</p>
                
                <div class="specs">
                    <div class="spec-item">
                        <span class="label">🌡️ Confort :</span>
                        <span class="value">${duvet.temperatureConfort}°C</span>
                    </div>
                    <div class="spec-item">
                        <span class="label">❄️ Limite :</span>
                        <span class="value">${duvet.temperatureLimit}°C</span>
                    </div>
                    <div class="spec-item">
                        <span class="label">🧊 Extrême :</span>
                        <span class="value">${duvet.temperatureExtreme}°C</span>
                    </div>
                    <div class="spec-item">
                        <span class="label">📦 Garnissage :</span>
                        <span class="value">${duvet.garnissage}</span>
                    </div>
                    <div class="spec-item">
                        <span class="label">⚖️ Poids :</span>
                        <span class="value">${duvet.poids}g</span>
                    </div>
                    <div class="spec-item price">
                        <span class="label">💰 Prix :</span>
                        <span class="value">${duvet.prix}€</span>
                    </div>
                </div>
                
                <a href="${duvet.lien}" target="_blank" class="btn-link">
                    Voir le produit →
                </a>
            </div>
        `;
    });
    
    resultat.innerHTML = html;
}

// Fonction pour rechercher par nom (bonus)
function rechercherParNom(nom) {
    return duvetDatabase.filter(duvet => 
        duvet.nom.toLowerCase().includes(nom.toLowerCase()) ||
        duvet.marque.toLowerCase().includes(nom.toLowerCase())
    );
}
