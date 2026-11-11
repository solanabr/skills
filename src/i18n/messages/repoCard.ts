// Repository card (ecosystem page and home teaser). The vendor badge shows the
// repo's own vendor name, so only the other three repo types are translated.
const en = {
  types: {
    aggregator: 'Aggregator',
    toolkit: 'Toolkit',
    community: 'Community',
  },
  skills: (n: number) => `${n} ${n === 1 ? 'skill' : 'skills'}`,
  picks: (shown: number, total: number) => `${shown} of ${total} indexed — Solana picks`,
  stars: 'GitHub stars',
  lastPush: (date: string) => `Last push: ${date}`,
  release: 'Latest release: what the installer ships, and the commit this card is pinned to',
  pin: 'Skill links on this card point at this commit — the exact tree we indexed',
  stale: 'Stale',
  staleTip: (days: number) => `No pushes in ${days} days`,
  browse: 'Browse skills',
  highlights: 'Solana-relevant skills',
  copyInstall: (name: string) => `Copy install command for ${name}`,
  site: 'Site',
};

const ptBr: typeof en = {
  types: {
    aggregator: 'Agregador',
    toolkit: 'Toolkit',
    community: 'Comunidade',
  },
  skills: (n: number) => `${n} ${n === 1 ? 'skill' : 'skills'}`,
  picks: (shown: number, total: number) => `${shown} de ${total} indexadas — seleção Solana`,
  stars: 'Estrelas no GitHub',
  lastPush: (date: string) => `Último push: ${date}`,
  release: 'Última release: o que o instalador entrega e o commit ao qual este card está fixado',
  pin: 'Os links das skills neste card apontam para este commit — a árvore exata que indexamos',
  stale: 'Inativo',
  staleTip: (days: number) => `Sem pushes há ${days} dias`,
  browse: 'Explorar skills',
  highlights: 'Skills relevantes para a Solana',
  copyInstall: (name: string) => `Copiar comando de instalação de ${name}`,
  site: 'Site',
};

const es: typeof en = {
  types: {
    aggregator: 'Agregador',
    toolkit: 'Toolkit',
    community: 'Comunidad',
  },
  skills: (n: number) => `${n} ${n === 1 ? 'skill' : 'skills'}`,
  picks: (shown: number, total: number) => `${shown} de ${total} indexadas: selección Solana`,
  stars: 'Estrellas en GitHub',
  lastPush: (date: string) => `Último push: ${date}`,
  release: 'Última release: lo que entrega el instalador y el commit al que está fijada esta tarjeta',
  pin: 'Los enlaces de las skills de esta tarjeta apuntan a este commit: el árbol exacto que indexamos',
  stale: 'Inactivo',
  staleTip: (days: number) => `Sin pushes en ${days} días`,
  browse: 'Explorar skills',
  highlights: 'Skills relevantes para Solana',
  copyInstall: (name: string) => `Copiar comando de instalación de ${name}`,
  site: 'Sitio web',
};

export default { en, 'pt-br': ptBr, es };
