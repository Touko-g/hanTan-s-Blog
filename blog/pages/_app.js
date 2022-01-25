import '../styles/globals.css'
import {Container} from "@mui/material";

function MyApp({Component, pageProps}) {
    return <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <Container maxWidth={"lg"}>
            <Component {...pageProps} />
        </Container>
    </>
}

export default MyApp
