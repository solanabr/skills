// Home page. Text with inline markup uses {slot} tokens: the page renders it
// with <Rich text={…}> and fills each token from a named slot.
const en = {
  title: 'Solana Skills — agent skills for building on Solana',
  description: (n: number) =>
    `${n}+ open-source agent skills from the Solana Foundation and ecosystem — install with one command, or hand your agent a URL.`,
  hero: {
    line1: 'Teach your agent to',
    line2: 'build on Solana',
    sub: 'Markdown skills from the Solana Foundation and the teams building on it — for Claude Code, Cursor, Codex, and any agent that reads markdown. Install one, or hand your agent a URL.',
    browse: 'Browse skills',
    explore: 'Explore the ecosystem',
  },
  stats: {
    official: 'Official skills',
    officialTip: 'Solana Foundation and Superteam Brasil',
    ecosystem: 'Ecosystem repos',
    indexed: 'Skills indexed',
    contributors: 'Contributors',
    contributorsTip: 'Distinct GitHub contributors across every repository indexed here',
  },
  official: {
    title: 'Official skills',
    sub: 'Written and maintained by the Solana Foundation and Superteam Brasil. Mirrored here byte-for-byte at a pinned commit; every build checks the hosted files against their published sha256.',
    superteam: 'Superteam Brasil',
    viewAll: 'View all',
  },
  use: {
    title: 'Three ways to use a skill',
    sub: 'Skills are plain markdown with YAML frontmatter — the open {format} format.',
    formatName: 'Agent Skills',
    cli: {
      title: 'Install with the skills CLI',
      body: 'Works with Claude Code, Cursor, Codex, Windsurf and friends — one command per repo.',
    },
    manual: {
      title: 'Add to Claude Code manually',
      body: 'Drop the hosted file into {global} — global, or per-project under {project}.',
    },
    noInstall: {
      title: 'No install — tell your agent',
      body: 'Every official skill is hosted as plain markdown at a stable URL. One line in any agent chat:',
      prompt: (url: string) => `Read ${url}/llms.txt before you start building on Solana.`,
    },
  },
  ecosystem: {
    title: 'From the ecosystem',
    sub: 'Aggregators, protocol vendors, toolkits, and security specialists — indexed weekly, pinned to the commit we checked.',
    exploreAll: 'Explore all',
  },
  contribute: {
    title: 'Ship your own skill',
    body: 'Write a {code} following the Agent Skills format, publish it on GitHub, and open a PR to {link}. Merged repos are picked up by the next weekly refresh.',
    spec: 'Read the spec',
    submit: 'Submit yours',
  },
};

const ptBr: typeof en = {
  title: 'Solana Skills — skills de agentes para construir na Solana',
  description: (n: number) =>
    `${n}+ skills de agentes open source da Solana Foundation e do ecossistema — instale com um comando ou passe uma URL para o seu agente.`,
  hero: {
    line1: 'Ensine seu agente a',
    line2: 'construir na Solana',
    sub: 'Skills em markdown da Solana Foundation e dos times que constroem na rede — para Claude Code, Cursor, Codex e qualquer agente que leia markdown. Instale uma ou passe uma URL para o seu agente.',
    browse: 'Explorar skills',
    explore: 'Explorar o ecossistema',
  },
  stats: {
    official: 'Skills oficiais',
    officialTip: 'Solana Foundation e Superteam Brasil',
    ecosystem: 'Repositórios do ecossistema',
    indexed: 'Skills indexadas',
    contributors: 'Contribuidores',
    contributorsTip: 'Contribuidores distintos do GitHub em todos os repositórios indexados aqui',
  },
  official: {
    title: 'Skills oficiais',
    sub: 'Escritas e mantidas pela Solana Foundation e pela Superteam Brasil. Espelhadas aqui byte a byte em um commit fixo; a cada build, os arquivos hospedados são conferidos com o sha256 publicado.',
    superteam: 'Superteam Brasil',
    viewAll: 'Ver todas',
  },
  use: {
    title: 'Três formas de usar uma skill',
    sub: 'Skills são markdown puro com frontmatter YAML — o formato aberto {format}.',
    formatName: 'Agent Skills',
    cli: {
      title: 'Instale com a CLI de skills',
      body: 'Funciona com Claude Code, Cursor, Codex, Windsurf e outros — um comando por repositório.',
    },
    manual: {
      title: 'Adicione ao Claude Code manualmente',
      body: 'Coloque o arquivo hospedado em {global} — para uso global — ou em {project}, para um único projeto.',
    },
    noInstall: {
      title: 'Sem instalar — avise seu agente',
      body: 'Toda skill oficial é hospedada como markdown puro em uma URL estável. Uma linha em qualquer chat de agente:',
      prompt: (url: string) => `Leia ${url}/llms.txt antes de começar a construir na Solana.`,
    },
  },
  ecosystem: {
    title: 'Do ecossistema',
    sub: 'Agregadores, fornecedores de protocolos, toolkits e especialistas em segurança — indexados toda semana e fixados no commit que verificamos.',
    exploreAll: 'Explorar tudo',
  },
  contribute: {
    title: 'Publique a sua própria skill',
    body: 'Escreva um {code} seguindo o formato Agent Skills, publique no GitHub e abra um PR em {link}. Os repositórios aceitos entram na próxima atualização semanal.',
    spec: 'Ler a especificação',
    submit: 'Enviar a sua',
  },
};

