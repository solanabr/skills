// Ecosystem skill page (/skills/[repo]/[skill]). Only what is specific to it
// lives here; the install tabs, Details sidebar, badges and buttons it shares
// with the official skill page come from skillPage.ts. Skill names,
// descriptions, vendor and repo names, file names and the rendered SKILL.md are
// registry data and stay in their original language.
const en = {
  // Used when the skill ships no description of its own.
  fallbackDescription: (name: string, vendor: string) => `${name} — a Solana agent skill from ${vendor}.`,
  // The badge for a vendor repo shows the vendor's own name, so only the other
  // three repo types are translated.
  types: {
    aggregator: 'Aggregator',
    toolkit: 'Toolkit',
    community: 'Community',
  },
  by: (vendor: string) => `by ${vendor}`,
  note: (vendor: string) =>
    `Ecosystem skill — independently developed and maintained by ${vendor}, not the Solana Foundation. No security review is performed; evaluate before use.`,
  // Added after `note` when the upstream repo has no license.
  noteNoLicense: 'The upstream repo declares no license, so its content is not mirrored here.',
  install: {
    // `skills`: how many skills the upstream repo ships.
    cli: (skills: number, name: string) =>
      `One command for Claude Code, Cursor, Codex, Windsurf and other agents — installs from the upstream repo (current HEAD${skills > 1 ? `; it ships ${skills} skills — pick ${name} when prompted` : ''}).`,
    // `hosted`: whether the SKILL.md is mirrored on this domain.
    claude: (hosted: boolean) =>
      `Drop the ${hosted ? 'mirrored' : 'upstream'} SKILL.md into your skills directory. Global (all projects):`,
    // Companion files that stay on GitHub. The sentence about the offline
    // bundle (skillPage.ts) follows both hints.
    externalHint: (n: number, hosted: boolean) =>
      `This skill references companion files (${n}) that stay on GitHub — links in the ${hosted ? 'mirror' : 'file'} point there, pinned to the indexed commit.`,
    hostedHint: (n: number) => `Companion files (${n}) are hosted on this domain too, so relative links resolve.`,
    // (": string" keeps the type from narrowing to these two English literals.)
    noInstall: (hosted: boolean): string =>
      hosted
        ? 'The skill is mirrored as plain markdown — tell your agent:'
        : 'Point your agent at the raw file on GitHub (pinned to the commit we indexed):',
  },
  // Shown instead of the skill's contents when it is not mirrored here.
  noMirror: {
    notYet: 'This skill isn’t mirrored on this domain yet.',
    noLicense: (name: string) =>
      `${name} doesn’t declare a license, so we link to the source instead of republishing it.`,
    read: 'Read it on GitHub, pinned to the commit we indexed:',
    open: (name: string) => `Open ${name} on GitHub`,
  },
  sourceFile: 'Source file',
  copyFileUrl: 'Copy file URL',
  details: {
    repository: 'Repository',
    pinnedTip: (pinnedAt?: string | null) =>
      pinnedAt
        ? `Pin verified ${pinnedAt} — links and installs reference this exact commit`
        : 'Links and installs reference this exact commit',
  },
  files: {
    githubTip: 'On GitHub, pinned to the indexed commit',
  },
};

