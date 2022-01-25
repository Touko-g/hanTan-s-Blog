import {
    createClient,
    createPreviewSubscriptionHook,
    createImageUrlBuilder,
    createPortableTextComponent
} from "next-sanity";

const config = {
    projectId: 'oee1yd33',
    dataset: 'production',
    apiVersion: '2022-01-25',
    useCdn: false
}

export const sanityClient = createClient(config);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const urlFor = source => createImageUrlBuilder(config).image(source);

export const PortableText = createPortableTextComponent({
    ...config,
    serializers: {}
})