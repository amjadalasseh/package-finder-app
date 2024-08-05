import { variables } from "@/utils/config";
import { ReactNode } from "react";

export interface Module {
  owner: ReactNode;
  stars: ReactNode;
  name: string;
  description: string;
  homepage: string;
  language: string;
  platform: string;
  license: string;
}

export interface Filters {
  languages: string;
  licenses: string;
  platforms: string;
}

interface FetchModulesArgs {
  query: string;
  page: number;
  filters: Filters;
  resultsPerPage: number;
}

export async function fetchModulesAPI({
  query,
  page,
  filters,
  resultsPerPage,
}: FetchModulesArgs) {
  const url = new URL(variables.url ?? "");
  url.searchParams.append("q", query);
  url.searchParams.append("per_page", resultsPerPage.toString());
  url.searchParams.append("page", page.toString());
  url.searchParams.append("api_key", variables.key || "");

  if (filters.languages) {
    url.searchParams.append("languages", filters.languages);
  }

  if (filters.licenses) {
    url.searchParams.append("licenses", filters.licenses);
  }

  if (filters.platforms) {
    url.searchParams.append("platforms", filters.platforms);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data: Module[] = await response.json();
  const totalRecords = response.headers.get("total") || "0";

  return { data, totalRecords: Number(totalRecords) };
}
