// Superteam Brasil pages: the /superteam index, a skill's page, a subskill's
// page, the SuperteamCard, and the install / file-library / kit blocks they
// share. "Superteam Brasil" is a name and is never translated. Text with
// inline markup uses {slot} tokens (see home.ts). Registry data (skill names,
// taglines, summaries, install-option labels and notes) and the mirrored
// markdown stay in their original language.
const en = {
  // A prompt to paste into an agent chat. The trailing space is part of the
  // text: the reader finishes the sentence with their task.
  readPrompt: (url: string) => `Read ${url} and follow it for this task: `,

  // Pieces shared by a skill's page and a subskill's page.
  detail: {
    breadcrumb: 'Breadcrumb',
    byline: 'by Superteam Brasil',
    details: 'Details',
    maintainer: 'Maintainer',
    license: 'License',
    noLicense: 'None declared',
    release: 'Release',
    pinnedCommit: 'Pinned commit',
  },

  // /superteam
  index: {
    title: 'Superteam Brasil skills · Solana Skills',
    description:
      'Official skills from Superteam Brasil, part of the Solana AI Kit: a full security audit firm and a startup operations playbook for your agent. Every file hosted as markdown, ready to copy.',
    officialSkills: 'Official skills',
    heading: 'Official skills from',
    lead: 'Superteam Brasil builds and maintains these skills as part of the Solana AI Kit. They are open source and MIT-licensed. Each one is mirrored here at a pinned commit, with every skill, subskill and reference file on its own URL as markdown, ready to copy or hand to an agent.',
    stats: {
      skills: 'Skills',
      subskills: 'Subskills, commands and agents',
      files: 'Markdown files hosted',
      contributors: 'Contributors',
    },
    corePack: 'Core pack of the kit',
    addOnPack: 'Kit add-on pack',
    // Counts of each kind of subskill, in the chips under a skill.
    kinds: {
      skill: (n: number) => `${n} ${n === 1 ? 'skill' : 'skills'}`,
      command: (n: number) => `${n} ${n === 1 ? 'command' : 'commands'}`,
      agent: (n: number) => `${n} ${n === 1 ? 'agent' : 'agents'}`,
    },
    checklists: (n: number) => `${n} ${n === 1 ? 'checklist' : 'checklists'}`,
    knownVectors: (n: number) => `${n} known attack ${n === 1 ? 'vector' : 'vectors'}`,
    references: (n: number) => `${n} reference ${n === 1 ? 'file' : 'files'}`,
    explore: (name: string) => `Explore ${name}`,
    open: 'Open',
  },

  // /superteam/<id>
  skill: {
    title: (name: string) => `${name} by Superteam Brasil · Solana Skills`,
    corePack: 'Core pack of the Solana AI Kit',
    addOnPack: 'Solana AI Kit add-on pack',
    note: 'An official Superteam Brasil skill, built and maintained by the team behind the Solana AI Kit. Every file is mirrored here byte-for-byte at commit {sha}; copy any of them as markdown or open it raw.',
    // Labels for the numbers in registry `counts`, keyed by the registry's own key.
    counts: {
      commands: 'Commands',
      agents: 'Agents',
      checklists: 'Checklists',
      knownVectors: 'Known attack vectors',
      skills: 'Skills',
      references: 'Reference files',
    },
    markdownFiles: 'Markdown files',
    // One section per kind of subskill.
    kinds: {
      skill: {
        title: 'Skills',
        sub: 'Each one a SKILL.md with its own reference files. Open a page, copy the markdown, or point your agent at the hosted file.',
      },
      command: {
        title: 'Commands',
        sub: 'Slash commands, each a markdown file your agent runs on request.',
      },
      agent: {
        title: 'Agents',
        sub: 'Subagents the commands hand work to, each defined in one markdown file.',
      },
    },
    aside: {
      repository: 'Repository',
      contributors: 'Contributors',
      inKit: 'In the Solana AI Kit',
      kitCore: 'Core, installed by default',
      kitAddOn: 'Add-on',
      viewOnGithub: 'View on GitHub',
      reportIssue: 'Report issue',
    },
    files: {
      heading: 'Every file',
      body: 'All markdown in the repo, hosted at {path}. Relative links between files resolve on this domain.',
      source: 'Source on GitHub ↗',
    },
  },

  // /superteam/<id>/<subskill>
  sub: {
    title: (name: string, skill: string) => `${name} · ${skill} by Superteam Brasil`,
    kind: { skill: 'Skill', command: 'Command', agent: 'Agent' },
    otherKind: { skill: 'Other skills', command: 'Other commands', agent: 'Other agents' },
    moreKind: { skill: 'More skills', command: 'More commands', agent: 'More agents' },
    commandNote:
      'Run it in Claude Code once {skill} is installed (plugin, script or the Solana AI Kit; see {link}):',
    agentNote:
      'A subagent of {skill}: its commands spawn it, so it comes with any install of the skill (see {link}).',
    skillOnly: 'Just this skill, with its reference files, at the pinned commit:',
    skillSet:
      "Or the whole set. The skills link to each other's format files, so the set works best together:",
    noInstall: 'No install: tell your agent',
    notMirrored: 'This file is not mirrored yet. {link}.',
    readOnGithub: 'Read it on GitHub',
    partOf: 'Part of',
    type: 'Type',
    referenceFiles: 'Reference files',
  },

  // SuperteamCard (home page, catalog)
  card: {
    skills: (n: number) => `${n} ${n === 1 ? 'skill' : 'skills'}`,
    commandsAndAgents: (n: number) => `${n} commands and agents`,
  },

  // InstallPanel
  install: {
    methods: 'Install methods',
    noInstall: 'No install',
    noInstallNote: 'Hosted here as plain markdown at a pinned commit. Tell your agent:',
    // The install options in registry.json carry their own English label and
    // note. Those the site ships today are translated here, matched on the
    // exact English text (so these English entries repeat the registry). Any
    // label or note not listed shows as the registry wrote it.
    labels: {
      'Claude Code plugin': 'Claude Code plugin',
      'Install script': 'Install script',
      'Solana AI Kit': 'Solana AI Kit',
      'skills CLI': 'skills CLI',
      Git: 'Git',
    },
    notes: {
      'Recommended. Installs every /auditor:* command and agent, outside any repository you audit.':
        'Recommended. Installs every /auditor:* command and agent, outside any repository you audit.',
      'A user-level skill, outside the repositories you audit. Read the script first: it is a security tool.':
        'A user-level skill, outside the repositories you audit. Read the script first: it is a security tool.',
      'A core pack of the kit: installed with it, nothing else to run.':
        'A core pack of the kit: installed with it, nothing else to run.',
      "Claude Code, Cursor, Codex and other agents. Take the whole set: the skills link to each other's format files.":
        "Claude Code, Cursor, Codex and other agents. Take the whole set: the skills link to each other's format files.",
      'Copy every skill into your project. Use .agents/skills/ instead for Codex, Cursor and Copilot.':
        'Copy every skill into your project. Use .agents/skills/ instead for Codex, Cursor and Copilot.',
      'An add-on pack of the kit: one command inside a kit project.':
        'An add-on pack of the kit: one command inside a kit project.',
    },
  },

  // FileLibrary
  files: {
    root: 'Root',
  },

  // KitBand
  kitBand: {
    lead: 'Superteam Brasil builds these skills as part of the Solana AI Kit, its open-source Claude Code and Codex kit for Solana.',
    heading: 'One install for the whole kit',
    body: (
      lead: string,
      n: { agents: number; commands: number; mcpServers: number; packs: number },
    ) =>
      `${lead} ${n.agents} specialist agents, ${n.commands} commands, ${n.mcpServers} MCP servers and ${n.packs} skill packs, behind a firewall that keeps agents away from wallet keypairs.`,
    agents: 'Specialist agents',
    commands: 'Commands',
    packs: 'Skill packs',
    mcpServers: 'MCP servers',
    github: 'Solana AI Kit on GitHub',
    allSkills: 'All Superteam Brasil skills',
  },
};

