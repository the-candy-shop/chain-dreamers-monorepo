import * as meta from "../../meta.json";

export type MetaData = {
  name: string;
  description: string;
  attributes: { trait_type: string; value: string }[];
  image: string;
};

export const renderMetaData = (id: string, tokenData: number[]): MetaData => {
  const metadata: MetaData = {
    name: `Dreamer #${id}`,
    description: `Runners run, but sometimes they dream. This is one of their dreams.`,
    attributes: [],
    image:
      process.env.API_DOMAIN_BASE_PATH === ""
        ? `https://${process.env.API_DOMAIN_NAME}/tokens/${id}/img`
        : `https://${process.env.API_DOMAIN_NAME}/${process.env.API_DOMAIN_BASE_PATH}/tokens/${id}/img`,
  };

  for (const index of tokenData) {
    if (meta[index]) {
      metadata.attributes.push(meta[index]);
    }
  }

  return metadata;
};
