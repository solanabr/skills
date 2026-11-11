// Official skill page (/skills/[id]). The ecosystem skill page
// (/skills/[repo]/[skill], see ecoSkillPage.ts) has the same layout and reuses
// everything here that is not specific to it: the install tabs and their
// notes, the Details sidebar, the pinned-commit and integrity tips.
// Skill titles, summaries, descriptions, file names and the rendered SKILL.md
// are registry data and stay in their original language.
const en = {
  breadcrumb: 'Breadcrumb',
  head: {
    agentView: 'Agent view ↗',
    agentViewTip: 'The raw SKILL.md this page renders — the URL to hand an agent',
    triggers: 'When your agent invokes this',
  },
  // The tab names "skills CLI", "Claude Code" and "Git" are product names.
  install: {
    label: 'Install methods',
    noInstall: 'No install',
    cli: (multiFile: boolean) =>
      `One command for Claude Code, Cursor, Codex, Windsurf and other agents — pulls the full skill${multiFile ? ', companion files included' : ''}.`,
    claude: 'Drop the hosted file into your skills directory. Global (all projects):',
    project: 'Or scoped to the current project:',
    companionHint: (n: number) =>
      `This skill references companion files (${n} of them) — links in the hosted copy resolve to GitHub, so it works standalone.`,
    // Ends every hint about companion files, on both skill pages.
    offlineBundle: 'For the full offline bundle use the CLI or Git tab.',
    hosted: 'The skill is hosted as plain markdown — tell your agent:',
    // A prompt to paste into an agent chat. The trailing space is part of the
    // text: the reader finishes the sentence with their task.
    prompt: (url: string) => `Read ${url} and follow it for this task: `,
    oneShot: 'Or have the skills CLI generate a one-shot prompt (pipe it straight into your agent):',
    raw: 'Or pull the raw file into a terminal session:',
    git: (multiFile: boolean) =>
      `Copy the skill directory${multiFile ? ' with all companion files' : ''} straight from GitHub:`,
  },
  refs: {
    title: 'Reference library',
    sub: (n: number) =>
      `${n} focused ${n === 1 ? 'file' : 'files'}, hosted here — point your agent at just the one it needs instead of the whole skill.`,
  },
  contents: {
    title: 'Skill contents',
    copyCode: 'Copy code block',
  },
  hostedFile: 'Hosted file',
  copyHostedUrl: 'Copy hosted URL',
  copyUrl: 'Copy URL',
  details: {
    title: 'Details',
    maintainer: 'Maintainer',
    license: 'License',
    noLicense: 'None declared',
    version: 'Version',
    length: 'Length',
    lengthValue: (words: string, minutes: number | null) =>
      minutes ? `${words} words · ~${minutes} min` : `${words} words`,
    agentCost: 'Agent cost',
    agentCostTip: 'Approximate tokens an agent spends reading this (bytes ÷ 4)',
    // `refs`: thousands of tokens in the reference files, when the skill has any.
    tokens: (k: string, refs: string | null) => `~${k}k tokens${refs ? ` (+${refs}k refs)` : ''}`,
    repoUpdated: 'Repo updated',
    pinned: 'Pinned commit',
    pinnedTip: (pinnedAt?: string | null) =>
      pinnedAt
        ? `Pin taken ${pinnedAt} — mirror, links, and installs all reference this exact commit`
        : 'Mirror, links, and installs all reference this exact commit',
    integrity: 'Integrity',
    // `command` is a shell command and stays as it is.
    integrityTip: (command: string) => `sha256 of the hosted SKILL.md — verify: ${command}`,
    updatedBy: 'Last updated by',
    requires: 'Requires',
  },
  files: {
    title: (n: number) => `Companion files (${n})`,
    hostedTip: 'Hosted here — stable URL for agents',
    githubTip: 'On GitHub',
  },
  actions: {
    viewOnGithub: 'View on GitHub',
    reportIssue: 'Report issue',
  },
};