const ptBr: typeof en = {
  readPrompt: (url: string) => `Leia ${url} e siga-o para esta tarefa: `,

  detail: {
    breadcrumb: 'Trilha de navegação',
    byline: 'por Superteam Brasil',
    details: 'Detalhes',
    maintainer: 'Mantenedor',
    license: 'Licença',
    noLicense: 'Nenhuma declarada',
    release: 'Versão',
    pinnedCommit: 'Commit fixo',
  },

  index: {
    title: 'Skills da Superteam Brasil · Solana Skills',
    description:
      'Skills oficiais da Superteam Brasil, parte do Solana AI Kit: uma firma de auditoria de segurança completa e um playbook de operação de startups para o seu agente. Todos os arquivos hospedados como markdown, prontos para copiar.',
    officialSkills: 'Skills oficiais',
    heading: 'Skills oficiais da',
    lead: 'A Superteam Brasil cria e mantém estas skills como parte do Solana AI Kit. Elas são open source e licenciadas sob MIT. Cada uma é espelhada aqui em um commit fixo, com todas as skills, subskills e arquivos de referência em URLs próprias, como markdown, prontos para copiar ou entregar a um agente.',
    stats: {
      skills: 'Skills',
      subskills: 'Subskills, comandos e agentes',
      files: 'Arquivos markdown hospedados',
      contributors: 'Contribuidores',
    },
    corePack: 'Pacote principal do kit',
    addOnPack: 'Pacote adicional do kit',
    kinds: {
      skill: (n: number) => `${n} ${n === 1 ? 'skill' : 'skills'}`,
      command: (n: number) => `${n} ${n === 1 ? 'comando' : 'comandos'}`,
      agent: (n: number) => `${n} ${n === 1 ? 'agente' : 'agentes'}`,
    },
    checklists: (n: number) => `${n} ${n === 1 ? 'checklist' : 'checklists'}`,
    knownVectors: (n: number) =>
      `${n} ${n === 1 ? 'vetor de ataque conhecido' : 'vetores de ataque conhecidos'}`,
    references: (n: number) => `${n} ${n === 1 ? 'arquivo de referência' : 'arquivos de referência'}`,
    explore: (name: string) => `Explorar ${name}`,
    open: 'Abrir',
  },

  skill: {
    title: (name: string) => `${name} da Superteam Brasil · Solana Skills`,
    corePack: 'Pacote principal do Solana AI Kit',
    addOnPack: 'Pacote adicional do Solana AI Kit',
    note: 'Uma skill oficial da Superteam Brasil, criada e mantida pelo time por trás do Solana AI Kit. Cada arquivo é espelhado aqui byte a byte no commit {sha}; copie qualquer um como markdown ou abra-o em texto puro.',
    counts: {
      commands: 'Comandos',
      agents: 'Agentes',
      checklists: 'Checklists',
      knownVectors: 'Vetores de ataque conhecidos',
      skills: 'Skills',
      references: 'Arquivos de referência',
    },
    markdownFiles: 'Arquivos markdown',
    kinds: {
      skill: {
        title: 'Skills',
        sub: 'Cada uma é um SKILL.md com seus próprios arquivos de referência. Abra uma página, copie o markdown ou aponte seu agente para o arquivo hospedado.',
      },
      command: {
        title: 'Comandos',
        sub: 'Slash commands, cada um em um arquivo markdown que seu agente executa quando solicitado.',
      },
      agent: {
        title: 'Agentes',
        sub: 'Subagentes para os quais os comandos delegam o trabalho, cada um definido em um único arquivo markdown.',
      },
    },
    aside: {
      repository: 'Repositório',
      contributors: 'Contribuidores',
      inKit: 'No Solana AI Kit',
      kitCore: 'Principal, instalado por padrão',
      kitAddOn: 'Adicional',
      viewOnGithub: 'Ver no GitHub',
      reportIssue: 'Reportar problema',
    },
    files: {
      heading: 'Todos os arquivos',
      body: 'Todo o markdown do repositório, hospedado em {path}. Os links relativos entre os arquivos funcionam neste domínio.',
      source: 'Código-fonte no GitHub ↗',
    },
  },

  sub: {
    title: (name: string, skill: string) => `${name} · ${skill} da Superteam Brasil`,
    kind: { skill: 'Skill', command: 'Comando', agent: 'Agente' },
    otherKind: { skill: 'Outras skills', command: 'Outros comandos', agent: 'Outros agentes' },
    moreKind: { skill: 'Mais skills', command: 'Mais comandos', agent: 'Mais agentes' },
    commandNote:
      'Execute no Claude Code depois de instalar {skill} (plugin, script ou o Solana AI Kit; veja {link}):',
    agentNote:
      'Um subagente de {skill}: os comandos o invocam, então ele vem com qualquer instalação da skill (veja {link}).',
    skillOnly: 'Só esta skill, com seus arquivos de referência, no commit fixo:',
    skillSet:
      'Ou o conjunto inteiro. As skills apontam para os arquivos de formato umas das outras, então funcionam melhor juntas:',
    noInstall: 'Sem instalar: avise seu agente',
    notMirrored: 'Este arquivo ainda não foi espelhado. {link}.',
    readOnGithub: 'Leia no GitHub',
    partOf: 'Parte de',
    type: 'Tipo',
    referenceFiles: 'Arquivos de referência',
  },

  card: {
    skills: (n: number) => `${n} ${n === 1 ? 'skill' : 'skills'}`,
    commandsAndAgents: (n: number) => `${n} comandos e agentes`,
  },

  install: {
    methods: 'Métodos de instalação',
    noInstall: 'Sem instalar',
    noInstallNote: 'Hospedado aqui como markdown puro em um commit fixo. Avise seu agente:',
    labels: {
      'Claude Code plugin': 'Plugin do Claude Code',
      'Install script': 'Script de instalação',
      'Solana AI Kit': 'Solana AI Kit',
      'skills CLI': 'CLI de skills',
      Git: 'Git',
    },
    notes: {
      'Recommended. Installs every /auditor:* command and agent, outside any repository you audit.':
        'Recomendado. Instala todos os comandos e agentes /auditor:*, fora de qualquer repositório que você audite.',
      'A user-level skill, outside the repositories you audit. Read the script first: it is a security tool.':
        'Uma skill em nível de usuário, fora dos repositórios que você audita. Leia o script antes: é uma ferramenta de segurança.',
      'A core pack of the kit: installed with it, nothing else to run.':
        'Um pacote principal do kit: instalado junto com ele, sem mais nada para executar.',
      "Claude Code, Cursor, Codex and other agents. Take the whole set: the skills link to each other's format files.":
        'Claude Code, Cursor, Codex e outros agentes. Instale o conjunto inteiro: as skills apontam para os arquivos de formato umas das outras.',
      'Copy every skill into your project. Use .agents/skills/ instead for Codex, Cursor and Copilot.':
        'Copie todas as skills para o seu projeto. Use .agents/skills/ no lugar, para Codex, Cursor e Copilot.',
      'An add-on pack of the kit: one command inside a kit project.':
        'Um pacote adicional do kit: um comando dentro de um projeto do kit.',
    },
  },

  files: {
    root: 'Raiz',
  },

  kitBand: {
    lead: 'A Superteam Brasil cria estas skills como parte do Solana AI Kit, seu kit open source de Claude Code e Codex para a Solana.',
    heading: 'Uma instalação para o kit inteiro',
    body: (
      lead: string,
      n: { agents: number; commands: number; mcpServers: number; packs: number },
    ) =>
      `${lead} ${n.agents} agentes especialistas, ${n.commands} comandos, ${n.mcpServers} servidores MCP e ${n.packs} pacotes de skills, com um firewall que mantém os agentes longe das keypairs das wallets.`,
    agents: 'Agentes especialistas',
    commands: 'Comandos',
    packs: 'Pacotes de skills',
    mcpServers: 'Servidores MCP',
    github: 'Solana AI Kit no GitHub',
    allSkills: 'Todas as skills da Superteam Brasil',
  },
};

