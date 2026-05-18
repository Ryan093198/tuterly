// Inner-southeast Melbourne suburbs used by the directory's location
// search. Two responsibilities:
//
//   1. SUBURBS - flat list the autocomplete filters against as the
//      parent types. Sorted alphabetically.
//
//   2. ADJACENCY - when the parent ticks "Include nearby suburbs",
//      we expand the match set to include every entry in the picked
//      suburb's nearby list. Curated by hand - close-enough-to-be-
//      reasonable-to-drive rather than precise geo distance.

const data = [
  { name: "Albert Park", nearby: ["Middle Park", "South Melbourne", "Port Melbourne", "St Kilda West"] },
  { name: "Armadale", nearby: ["Toorak", "Malvern", "Prahran", "Malvern East"] },
  { name: "Balaclava", nearby: ["St Kilda", "St Kilda East", "Elwood", "Windsor", "Caulfield North"] },
  { name: "Beaumaris", nearby: ["Black Rock", "Sandringham", "Cheltenham", "Mentone"] },
  { name: "Bentleigh", nearby: ["Bentleigh East", "Mckinnon", "Hampton East", "Caulfield South", "Ormond"] },
  { name: "Bentleigh East", nearby: ["Bentleigh", "Mckinnon", "Ormond", "Murrumbeena", "Carnegie"] },
  { name: "Black Rock", nearby: ["Beaumaris", "Sandringham", "Hampton", "Cheltenham"] },
  { name: "Brighton", nearby: ["Brighton East", "Hampton", "Elsternwick", "Bentleigh", "North Brighton"] },
  { name: "Brighton East", nearby: ["Brighton", "Bentleigh", "Hampton", "Mckinnon", "Elsternwick"] },
  { name: "Carnegie", nearby: ["Glen Huntly", "Murrumbeena", "Caulfield East", "Caulfield South", "Ormond"] },
  { name: "Caulfield", nearby: ["Caulfield North", "Caulfield East", "Caulfield South", "Elsternwick", "Glen Huntly"] },
  { name: "Caulfield East", nearby: ["Caulfield", "Caulfield North", "Carnegie", "Murrumbeena", "Glen Huntly"] },
  { name: "Caulfield North", nearby: ["Caulfield", "Caulfield East", "St Kilda East", "Elsternwick", "Balaclava"] },
  { name: "Caulfield South", nearby: ["Caulfield", "Glen Huntly", "Bentleigh", "Elsternwick", "Carnegie"] },
  { name: "Cheltenham", nearby: ["Mentone", "Beaumaris", "Highett", "Moorabbin", "Black Rock"] },
  { name: "Edithvale", nearby: ["Aspendale", "Chelsea", "Mordialloc", "Parkdale"] },
  { name: "Elsternwick", nearby: ["Brighton", "Caulfield", "Caulfield South", "Caulfield North", "Glen Huntly", "St Kilda East"] },
  { name: "Elwood", nearby: ["St Kilda", "St Kilda West", "Balaclava", "Brighton"] },
  { name: "Glen Huntly", nearby: ["Caulfield South", "Caulfield East", "Caulfield", "Carnegie", "Elsternwick", "Mckinnon"] },
  { name: "Hampton", nearby: ["Brighton", "Brighton East", "Sandringham", "Hampton East"] },
  { name: "Hampton East", nearby: ["Hampton", "Bentleigh", "Moorabbin", "Brighton East"] },
  { name: "Highett", nearby: ["Cheltenham", "Hampton East", "Moorabbin", "Mentone"] },
  { name: "Malvern", nearby: ["Malvern East", "Armadale", "Toorak", "Caulfield North"] },
  { name: "Malvern East", nearby: ["Malvern", "Caulfield East", "Caulfield North", "Armadale", "Carnegie"] },
  { name: "Mckinnon", nearby: ["Bentleigh", "Bentleigh East", "Brighton East", "Ormond", "Glen Huntly"] },
  { name: "Mentone", nearby: ["Cheltenham", "Parkdale", "Beaumaris", "Highett", "Mordialloc"] },
  { name: "Middle Park", nearby: ["Albert Park", "St Kilda West", "South Melbourne", "Port Melbourne"] },
  { name: "Moorabbin", nearby: ["Hampton East", "Cheltenham", "Highett", "Bentleigh"] },
  { name: "Mordialloc", nearby: ["Parkdale", "Aspendale", "Mentone", "Edithvale"] },
  { name: "Murrumbeena", nearby: ["Carnegie", "Caulfield East", "Bentleigh East", "Oakleigh"] },
  { name: "North Brighton", nearby: ["Brighton", "Brighton East", "Elsternwick", "Bentleigh"] },
  { name: "Oakleigh", nearby: ["Murrumbeena", "Oakleigh East", "Oakleigh South", "Bentleigh East"] },
  { name: "Ormond", nearby: ["Mckinnon", "Bentleigh", "Bentleigh East", "Carnegie", "Glen Huntly"] },
  { name: "Parkdale", nearby: ["Mentone", "Mordialloc", "Cheltenham", "Aspendale"] },
  { name: "Port Melbourne", nearby: ["South Melbourne", "Albert Park", "Middle Park", "Southbank"] },
  { name: "Prahran", nearby: ["South Yarra", "Windsor", "Armadale", "Toorak"] },
  { name: "Sandringham", nearby: ["Hampton", "Black Rock", "Beaumaris", "Brighton"] },
  { name: "South Melbourne", nearby: ["Albert Park", "Middle Park", "Port Melbourne", "Southbank"] },
  { name: "South Yarra", nearby: ["Prahran", "Toorak", "Windsor", "Southbank"] },
  { name: "Southbank", nearby: ["South Melbourne", "South Yarra", "Port Melbourne"] },
  { name: "St Kilda", nearby: ["St Kilda East", "St Kilda West", "Elwood", "Balaclava", "Windsor"] },
  { name: "St Kilda East", nearby: ["St Kilda", "Balaclava", "Caulfield North", "Elsternwick", "Windsor"] },
  { name: "St Kilda West", nearby: ["St Kilda", "Elwood", "Albert Park", "Middle Park"] },
  { name: "Toorak", nearby: ["South Yarra", "Armadale", "Malvern", "Prahran"] },
  { name: "Windsor", nearby: ["Prahran", "South Yarra", "Balaclava", "St Kilda"] },
];

export const SUBURBS = data.map((d) => d.name);

const ADJACENCY = Object.fromEntries(
  data.map((d) => [d.name.toLowerCase(), d.nearby])
);

/**
 * Returns the array of suburbs considered "nearby" to the given one.
 * Empty array if the suburb isn't in our list.
 */
export function getNearby(suburb) {
  if (!suburb) return [];
  return ADJACENCY[suburb.toLowerCase()] ?? [];
}

/**
 * Returns up to `limit` suburb names matching the search query. Matches
 * substrings, prioritises prefix matches.
 */
export function searchSuburbs(query, limit = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const prefix = [];
  const contains = [];
  for (const name of SUBURBS) {
    const lower = name.toLowerCase();
    if (lower.startsWith(q)) prefix.push(name);
    else if (lower.includes(q)) contains.push(name);
  }
  return [...prefix, ...contains].slice(0, limit);
}
