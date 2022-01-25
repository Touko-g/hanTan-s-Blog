import Layout from "../ components/layout";
import ButtonAppBar from "../ components/bar";
import Chips from "../ components/chips";
import {PortableText, sanityClient, urlFor} from "../lib/sanity";
import {
    Avatar,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Chip,
    Grid,
    IconButton
} from "@mui/material";
import Typography from "@mui/material/Typography";
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as PropTypes from "prop-types";
import {red} from "@mui/material/colors";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import {useState} from "react";
import Box from "@mui/material/Box";
import moment from "moment";

import Link from "next/link";

const recipeQuery = `
    *[_type=="post"] | order(publishedAt desc){
        _id,
        title,
        author->{
            name,image
        },
        body,
        categories[]->{
           title
        },
        mainImage,
        publishedAt,
        _updatedAt,
        slug,
        likes
    }
`

export default function Home({recipes}) {

    const [likes, setLikes] = useState(recipes)

    const addLike = async (_id) => {
        const res = await fetch("/api/handle-like", {
            method: "POST",
            body: JSON.stringify({_id}),
        }).catch((error) => console.log(error));
        const {likes: like} = await res.json()
        const index = likes.findIndex(item => item._id === _id)
        likes[index].likes = like
        setLikes([...likes])
    }

    return (
        <Layout name={"hanTan's blog"}>
            <ButtonAppBar/>
            <Grid
                container
                spacing={5}
                marginY={2}
            >
                {likes.map(item => (
                    <Grid item xs={12} md={6} lg={4} key={item?._id}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar src={urlFor(item?.author?.image).url()}/>
                                }
                                title={item?.author?.name}
                                subheader={moment(item?.publishedAt, "YYYYMMDD").fromNow()}
                            />
                            <CardActionArea>
                                <Link href={`/detail/${item?.title}`}>
                                    <Box>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={urlFor(item?.mainImage).url()}
                                            alt={item?.slug?.current}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item?.title}
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div">
                                                {item?.body[0]?.children[0].text.slice(0, 10) + "..."}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Link>
                            </CardActionArea>
                            <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
                                <Box>
                                    <Badge badgeContent={item?.likes} color="error">
                                        <FavoriteIcon color={item?.likes ? 'error' : ''}
                                                      onClick={() => addLike(item?._id)}/>
                                    </Badge>
                                </Box>
                                <Box sx={{float: "right"}}>
                                    <Chips texts={item?.categories}/>
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    )
}

export async function getStaticProps() {
    const recipes = await sanityClient.fetch(recipeQuery)
    console.log(recipes)
    return {
        props: {recipes}
    }
}
