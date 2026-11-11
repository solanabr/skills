// Ecosystem page. Text with inline markup uses {slot} tokens (see home.ts).
// `head.sub` is a function that also returns a {link} token: the page passes the
// counts in and renders the result with <Rich>.
const en = {
  title: 'Ecosystem — Solana Skills',
  description: (repos: number, skills: number) =>
    `Explore ${repos} Solana ecosystem skill repositories — ${skills} indexed skills from Jupiter, Helius, Metaplex, SendAI, Solana Mobile, Trail of Bits, and more.`,
  head: {
    title: 'Ecosystem skill repositories',
    sub: (skills: number, repos: number) =>
      `Beyond the official skills: ${skills} skills indexed across ${repos} repositories from Solana teams and the community. Sourced from {link} and direct ecosystem research, refreshed weekly from GitHub.`,
  },
  foundation: {
    title: 'More from the Foundation',
    sub: 'The docs MCP server, the source directory, and the agentic-payments registry.',
    // Badge on each Foundation resource, keyed by the registry's `kind`.
    kinds: {
      directory: 'directory',
      mcp: 'mcp',
      registry: 'registry',
    },
  },
  groups: {
    toolkits: {
      title: 'Aggregators & toolkits',
      sub: 'Many skills per repo — protocol collections and full agent workspaces.',
    },
    vendors: {
      title: 'Teams & protocols',
      sub: 'Skills maintained by the teams behind the protocols and infra they cover.',
    },
    community: {
      title: 'Community',
      sub: 'Independent builders — smaller scope, newer, less battle-tested.',
    },
  },
  tail: {
    title: 'More community skills',
    sub: 'Smaller and newer entries from {link} — repo links only; we haven’t crawled these for individual skills.',
  },
  disclaimer: {
    criteria: {
      lead: 'Listing criteria.',
      body: 'Repositories come from the Foundation’s {link} directory and from direct ecosystem research (official protocol orgs, skill registries). Every listed repo must contain a {file} with {field} frontmatter and is re-indexed weekly. Entries whose upstream disappears get delisted. No security review is performed. Skills are mirrored on this domain only when the upstream repo declares a license; unlicensed repos are linked, never republished.',
    },
    trust: {
      lead: 'Trust the pins, verify the installs.',
      body: 'Ecosystem skills are independently developed — evaluate code, license, and security practices before use. Every skill is tied to an immutable commit: links point at the exact sha we indexed, mirrors carry a published {hash} you can check with {check}, and both are exposed per skill in {json} alongside the commit timestamp. Install commands like {install} pull the repo’s current HEAD — diff against the pin if that matters to you.',
    },
  },
  add: {
    title: 'Maintain a Solana skill repo?',
    body: 'Open a PR to the Foundation’s {repo} — merged repos are picked up by the next weekly refresh and listed here.',
    cta: 'Open a PR',
  },
};

const ptBr: typeof en = {
  title: 'Ecossistema — Solana Skills',
  description: (repos: number, skills: number) =>
    `Explore ${repos} repositórios de skills do ecossistema da Solana — ${skills} skills indexadas de Jupiter, Helius, Metaplex, SendAI, Solana Mobile, Trail of Bits e outros.`,
  head: {
    title: 'Repositórios de skills do ecossistema',
    sub: (skills: number, repos: number) =>
      `Além das skills oficiais: ${skills} skills indexadas em ${repos} repositórios de times da Solana e da comunidade. Fontes: {link} e pesquisa direta no ecossistema, com atualização semanal a partir do GitHub.`,
  },
  foundation: {
    title: 'Mais da Foundation',
    sub: 'O servidor MCP da documentação, o diretório de fontes e o registro de pagamentos de agentes.',
    kinds: {
      directory: 'diretório',
      mcp: 'mcp',
      registry: 'registro',
    },
  },
  groups: {
    toolkits: {
      title: 'Agregadores e toolkits',
      sub: 'Muitas skills por repositório — coleções de protocolos e ambientes completos para agentes.',
    },
    vendors: {
      title: 'Times e protocolos',
      sub: 'Skills mantidas pelos times por trás dos protocolos e da infraestrutura que elas cobrem.',
    },
    community: {
      title: 'Comunidade',
      sub: 'Desenvolvedores independentes — escopo menor, projetos mais novos e menos testados na prática.',
    },
  },
  tail: {
    title: 'Mais skills da comunidade',
    sub: 'Entradas menores e mais recentes de {link} — apenas links para repositórios; ainda não rastreamos estes em busca de skills individuais.',
  },
  disclaimer: {
    criteria: {
      lead: 'Critérios de inclusão.',
      body: 'Os repositórios vêm do diretório {link} da Foundation e de pesquisa direta no ecossistema (organizações oficiais de protocolos, registros de skills). Todo repositório listado precisa conter um {file} com o campo {field} no frontmatter e é reindexado toda semana. Entradas cujo upstream desaparece são removidas da lista. Nenhuma revisão de segurança é feita. As skills só são espelhadas neste domínio quando o repositório upstream declara uma licença; repositórios sem licença recebem apenas um link e nunca são republicados.',
    },
    trust: {
      lead: 'Confie nos commits fixos, verifique as instalações.',
      body: 'As skills do ecossistema são desenvolvidas de forma independente — avalie o código, a licença e as práticas de segurança antes de usar. Toda skill está atrelada a um commit imutável: os links apontam para o sha exato que indexamos, as cópias espelhadas trazem um {hash} publicado que você pode conferir com {check}, e ambos são expostos por skill em {json}, junto com o timestamp do commit. Comandos de instalação como {install} baixam o HEAD atual do repositório — compare com o commit fixo se isso for importante para você.',
    },
  },
  add: {
    title: 'Você mantém um repositório de skills da Solana?',
    body: 'Abra um PR no {repo} da Foundation — os repositórios aceitos entram na próxima atualização semanal e passam a ser listados aqui.',
    cta: 'Abrir um PR',
  },
};

