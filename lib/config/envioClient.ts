import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_ENVIO_ENDPOINT as string;

export const envioClient = new GraphQLClient(endpoint);
