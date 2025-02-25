import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";

function App() {
    const [weine, setWeine] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/weine") // Stelle sicher, dass dein Backend auf Port 5000 läuft!
            .then((response) => response.json())
            .then((data) => setWeine(data))
            .catch((error) => console.error("Fehler beim Laden der Weine:", error));
    }, []);

    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                🍷 Weinliste
            </Typography>
            {weine.map((wein, index) => (
                <Card key={index} style={{ marginBottom: "20px", padding: "10px" }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {wein.name}
                        </Typography>
                        <Typography color="textSecondary">
                            Jahrgang: {wein.jahrgang}
                        </Typography>
                        <Typography color="textSecondary">
                            Preis: {wein.preis}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
}

export default App;