const ptBr: typeof en = {
  breadcrumb: 'Trilha de navegação',
  head: {
    agentView: 'Visão do agente ↗',
    agentViewTip: 'O SKILL.md puro que esta página renderiza — a URL para passar a um agente',
    triggers: 'Quando seu agente invoca esta skill',
  },
  install: {
    label: 'Métodos de instalação',
    noInstall: 'Sem instalar',
    cli: (multiFile: boolean) =>
      `Um comando para Claude Code, Cursor, Codex, Windsurf e outros agentes — baixa a skill completa${multiFile ? ', incluindo os arquivos complementares' : ''}.`,
    claude: 'Coloque o arquivo hospedado no seu diretório de skills. Global (todos os projetos):',
    project: 'Ou só para o projeto atual:',
    companionHint: (n: number) =>
      `Esta skill referencia arquivos complementares (${n} no total) — os links na cópia hospedada apontam para o GitHub, então ela funciona de forma independente.`,
    offlineBundle: 'Para o pacote offline completo, use a aba CLI ou Git.',
    hosted: 'A skill está hospedada como markdown puro — avise seu agente:',
    prompt: (url: string) => `Leia ${url} e siga-o para esta tarefa: `,
    oneShot:
      'Ou peça à CLI de skills que gere um prompt de uso único (com pipe direto para o seu agente):',
    raw: 'Ou baixe o arquivo puro em uma sessão de terminal:',
    git: (multiFile: boolean) =>
      `Copie o diretório da skill${multiFile ? ' com todos os arquivos complementares' : ''} direto do GitHub:`,
  },
  refs: {
    title: 'Biblioteca de referência',
    sub: (n: number) =>
      `${n} ${n === 1 ? 'arquivo específico, hospedado' : 'arquivos específicos, hospedados'} aqui — aponte seu agente só para o que ele precisa, em vez de para a skill inteira.`,
  },
  contents: {
    title: 'Conteúdo da skill',
    copyCode: 'Copiar bloco de código',
  },
  hostedFile: 'Arquivo hospedado',
  copyHostedUrl: 'Copiar URL hospedada',
  copyUrl: 'Copiar URL',
  details: {
    title: 'Detalhes',
    maintainer: 'Mantenedor',
    license: 'Licença',
    noLicense: 'Nenhuma declarada',
    version: 'Versão',
    length: 'Tamanho',
    lengthValue: (words: string, minutes: number | null) =>
      minutes ? `${words} palavras · ~${minutes} min` : `${words} palavras`,
    agentCost: 'Custo',
    agentCostTip: 'Tokens aproximados que um agente gasta ao ler isto (bytes ÷ 4)',
    tokens: (k: string, refs: string | null) => `~${k}k tokens${refs ? ` (+${refs}k refs)` : ''}`,
    repoUpdated: 'Repo atualizado',
    pinned: 'Commit fixo',
    pinnedTip: (pinnedAt?: string | null) =>
      pinnedAt
        ? `Fixado em ${pinnedAt} — o espelho, os links e as instalações apontam exatamente para este commit`
        : 'O espelho, os links e as instalações apontam exatamente para este commit',
    integrity: 'Integridade',
    integrityTip: (command: string) => `sha256 do SKILL.md hospedado — para verificar: ${command}`,
    updatedBy: 'Atualizado por',
    requires: 'Requer',
  },
  files: {
    title: (n: number) => `Arquivos complementares (${n})`,
    hostedTip: 'Hospedado aqui — URL estável para agentes',
    githubTip: 'No GitHub',
  },
  actions: {
    viewOnGithub: 'Ver no GitHub',
    reportIssue: 'Reportar erro',
  },
};

const es: typeof en = {
  breadcrumb: 'Ruta de navegación',
  head: {
    agentView: 'Vista del agente ↗',
    agentViewTip: 'El SKILL.md sin procesar que renderiza esta página: la URL para pasarle a un agente',
    triggers: 'Cuándo tu agente invoca esta skill',
  },
  install: {
    label: 'Métodos de instalación',
    noInstall: 'Sin instalar',
    cli: (multiFile: boolean) =>
      `Un comando para Claude Code, Cursor, Codex, Windsurf y otros agentes: descarga la skill completa${multiFile ? ', incluidos los archivos complementarios' : ''}.`,
    claude: 'Deja el archivo alojado en tu directorio de skills. Global (todos los proyectos):',
    project: 'O solo para el proyecto actual:',
    companionHint: (n: number) =>
      `Esta skill hace referencia a archivos complementarios (${n} en total): los enlaces de la copia alojada apuntan a GitHub, así que funciona de forma independiente.`,
    offlineBundle: 'Para el paquete completo sin conexión, usa la pestaña CLI o Git.',
    hosted: 'La skill está alojada como markdown simple. Díselo a tu agente:',
    prompt: (url: string) => `Lee ${url} y síguelo para esta tarea: `,
    oneShot:
      'O pídele a la CLI de skills que genere un prompt de un solo uso (con un pipe directo a tu agente):',
    raw: 'O descarga el archivo sin procesar en una sesión de terminal:',
    git: (multiFile: boolean) =>
      `Copia el directorio de la skill${multiFile ? ' con todos los archivos complementarios' : ''} directamente desde GitHub:`,
  },
  refs: {
    title: 'Biblioteca de referencia',
    sub: (n: number) =>
      `${n} ${n === 1 ? 'archivo específico, alojado' : 'archivos específicos, alojados'} aquí: dirige a tu agente solo a lo que necesite, en lugar de a toda la skill.`,
  },
  contents: {
    title: 'Contenido de la skill',
    copyCode: 'Copiar bloque de código',
  },
  hostedFile: 'Archivo alojado',
  copyHostedUrl: 'Copiar URL alojada',
  copyUrl: 'Copiar URL',
  details: {
    title: 'Detalles',
    maintainer: 'Mantenedor',
    license: 'Licencia',
    noLicense: 'Ninguna declarada',
    version: 'Versión',
    length: 'Longitud',
    lengthValue: (words: string, minutes: number | null) =>
      minutes ? `${words} palabras · ~${minutes} min` : `${words} palabras`,
    agentCost: 'Costo',
    agentCostTip: 'Tokens aproximados que gasta un agente al leer esto (bytes ÷ 4)',
    tokens: (k: string, refs: string | null) => `~${k}k tokens${refs ? ` (+${refs}k refs)` : ''}`,
    repoUpdated: 'Repositorio actualizado',
    pinned: 'Commit fijado',
    pinnedTip: (pinnedAt?: string | null) =>
      pinnedAt
        ? `Fijado el ${pinnedAt}: la réplica, los enlaces y las instalaciones apuntan exactamente a este commit`
        : 'La réplica, los enlaces y las instalaciones apuntan exactamente a este commit',
    integrity: 'Integridad',
    integrityTip: (command: string) => `sha256 del SKILL.md alojado. Para verificarlo: ${command}`,
    updatedBy: 'Actualizado por',
    requires: 'Requiere',
  },
  files: {
    title: (n: number) => `Archivos complementarios (${n})`,
    hostedTip: 'Alojado aquí: URL estable para agentes',
    githubTip: 'En GitHub',
  },
  actions: {
    viewOnGithub: 'Ver en GitHub',
    reportIssue: 'Reportar error',
  },
};

export default { en, 'pt-br': ptBr, es };