const es: typeof en = {
  title: 'Solana Skills — skills de agentes para construir en Solana',
  description: (n: number) =>
    `${n}+ skills de agentes de código abierto de la Solana Foundation y del ecosistema: instálalas con un solo comando o pásale una URL a tu agente.`,
  hero: {
    line1: 'Enseña a tu agente a',
    line2: 'construir en Solana',
    sub: 'Skills en markdown de la Solana Foundation y de los equipos que construyen sobre ella, para Claude Code, Cursor, Codex y cualquier agente que lea markdown. Instala una o pásale una URL a tu agente.',
    browse: 'Explorar skills',
    explore: 'Explorar el ecosistema',
  },
  stats: {
    official: 'Skills oficiales',
    officialTip: 'Solana Foundation y Superteam Brasil',
    ecosystem: 'Repositorios del ecosistema',
    indexed: 'Skills indexadas',
    contributors: 'Colaboradores',
    contributorsTip: 'Colaboradores distintos de GitHub en todos los repositorios indexados aquí',
  },
  official: {
    title: 'Skills oficiales',
    sub: 'Escritas y mantenidas por la Solana Foundation y Superteam Brasil. Se replican aquí byte a byte en un commit fijado; en cada build se comprueban los archivos alojados contra su sha256 publicado.',
    superteam: 'Superteam Brasil',
    viewAll: 'Ver todas',
  },
  use: {
    title: 'Tres formas de usar una skill',
    sub: 'Las skills son markdown simple con frontmatter YAML: el formato abierto {format}.',
    formatName: 'Agent Skills',
    cli: {
      title: 'Instala con la CLI de skills',
      body: 'Funciona con Claude Code, Cursor, Codex, Windsurf y otros: un comando por repositorio.',
    },
    manual: {
      title: 'Agrégala a Claude Code manualmente',
      body: 'Deja el archivo alojado en {global} para uso global, o en {project} para un solo proyecto.',
    },
    noInstall: {
      title: 'Sin instalar: díselo a tu agente',
      body: 'Cada skill oficial se aloja como markdown simple en una URL estable. Una línea en cualquier chat de agente:',
      prompt: (url: string) => `Lee ${url}/llms.txt antes de empezar a construir en Solana.`,
    },
  },
  ecosystem: {
    title: 'Del ecosistema',
    sub: 'Agregadores, proveedores de protocolos, toolkits y especialistas en seguridad: se indexan cada semana y quedan fijados al commit que revisamos.',
    exploreAll: 'Explorar todo',
  },
  contribute: {
    title: 'Publica tu propia skill',
    body: 'Escribe un {code} siguiendo el formato Agent Skills, publícalo en GitHub y abre un PR en {link}. Los repositorios aceptados se incorporan en la siguiente actualización semanal.',
    spec: 'Leer la especificación',
    submit: 'Envía la tuya',
  },
};

export default { en, 'pt-br': ptBr, es };