const es: typeof en = {
  readPrompt: (url: string) => `Lee ${url} y síguelo para esta tarea: `,

  detail: {
    breadcrumb: 'Ruta de navegación',
    byline: 'por Superteam Brasil',
    details: 'Detalles',
    maintainer: 'Mantenedor',
    license: 'Licencia',
    noLicense: 'Ninguna declarada',
    release: 'Versión',
    pinnedCommit: 'Commit fijado',
  },

  index: {
    title: 'Skills de Superteam Brasil · Solana Skills',
    description:
      'Skills oficiales de Superteam Brasil, parte del Solana AI Kit: una firma de auditoría de seguridad completa y un playbook de operaciones de startups para tu agente. Todos los archivos alojados como markdown, listos para copiar.',
    officialSkills: 'Skills oficiales',
    heading: 'Skills oficiales de',
    lead: 'Superteam Brasil crea y mantiene estas skills como parte del Solana AI Kit. Son de código abierto y tienen licencia MIT. Cada una se replica aquí en un commit fijado, con todas las skills, subskills y archivos de referencia en URLs propias, como markdown, listos para copiar o entregar a un agente.',
    stats: {
      skills: 'Skills',
      subskills: 'Subskills, comandos y agentes',
      files: 'Archivos markdown alojados',
      contributors: 'Colaboradores',
    },
    corePack: 'Paquete principal del kit',
    addOnPack: 'Paquete adicional del kit',
    kinds: {
      skill: (n: number) => `${n} ${n === 1 ? 'skill' : 'skills'}`,
      command: (n: number) => `${n} ${n === 1 ? 'comando' : 'comandos'}`,
      agent: (n: number) => `${n} ${n === 1 ? 'agente' : 'agentes'}`,
    },
    checklists: (n: number) => `${n} ${n === 1 ? 'checklist' : 'checklists'}`,
    knownVectors: (n: number) =>
      `${n} ${n === 1 ? 'vector de ataque conocido' : 'vectores de ataque conocidos'}`,
    references: (n: number) => `${n} ${n === 1 ? 'archivo de referencia' : 'archivos de referencia'}`,
    explore: (name: string) => `Explorar ${name}`,
    open: 'Abrir',
  },

  skill: {
    title: (name: string) => `${name} de Superteam Brasil · Solana Skills`,
    corePack: 'Paquete principal del Solana AI Kit',
    addOnPack: 'Paquete adicional del Solana AI Kit',
    note: 'Una skill oficial de Superteam Brasil, creada y mantenida por el equipo detrás del Solana AI Kit. Cada archivo se replica aquí byte a byte en el commit {sha}; copia cualquiera como markdown o ábrelo sin procesar.',
    counts: {
      commands: 'Comandos',
      agents: 'Agentes',
      checklists: 'Checklists',
      knownVectors: 'Vectores de ataque conocidos',
      skills: 'Skills',
      references: 'Archivos de referencia',
    },
    markdownFiles: 'Archivos markdown',
    kinds: {
      skill: {
        title: 'Skills',
        sub: 'Cada una es un SKILL.md con sus propios archivos de referencia. Abre una página, copia el markdown o indícale a tu agente el archivo alojado.',
      },
      command: {
        title: 'Comandos',
        sub: 'Slash commands, cada uno en un archivo markdown que tu agente ejecuta cuando se lo pides.',
      },
      agent: {
        title: 'Agentes',
        sub: 'Subagentes a los que los comandos delegan el trabajo, cada uno definido en un único archivo markdown.',
      },
    },
    aside: {
      repository: 'Repositorio',
      contributors: 'Colaboradores',
      inKit: 'En el Solana AI Kit',
      kitCore: 'Principal, instalado por defecto',
      kitAddOn: 'Adicional',
      viewOnGithub: 'Ver en GitHub',
      reportIssue: 'Reportar un problema',
    },
    files: {
      heading: 'Todos los archivos',
      body: 'Todo el markdown del repositorio, alojado en {path}. Los enlaces relativos entre archivos se resuelven en este dominio.',
      source: 'Código fuente en GitHub ↗',
    },
  },

  sub: {
    title: (name: string, skill: string) => `${name} · ${skill} de Superteam Brasil`,
    kind: { skill: 'Skill', command: 'Comando', agent: 'Agente' },
    otherKind: { skill: 'Otras skills', command: 'Otros comandos', agent: 'Otros agentes' },
    moreKind: { skill: 'Más skills', command: 'Más comandos', agent: 'Más agentes' },
    commandNote:
      'Ejecútalo en Claude Code una vez que hayas instalado {skill} (plugin, script o el Solana AI Kit; consulta {link}):',
    agentNote:
      'Un subagente de {skill}: sus comandos lo invocan, así que viene con cualquier instalación de la skill (consulta {link}).',
    skillOnly: 'Solo esta skill, con sus archivos de referencia, en el commit fijado:',
    skillSet:
      'O el conjunto completo. Las skills enlazan a los archivos de formato de las demás, por lo que funcionan mejor todas juntas:',
    noInstall: 'Sin instalar: díselo a tu agente',
    notMirrored: 'Este archivo aún no se ha replicado. {link}.',
    readOnGithub: 'Léelo en GitHub',
    partOf: 'Parte de',
    type: 'Tipo',
    referenceFiles: 'Archivos de referencia',
  },

  card: {
    skills: (n: number) => `${n} ${n === 1 ? 'skill' : 'skills'}`,
    commandsAndAgents: (n: number) => `${n} comandos y agentes`,
  },

  install: {
    methods: 'Métodos de instalación',
    noInstall: 'Sin instalar',
    noInstallNote: 'Alojado aquí como markdown simple en un commit fijado. Díselo a tu agente:',
    labels: {
      'Claude Code plugin': 'Plugin de Claude Code',
      'Install script': 'Script de instalación',
      'Solana AI Kit': 'Solana AI Kit',
      'skills CLI': 'CLI de skills',
      Git: 'Git',
    },
    notes: {
      'Recommended. Installs every /auditor:* command and agent, outside any repository you audit.':
        'Recomendado. Instala todos los comandos y agentes /auditor:*, fuera de cualquier repositorio que audites.',
      'A user-level skill, outside the repositories you audit. Read the script first: it is a security tool.':
        'Una skill a nivel de usuario, fuera de los repositorios que auditas. Lee el script antes: es una herramienta de seguridad.',
      'A core pack of the kit: installed with it, nothing else to run.':
        'Un paquete principal del kit: se instala con él, sin nada más que ejecutar.',
      "Claude Code, Cursor, Codex and other agents. Take the whole set: the skills link to each other's format files.":
        'Claude Code, Cursor, Codex y otros agentes. Instala el conjunto completo: las skills enlazan a los archivos de formato de las demás.',
      'Copy every skill into your project. Use .agents/skills/ instead for Codex, Cursor and Copilot.':
        'Copia todas las skills a tu proyecto. Usa .agents/skills/ en su lugar para Codex, Cursor y Copilot.',
      'An add-on pack of the kit: one command inside a kit project.':
        'Un paquete adicional del kit: un solo comando dentro de un proyecto del kit.',
    },
  },

  files: {
    root: 'Raíz',
  },

  kitBand: {
    lead: 'Superteam Brasil crea estas skills como parte del Solana AI Kit, su kit de código abierto de Claude Code y Codex para Solana.',
    heading: 'Una sola instalación para todo el kit',
    body: (
      lead: string,
      n: { agents: number; commands: number; mcpServers: number; packs: number },
    ) =>
      `${lead} ${n.agents} agentes especialistas, ${n.commands} comandos, ${n.mcpServers} servidores MCP y ${n.packs} paquetes de skills, con un firewall que mantiene a los agentes lejos de las keypairs de las wallets.`,
    agents: 'Agentes especialistas',
    commands: 'Comandos',
    packs: 'Paquetes de skills',
    mcpServers: 'Servidores MCP',
    github: 'Solana AI Kit en GitHub',
    allSkills: 'Todas las skills de Superteam Brasil',
  },
};

export default { en, 'pt-br': ptBr, es };
