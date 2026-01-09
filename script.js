function recommanderDuvet() {
    const temperature = parseFloat(document.getElementById('temperature').value);
    const resultat = document.getElementById('resultat');
    
    if (isNaN(temperature)) {
        resultat.innerHTML = '<p style="color: red;">A quelle température souhaitez vous utiliser votre sac de couchage (en °C)</p>';
        return;
    }
    
    let recommendation = '';
    
    if (temperature >= 10) {
        recommendation = `
            <div class="recommendation">
                <h2>☀️ Duvet Été / 3 Saisons</h2>
                <p><strong>Type :</strong> Duvet léger (température confort +10°C à +5°C)</p>
                <p><strong>Garnissage :</strong> Duvet 400-600g ou synthétique léger</p>
                <div class="details">
                    <p><strong>Pourquoi ce choix ?</strong></p>
                    <p>À ${temperature}°C, un duvet léger sera suffisant. Il vous gardera au chaud sans vous faire transpirer.</p>
                    <p><strong>Prix indicatif :</strong> 80€ - 200€</p>
                    <p><strong>Exemples :</strong> Forclaz MT500, Quechua S10</p>
                </div>
            </div>
        `;
    } else if (temperature >= 0) {
        recommendation = `
            <div class="recommendation">
                <h2>🍂 Duvet 3 Saisons</h2>
                <p><strong>Type :</strong> Duvet intermédiaire (température confort +5°C à -5°C)</p>
                <p><strong>Garnissage :</strong> Duvet 700-900g ou synthétique moyen</p>
                <div class="details">
                    <p><strong>Pourquoi ce choix ?</strong></p>
                    <p>À ${temperature}°C, vous avez besoin d'un duvet polyvalent qui protège bien du froid sans être trop lourd.</p>
                    <p><strong>Prix indicatif :</strong> 150€ - 350€</p>
                    <p><strong>Exemples :</strong> Forclaz MT900, Marmot Trestles</p>
                </div>
            </div>
        `;
    } else if (temperature >= -10) {
        recommendation = `
            <div class="recommendation">
                <h2>❄️ Duvet Hiver</h2>
                <p><strong>Type :</strong> Duvet chaud (température confort -5°C à -15°C)</p>
                <p><strong>Garnissage :</strong> Duvet 1000-1300g haute qualité</p>
                <div class="details">
                    <p><strong>Pourquoi ce choix ?</strong></p>
                    <p>À ${temperature}°C, il fait froid ! Vous avez besoin d'un duvet bien isolé avec un bon garnissage en duvet d'oie.</p>
                    <p><strong>Prix indicatif :</strong> 250€ - 500€</p>
                    <p><strong>Exemples :</strong> Mountain Hardwear Lamina, The North Face Inferno</p>
                </div>
            </div>
        `;
    } else {
        recommendation = `
            <div class="recommendation">
                <h2>🧊 Duvet Grand Froid / Expédition</h2>
                <p><strong>Type :</strong> Duvet extrême (température confort -15°C et moins)</p>
                <p><strong>Garnissage :</strong> Duvet 1500g+ premium (800+ cuin)</p>
                <div class="details">
                    <p><strong>Pourquoi ce choix ?</strong></p>
                    <p>À ${temperature}°C, c'est du sérieux ! Il vous faut un duvet d'expédition de haute qualité pour rester en sécurité.</p>
                    <p><strong>Prix indicatif :</strong> 400€ - 800€+</p>
                    <p><strong>Exemples :</strong> Mountain Equipment Glacier, Rab Expedition</p>
                    <p><strong>⚠️ Conseil :</strong> Envisagez aussi un matelas isolant R-value 5+ et une tente 4 saisons.</p>
                </div>
            </div>
        `;
    }
    
    resultat.innerHTML = recommendation;
}
