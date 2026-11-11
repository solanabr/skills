// Browse-skills page (/skills). The filter script cannot call functions, so the
// sentences it writes (`results`, `empty`) are plain strings with {n} / {q} /
// {cat} tokens; the page renders them into data attributes and the script
// fills the tokens in.
const en = {
  title: 'Browse skills — Solana Skills',
  description: (n: number) =>
    `Search ${n}+ agent skills for Solana: official Solana Foundation skills plus ecosystem skills from Jupiter, Helius, Metaplex, SendAI, and more.`,
  heading: 'Browse skills',
  sub: (skills: number, repos: number) =>
    `Official skills from the Solana Foundation and Superteam Brasil, plus ${skills} skills indexed from ${repos} ecosystem repositories — each pinned to the commit we indexed.`,
  search: {
    placeholder: 'Search skills — try "jupiter", "anchor", "security"…',
    // Lower-case words the search also matches on the official cards, so the
    // word on the badge finds them. The English words stay in every language.
    officialKeywords: 'solana foundation official',
    superteamKeywords: 'superteam brasil brazil official',
  },
  chips: {
    all: 'All',
  },
  results: {
    one: '{n} skill',
    other: '{n} skills',
  },
  groups: {
    official: 'Solana Foundation and Superteam Brasil',
    superteam: (sets: string[]) => `Every skill in ${sets.join(' and ')}`,
    ecosystem: 'Indexed from the community',
  },
  card: {
    multiFile: 'multi-file',
    companionFiles: 'Includes companion files',
    noDescription: 'No description provided.',
  },
  empty: {
    none: 'No skills match.',
    query: 'No skills match “{q}”.',
    category: 'No skills match in {cat}.',
    both: 'No skills match “{q}” in {cat}.',
    clear: 'Clear filters',
    byRepo: 'Browse by repository →',
  },
};

const ptBr: typeof en = {
  title: 'Explorar skills — Solana Skills',
  description: (n: number) =>
    `Busque ${n}+ skills de agentes para a Solana: as oficiais da Solana Foundation e as do ecossistema, de times como Jupiter, Helius, Metaplex, SendAI e outros.`,
  heading: 'Explorar skills',
  sub: (skills: number, repos: number) =>
    `Skills oficiais da Solana Foundation e da Superteam Brasil, mais ${skills} skills indexadas de ${repos} repositórios do ecossistema — cada uma fixada no commit que indexamos.`,
  search: {
    placeholder: 'Buscar skills — tente "jupiter", "anchor", "security"…',
    officialKeywords: 'solana foundation official oficial',
    superteamKeywords: 'superteam brasil brazil official oficial',
  },
  chips: {
    all: 'Todas',
  },
  results: {
    one: '{n} skill',
    other: '{n} skills',
  },
  groups: {
    official: 'Solana Foundation e Superteam Brasil',
    superteam: (sets: string[]) => `Todas as skills de ${sets.join(' e ')}`,
    ecosystem: 'Indexadas da comunidade',
  },
  card: {
    multiFile: 'vários arquivos',
    companionFiles: 'Inclui arquivos complementares',
    noDescription: 'Nenhuma descrição informada.',
  },
  empty: {
    none: 'Nenhuma skill encontrada.',
    query: 'Nenhuma skill encontrada para “{q}”.',
    category: 'Nenhuma skill encontrada em {cat}.',
    both: 'Nenhuma skill encontrada para “{q}” em {cat}.',
    clear: 'Limpar filtros',
    byRepo: 'Explorar por repositório →',
  },
};

const es: typeof en = {
  title: 'Explorar skills — Solana Skills',
  description: (n: number) =>
    `Busca entre ${n}+ skills de agentes para Solana: las oficiales de la Solana Foundation y las del ecosistema, de equipos como Jupiter, Helius, Metaplex, SendAI y otros.`,
  heading: 'Explorar skills',
  sub: (skills: number, repos: number) =>
    `Skills oficiales de la Solana Foundation y de Superteam Brasil, más ${skills} skills indexadas de ${repos} repositorios del ecosistema, cada una fijada al commit que indexamos.`,
  search: {
    placeholder: 'Buscar skills: prueba "jupiter", "anchor", "security"…',
    officialKeywords: 'solana foundation official oficial',
    superteamKeywords: 'superteam brasil brazil official oficial',
  },
  chips: {
    all: 'Todas',
  },
  results: {
    one: '{n} skill',
    other: '{n} skills',
  },
  groups: {
    official: 'Solana Foundation y Superteam Brasil',
    superteam: (sets: string[]) => `Todas las skills de ${sets.join(' y ')}`,
    ecosystem: 'Indexadas desde la comunidad',
  },
  card: {
    multiFile: 'varios archivos',
    companionFiles: 'Incluye archivos complementarios',
    noDescription: 'Sin descripción.',
  },
  empty: {
    none: 'No hay skills que coincidan.',
    query: 'No hay skills que coincidan con “{q}”.',
    category: 'No hay skills que coincidan en {cat}.',
    both: 'No hay skills que coincidan con “{q}” en {cat}.',
    clear: 'Limpiar filtros',
    byRepo: 'Explorar por repositorio →',
  },
};

export default { en, 'pt-br': ptBr, es };
