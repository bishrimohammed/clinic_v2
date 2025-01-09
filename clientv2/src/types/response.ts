import { Taddress } from "./global";

export type clinicProfileType = {
  id: number;
  name: string;
  logo: string;
  card_valid_date: number;
  website_url: string;
  address_id: 71;
  brand_color: string;
  motto: string;
  number_of_branch: 2;
  branch_addresses: string;
  clinic_type: string;
  has_triage: boolean;
  clinic_seal: boolean;
  address: Taddress;
};