const es: typeof en = {
  title: 'Ecosistema — Solana Skills',
  description: (repos: number, skills: number) =>
    `Explora ${repos} repositorios de skills del ecosistema de Solana: ${skills} skills indexadas de Jupiter, Helius, Metaplex, SendAI, Solana Mobile, Trail of Bits y otros.`,
  head: {
    title: 'Repositorios de skills del ecosistema',
    sub: (skills: number, repos: number) =>
      `Además de las skills oficiales: ${skills} skills indexadas en ${repos} repositorios de equipos de Solana y de la comunidad. Fuentes: {link} e investigación directa del ecosistema, con actualización semanal desde GitHub.`,
  },
  foundation: {
    title: 'Más de la Foundation',
    sub: 'El servidor MCP de la documentación, el directorio de fuentes y el registro de pagos de agentes.',
    kinds: {
      directory: 'directorio',
      mcp: 'mcp',
      registry: 'registro',
    },
  },
  groups: {
    toolkits: {
      title: 'Agregadores y toolkits',
      sub: 'Muchas skills por repositorio: colecciones de protocolos y entornos completos para agentes.',
    },
    vendors: {
      title: 'Equipos y protocolos',
      sub: 'Skills mantenidas por los equipos detrás de los protocolos y la infraestructura que cubren.',
    },
    community: {
      title: 'Comunidad',
      sub: 'Desarrolladores independientes: alcance menor, proyectos más nuevos y menos probados en la práctica.',
    },
  },
  tail: {
    title: 'Más skills de la comunidad',
    sub: 'Entradas más pequeñas y recientes de {link}: solo enlaces a repositorios; aún no los hemos rastreado en busca de skills individuales.',
  },
  disclaimer: {
    criteria: {
      lead: 'Criterios de inclusión.',
      body: 'Los repositorios provienen del directorio {link} de la Foundation y de investigación directa del ecosistema (organizaciones oficiales de protocolos, registros de skills). Todo repositorio listado debe contener un {file} con el campo {field} en el frontmatter y se reindexa cada semana. Las entradas cuyo upstream desaparece se eliminan de la lista. No se realiza ninguna revisión de seguridad. Las skills solo se replican en este dominio cuando el repositorio upstream declara una licencia; los repositorios sin licencia solo se enlazan y nunca se republican.',
    },
    trust: {
      lead: 'Confía en los commits fijados, verifica las instalaciones.',
      body: 'Las skills del ecosistema se desarrollan de forma independiente: evalúa el código, la licencia y las prácticas de seguridad antes de usarlas. Cada skill está atada a un commit inmutable: los enlaces apuntan al sha exacto que indexamos, las copias replicadas incluyen un {hash} publicado que puedes comprobar con {check}, y ambos se exponen por skill en {json}, junto con la marca de tiempo del commit. Los comandos de instalación como {install} descargan el HEAD actual del repositorio: compáralo con el commit fijado si eso te importa.',
    },
  },
  add: {
    title: '¿Mantienes un repositorio de skills de Solana?',
    body: 'Abre un PR en el {repo} de la Foundation: los repositorios aceptados se incorporan en la siguiente actualización semanal y se listan aquí.',
    cta: 'Abrir un PR',
  },
};

export default { en, 'pt-br': ptBr, es };
