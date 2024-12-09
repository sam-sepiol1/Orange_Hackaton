app.post('/sub', (req, res) => {
    const event = req.body; // Notification reçue
    const phoneNumber = event.device.phoneNumber;
    const eventType = event.type;

    // Vérifier si l'événement est "area-entered" ou "area-left"
    if (eventType === 'area-entered' || eventType === 'area-left') {
        // Définir la valeur de isInZone selon l'événement
        const isInZone = eventType === 'area-entered' ? 1 : 0;

        // Mettre à jour la colonne isInZone dans la base de données
        database.query(
            `UPDATE numbers SET isInZone = ${isInZone} WHERE number = ${phoneNumber}`,
            (err, results) => {
                if (err) {
                    console.error('Erreur lors de la mise à jour de isInZone:', err);
                    return res.status(500).send('Erreur interne du serveur');
                }

                console.log(`isInZone mis à jour pour le numéro ${phoneNumber} : ${isInZone}`);
            }
        );
    }

    res.status(200).send('Notification traitée');
});
