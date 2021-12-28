interface Artist {
  name: string;
  anv:string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
  thumbnail_url: string;
}

interface CommunityMember {
  username: string;
  resource_url: string;
}

interface Rating {
  count: number;
  average: number;
}

type Community = {
  want: number;
  have: number;
  rating: Rating;
  submitter: CommunityMember;
  contributors: CommunityMember[];
  data_quality: string;
  status: string;
}

interface Label {
  name: string;
  catno: string;
  entity_type: string,
  entity_type_name: string;
  id: number;
  resource_url: string;
  thumbnail_url: string;

}

interface Series {}

interface Company {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
  thumbnail_url: string;
}

interface Format {
  name: string;
  qty: string;
  text: string;
  descriptions: string[];
}

interface Identifier {
  type: string;
  value: string;
  description:string;
}

interface Image {
  type: string;
  uri: string;
  resource_url: string;
  uri150: string;
  width: number;
  height: number;
}

export type {
  Artist,
  Community,
  CommunityMember,
  Company,
  Format,
  Identifier,
  Image,
  Label,
  Rating,
  Series,
};
