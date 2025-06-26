import { Typography, TextField, Button, Paper, InputAdornment, FormControl, InputLabel, OutlinedInput, Stack } from "@mui/material";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import verbosData from "../data/verbos.json";
import { useEffect, useState } from "react";
import Init from "./init";

const estilosBuenos = {
    marginBottom: 2,
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'green',
        },
        '&.Mui-disabled': {
            '& fieldset': {
                borderColor: 'green',
            },
            color: 'green',
        }
    },
    '& .MuiInputLabel-root': {
        color: 'green',
    },
    '& input': {
        color: 'green',
    }
}

const estilosMalos = {
    marginBottom: 2,
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'red',
        },
        '&.Mui-disabled': {
            '& fieldset': {
                borderColor: 'red',
            },
            color: 'red',
        }
    },
    '& .MuiInputLabel-root': {
        color: 'red',
    },
    '& input': {
        color: 'red',
    }
}

const estilosNormales = {
  marginBottom: 2,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)', // borde normal
    },
    '&.Mui-disabled': {
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)', // borde deshabilitado
      },
      color: 'rgba(0, 0, 0, 0.6)', // texto deshabilitado
    }
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.6)', // color etiqueta normal
  },
  '& input': {
    color: 'rgba(0, 0, 0, 0.87)', // texto normal
  }
}

