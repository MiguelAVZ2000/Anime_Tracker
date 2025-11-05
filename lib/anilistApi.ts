
const ANILIST_API_URL = "https://graphql.anilist.co";

async function fetchAniList(query: string, variables: object) {
  const response = await fetch(ANILIST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error en AniList API: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
}

export async function searchAnime(query: string, page: number = 1, perPage: number = 12) {
  const graphqlQuery = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (search: $search, type: ANIME, sort: SEARCH_MATCH) {
          id
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            large
          }
          description(asHtml: false)
          episodes
          status
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          genres
          averageScore
        }
      }
    }
  `;

  const variables = {
    search: query,
    page,
    perPage,
  };

  return fetchAniList(graphqlQuery, variables);
}

export async function getAnimeById(id: number) {
  const graphqlQuery = `
    query ($id: Int) {
                Media (id: $id, type: ANIME) {
                  id
                  title {
                    romaji
                    english
                    native
                    userPreferred
                  }        coverImage {
          large
        }
        bannerImage
        description(asHtml: false)
        episodes
        status
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        genres
        averageScore
        meanScore
        popularity
        studios(sort: [RELEVANCE]) {
          edges {
            node {
              name
            }
          }
        }
        trailer {
          id
          site
          thumbnail
        }
        externalLinks {
          site
          url
        }
      }
    }
  `;

  const variables = {
    id,
  };

  return fetchAniList(graphqlQuery, variables);
}

export async function searchManga(query: string, page: number = 1, perPage: number = 12) {
  const graphqlQuery = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (search: $search, type: MANGA, sort: SEARCH_MATCH) {
          id
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            large
          }
          description(asHtml: false)
          chapters
          volumes
          status
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          genres
          averageScore
        }
      }
    }
  `;

  const variables = {
    search: query,
    page,
    perPage,
  };

  return fetchAniList(graphqlQuery, variables);
}

export async function getMangaById(id: number) {
  const graphqlQuery = `
    query ($id: Int) {
      Media (id: $id, type: MANGA) {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          large
        }
        bannerImage
        description(asHtml: false)
        chapters
        volumes
        status
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        genres
        averageScore
        meanScore
        popularity
        externalLinks {
          site
          url
        }
      }
    }
  `;

  const variables = {
    id,
  };

  return fetchAniList(graphqlQuery, variables);
}

export async function getSeasonalAnime(season: string, seasonYear: number, page: number = 1, perPage: number = 12) {
  const graphqlQuery = `
    query ($page: Int, $perPage: Int, $season: MediaSeason, $seasonYear: Int) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (season: $season, seasonYear: $seasonYear, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            large
          }
          description(asHtml: false)
          episodes
          status
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          genres
          averageScore
        }
      }
    }
  `;

  const variables = {
    season,
    seasonYear,
    page,
    perPage,
  };

  return fetchAniList(graphqlQuery, variables);
}

export async function getPopularMangaAnilist(page: number = 1, perPage: number = 12) {
  const graphqlQuery = `
    query ($page: Int, $perPage: Int) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (type: MANGA, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            large
          }
          description(asHtml: false)
          chapters
          volumes
          status
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          genres
          averageScore
        }
      }
    }
  `;

  const variables = {
    page,
    perPage,
  };

  return fetchAniList(graphqlQuery, variables);
}

export async function getUpcomingMangaAnilist(page: number = 1, perPage: number = 12) {
  const graphqlQuery = `
    query ($page: Int, $perPage: Int, $startDate: FuzzyDateInt) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (type: MANGA, status: NOT_YET_RELEASED, sort: START_DATE, startDate_greater: $startDate) {
          id
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            large
          }
          description(asHtml: false)
          chapters
          volumes
          status
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          genres
          averageScore
        }
      }
    }
  `;

  const today = new Date();
  const startDate = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  const variables = {
    page,
    perPage,
    startDate,
  };

  return fetchAniList(graphqlQuery, variables);
}
