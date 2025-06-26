import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Facil from "./facil";
import Normal from "./normal";
import Dificil from "./dificil";
import Pro from "./pro";

function Init({setInterface}) {
    const [idSala, setIdSala] = useState("");
    const [nombreJugador, setNombreJugador] = useState("");

    const hanlerFacil = () => {
        setInterface(<Facil setInterface={setInterface} />);
    };

    const hanlerNormal = () => {
        setInterface(<Normal setInterface={setInterface} />);
    };

    const hanlerDificil = () => {
        setInterface(<Dificil setInterface={setInterface} />);
    };

    const hanlerPro = () => {
        setInterface(<Pro setInterface={setInterface} />);
    };


    return ( <>
        <Paper sx={{ padding:3, maxWidth: 600, margin: "auto"}}>
            <Typography variant="h4" align="center" sx={{ marginTop: 2 }}>
                Bienvenido a MemoryVerbs
            </Typography>
            <Typography variant="body1" align="center" sx={{ marginTop: 1, marginBottom: 2 }}>
                Por favor, Ingrese la dificultad del juego
            </Typography>
            <Stack>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        hanlerFacil();
                    }}
                    sx={{ marginTop: 2 }}
                >
                    Facil
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        hanlerNormal();
                    }}
                    sx={{ marginTop: 2 }}
                >
                    Normal
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                       hanlerDificil();
                    }}
                    sx={{ marginTop: 2 }}
                >
                    Dificil
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        hanlerPro();
                    }}
                    sx={{ marginTop: 2 }}
                >
                    Pro
                </Button>
            </Stack>
        </Paper>
    </> );
}

export default Init;