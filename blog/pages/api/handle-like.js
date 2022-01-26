import { sanityClient } from "../../lib/sanity";

sanityClient.config({
    token: 'skBBefNaF6UW5zFvYnls1IKuMAzqeJtX2jvMUFi62QnXn6IzFGULLpog9mDF4c6una4N2nvVlrNnd1FpG9kJppCESPJsJAXcCElQxqPZa6OulBJjbrINBpun1efEz2gnrQY6TP5aoyCZ8jEKFfCruFuBUD8kC8jIifi5IFDLMmU0fKDJZhrg',
});

export default async function likeButtonHandler(req, res) {
    const { _id } = JSON.parse(req.body);
    const data = await sanityClient
        .patch(_id)
        .setIfMissing({ likes: 0 })
        .inc({ likes: 1 })
        .commit()
        .catch((error) => console.log(error));

    res.status(200).json({ likes: data.likes });
}