function Dificil({ setInterface }) {
    const [init, setInit] = useState(false);
    const [verbos, setVerbos] = useState(verbosData);

    const [verboActual, setVerboActual] = useState({});

    const [contadorBuenas, setContadorBuenas] = useState(0);
    const [cantidadVerbos, setCantidadVerbros] = useState(0);

    const [esperando, setEsperando] = useState(false);

    const [respuestaPastSimple, setRespuestaPastSimple] = useState("");
    const [respuestaPastParticiple, setRespuestaPastParticiple] = useState("");
    const [respuestaSpanish, setRespuestaSpanish] = useState("");
    const [respuestaInitive, setRespuestaInitive] = useState("");

    const [buenoPastSimple, setBuenoPastSimple] = useState(false);
    const [buenoPastParticiple, setBuenoPastParticiple] = useState(false);
    const [buenoSpanish, setBuenoSpanish] = useState(false);
    const [buenoInitive, setBuenoInitive] = useState(false);

    const hanlerVerificarRespuesta = () => {
        setEsperando(true);
        let contadorBuenasLocal = 0;

        if (respuestaInitive.toLowerCase() === verboActual.infinitive.toLowerCase()) {
            setBuenoInitive(true);
            contadorBuenasLocal++;
        }
        else{
            setBuenoInitive(false);
            setRespuestaInitive(respuestaInitive + " -> " + verboActual.infinitive);
        }

        if (respuestaPastSimple.toLowerCase() === verboActual.simple_past.toLowerCase()) {
            setBuenoPastSimple(true);
            contadorBuenasLocal++;
        }
        else{
            setBuenoPastSimple(false);
            setRespuestaPastSimple(respuestaPastSimple + " -> " + verboActual.simple_past);

        }

        if (respuestaPastParticiple.toLowerCase() === verboActual.past_participle.toLowerCase()) {
            setBuenoPastParticiple(true);
            contadorBuenasLocal++;
        }
        else{
            setBuenoPastParticiple(false);
            setRespuestaPastParticiple(respuestaPastParticiple + " -> " + verboActual.past_participle);
            console.log("Respuesta incorrecta: " + respuestaPastParticiple + " -> " + verboActual.past_participle);
        }

        if (respuestaSpanish.toLowerCase() === verboActual.spanish.toLowerCase()) {
            setBuenoSpanish(true);
            contadorBuenasLocal++;
        }else{
            setBuenoSpanish(false);
            console.log("Respuesta incorrecta: " + respuestaSpanish + " -> " + verboActual.spanish);
            setRespuestaSpanish(respuestaSpanish + " -> " + verboActual.spanish);
        }

        if(contadorBuenasLocal == 4){
            setContadorBuenas(contadorBuenas + 1);
            setVerbos(verbos.filter(v => v.infinitive !== verboActual.infinitive));
            if(contadorBuenas + 1 == cantidadVerbos * 4){
                alert("¡Felicidades! Has respondido correctamente todos los verbos.");
                setInterface(<Init setInterface={setInterface} />);
                return;
            }
        }

        setTimeout(MostrarVerbos, 1000 * 3);

    }

    const speak = () => {
        if (!verboActual.infinitive.trim()) return;
        const utterance = new SpeechSynthesisUtterance(verboActual.infinitive);
        utterance.lang = 'en-US'; // Voz en inglés americano
        window.speechSynthesis.speak(utterance);
    };

    const MostrarVerbos = ()=>{
        // console.log("Cantidad de verbos restantes: " + contadorBuenas + " / " + cantidadVerbos);

        setBuenoPastSimple(false);
        setBuenoPastParticiple(false);
        setBuenoSpanish(false);
        setBuenoInitive(false);
        setRespuestaPastSimple("");
        setRespuestaPastParticiple("");
        setRespuestaSpanish("");
        setRespuestaInitive("");

        // Selecciona un verbo aleatorio del array de verbos
        const randomIndex = Math.floor(Math.random() * verbos.length);
        const selectedVerbo = verbos[randomIndex];
        setVerboActual(selectedVerbo);
        setEsperando(false);
    }

    useEffect(() => {
        if(init == false){
            setVerbos(verbosData)
            setCantidadVerbros(verbosData.length);
            setInit(true);
            // setVerbos(verbosData);
        }
        MostrarVerbos();
    }, []);

    return (
        <>
        <Paper sx={{ padding: 3, maxWidth: 600, margin: "auto" }}>
            <Typography variant="h4" align="center" sx={{ marginTop: 2 }}> MemoryVerbs </Typography>
            <Typography variant="h6" align="center" sx={{ marginTop: 1, marginBottom: 2 }}> Debes escuchar el verbo </Typography>
            <TextField
                sx={esperando == true ? buenoInitive == true ? estilosBuenos : estilosMalos : estilosNormales}
                label="Infinitive"
                variant="outlined"
                value={respuestaInitive}
                disabled={esperando== true ? true : false}
                fullWidth
                onChange={(e) => setRespuestaInitive(e.target.value)}
                InputProps={{
                    endAdornment: 
                        esperando == true ? 
                        buenoInitive == true ? (
                            <InputAdornment position="end">
                                <CheckCircleOutline sx={{ color: "green" }} />
                            </InputAdornment>
                        ) : (
                            <InputAdornment position="end">
                                <HighlightOff sx={{ color: "red" }} />
                            </InputAdornment>
                        ) : null
                }}
            />

            <TextField
                sx={esperando == true ? buenoPastSimple == true ? estilosBuenos : estilosMalos : estilosNormales}
                label="Past Simple"
                variant="outlined"
                value={respuestaPastSimple}
                disabled={esperando== true ? true : false}
                fullWidth
                onChange={(e) => setRespuestaPastSimple(e.target.value)}
                InputProps={{
                    endAdornment: 
                        esperando == true ?
                        buenoPastSimple == true ? (
                            <InputAdornment position="end">
                                <CheckCircleOutline sx={{ color: "green" }} />
                            </InputAdornment>
                        ) : (
                            <InputAdornment position="end">
                                <HighlightOff sx={{ color: "red" }} />
                            </InputAdornment>
                        ) : null
                }}
            />

            {/* PARTICIPIO PASADO - Incorrecto */}
            <TextField
                sx={esperando == true ? buenoPastParticiple == true ? estilosBuenos : estilosMalos : estilosNormales}
                label="Past Participle"
                variant="outlined"
                value={respuestaPastParticiple}
                disabled={esperando== true ? true : false}
                fullWidth
                onChange={(e) => setRespuestaPastParticiple(e.target.value)}
                InputProps={{
                    endAdornment: 
                        esperando == true ?
                        buenoPastParticiple == true ? (
                            <InputAdornment position="end">
                                <CheckCircleOutline sx={{ color: "green" }} />
                            </InputAdornment>
                        ) : (
                            <InputAdornment position="end">
                                <HighlightOff sx={{ color: "red" }} />
                            </InputAdornment>
                        ) : null
                }}
            />

            <TextField
                sx={esperando == true ? buenoSpanish == true ? estilosBuenos : estilosMalos : estilosNormales}
                label="Español"
                variant="outlined"
                value={respuestaSpanish}
                disabled={esperando== true ? true : false}
                fullWidth
                onChange={(e) => setRespuestaSpanish(e.target.value)}
                InputProps={{
                    endAdornment: 
                        esperando == true ? 
                        buenoSpanish == true ? (
                            <InputAdornment position="end">
                                <CheckCircleOutline sx={{ color: "green" }} />
                            </InputAdornment>
                        ) : (
                            <InputAdornment position="end">
                                <HighlightOff sx={{ color: "red" }} />
                            </InputAdornment>
                        ) : null
                }}
            />
            <Stack direction="row" spacing={2} sx={{justifyContent: 'space-between' }}>
                <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={()=> {speak()}}
                disabled={esperando== true ? true : false}
                >
                Escuchar verbo
                </Button>
                <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={()=> {hanlerVerificarRespuesta()}}
                disabled={esperando== true ? true : false}
                >
                Verificar Respuesta
                </Button>
                <Typography variant="h6" align="center" sx={{ marginTop: 1, marginBottom: 2 }}> <strong>{contadorBuenas} / {cantidadVerbos}</strong> </Typography>
            </Stack>
        </Paper>
        </>
    );
}

export default Dificil;