const ptBr: typeof en = {
  fallbackDescription: (name: string, vendor: string) =>
    `${name} — uma skill de agente para a Solana, de ${vendor}.`,
  types: {
    aggregator: 'Agregador',
    toolkit: 'Toolkit',
    community: 'Comunidade',
  },
  by: (vendor: string) => `por ${vendor}`,
  note: (vendor: string) =>
    `Skill do ecossistema — desenvolvida e mantida de forma independente por ${vendor}, não pela Solana Foundation. Nenhuma revisão de segurança é feita; avalie antes de usar.`,
  noteNoLicense: 'O repositório original não declara licença, então o conteúdo dele não é espelhado aqui.',
  install: {
    cli: (skills: number, name: string) =>
      `Um comando para Claude Code, Cursor, Codex, Windsurf e outros agentes — instala a partir do repositório original (HEAD atual${skills > 1 ? `; ele traz ${skills} skills — escolha ${name} quando solicitado` : ''}).`,
    claude: (hosted: boolean) =>
      `Coloque o SKILL.md ${hosted ? 'espelhado' : 'original'} no seu diretório de skills. Global (todos os projetos):`,
    externalHint: (n: number, hosted: boolean) =>
      `Esta skill referencia arquivos complementares (${n}) que ficam no GitHub — os links ${hosted ? 'no espelho' : 'no arquivo'} apontam para lá, fixados no commit indexado.`,
    hostedHint: (n: number) =>
      `Os arquivos complementares (${n}) também são hospedados neste domínio, então os links relativos funcionam.`,
    noInstall: (hosted: boolean) =>
      hosted
        ? 'A skill está espelhada como markdown puro — avise seu agente:'
        : 'Aponte seu agente para o arquivo puro no GitHub (fixado no commit que indexamos):',
  },
  noMirror: {
    notYet: 'Esta skill ainda não está espelhada neste domínio.',
    noLicense: (name: string) =>
      `${name} não declara uma licença, então apontamos para a fonte em vez de republicá-la.`,
    read: 'Leia no GitHub, no commit fixo que indexamos:',
    open: (name: string) => `Abrir ${name} no GitHub`,
  },
  sourceFile: 'Arquivo de origem',
  copyFileUrl: 'Copiar URL do arquivo',
  details: {
    repository: 'Repositório',
    pinnedTip: (pinnedAt?: string | null) =>
      pinnedAt
        ? `Fixação verificada em ${pinnedAt} — links e instalações apontam exatamente para este commit`
        : 'Links e instalações apontam exatamente para este commit',
  },
  files: {
    githubTip: 'No GitHub, fixado no commit indexado',
  },
};

const es: typeof en = {
  fallbackDescription: (name: string, vendor: string) =>
    `${name}: una skill de agente para Solana, de ${vendor}.`,
  types: {
    aggregator: 'Agregador',
    toolkit: 'Toolkit',
    community: 'Comunidad',
  },
  by: (vendor: string) => `por ${vendor}`,
  note: (vendor: string) =>
    `Skill del ecosistema: desarrollada y mantenida de forma independiente por ${vendor}, no por la Solana Foundation. No se realiza ninguna revisión de seguridad; evalúala antes de usarla.`,
  noteNoLicense: 'El repositorio original no declara ninguna licencia, así que su contenido no se replica aquí.',
  install: {
    cli: (skills: number, name: string) =>
      `Un comando para Claude Code, Cursor, Codex, Windsurf y otros agentes: instala desde el repositorio original (HEAD actual${skills > 1 ? `; incluye ${skills} skills, elige ${name} cuando se te pida` : ''}).`,
    claude: (hosted: boolean) =>
      `Deja el SKILL.md ${hosted ? 'replicado' : 'original'} en tu directorio de skills. Global (todos los proyectos):`,
    externalHint: (n: number, hosted: boolean) =>
      `Esta skill hace referencia a archivos complementarios (${n}) que permanecen en GitHub: los enlaces ${hosted ? 'de la réplica' : 'del archivo'} apuntan allí, fijados al commit indexado.`,
    hostedHint: (n: number) =>
      `Los archivos complementarios (${n}) también están alojados en este dominio, así que los enlaces relativos funcionan.`,
    noInstall: (hosted: boolean) =>
      hosted
        ? 'La skill está replicada como markdown simple. Díselo a tu agente:'
        : 'Dirige a tu agente al archivo sin procesar en GitHub (fijado al commit que indexamos):',
  },
  noMirror: {
    notYet: 'Esta skill aún no está replicada en este dominio.',
    noLicense: (name: string) =>
      `${name} no declara ninguna licencia, así que enlazamos a la fuente en lugar de republicarla.`,
    read: 'Léela en GitHub, en el commit fijado que indexamos:',
    open: (name: string) => `Abrir ${name} en GitHub`,
  },
  sourceFile: 'Archivo de origen',
  copyFileUrl: 'Copiar URL del archivo',
  details: {
    repository: 'Repositorio',
    pinnedTip: (pinnedAt?: string | null) =>
      pinnedAt
        ? `Fijación verificada el ${pinnedAt}: los enlaces y las instalaciones apuntan exactamente a este commit`
        : 'Los enlaces y las instalaciones apuntan exactamente a este commit',
  },
  files: {
    githubTip: 'En GitHub, fijado al commit indexado',
  },
};

export default { en, 'pt-br': ptBr, es };
