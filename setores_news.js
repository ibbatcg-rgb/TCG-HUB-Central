// Classificacao de noticias por setor — EXTRAIDO de transcap-news (mantém igual ao feed).
// Gera classifySectors(titulo) -> array de ids de setor; [] = Outros/excluido.
const EXCLUDE_KEYWORDS = [
  // Política Brasil
  'bolsonaro','lula ',' lula','flávio bolsonaro','eduardo bolsonaro','michelle bolsonaro',
  'jair bolsonaro','janja','pacheco','alckmin','tarcísio','alcolumbre','motta tenta','arthur lira',
  'pec 6x1','escala 6x1','reforma tributária','pec dos precatórios','pec da blindagem',
  'congresso nacional','câmara dos deputados','senado federal','comissão do senado','comissão da câmara','cpi ',
  'stf ','supremo tribunal','toffoli','dino ','eleição 2026','eleição municipal','eleitoral',
  'candidato a presidente','candidatura presidencial','governador de ','prefeito de ',
  ' pt ',' pl ',' psd ',' mdb ',' psol ','novo partido','união brasil','progressistas','centrão','três poderes',
  'bolsa família','boulos','marçal','br-319','agu ','agu sobre','parecer da agu',
  // Política internacional
  'trump','biden','casa branca','republicano','democrata','congresso dos eua',
  'partido republicano','partido democrata','putin','zelensky','xi jinping','kim jong',
  // Geopolítica
  'irã','iraniano','iranianos','aiatolá','teerã','israel','israelense','hezbollah','hamas','gaza','palestin',
  'líbano','libanês','síria','otan','báltico','ucrânia','rússia','russo','moscou',
  'oriente médio','estreito de ormuz','golfo pérsico','guerra ucrânia','guerra israel','guerra gaza',
  // Crime/violência
  'assassinato','homicídio','tiroteio','baleado','sequestro','estupro','pedofilia','feminicídio',
  'morta a tiros','morto a tiros','presa por','polícia militar','polícia civil','operação da pf',
  'delação','colaboração premiada','denúncia do mpf','advogado deixa','defesa do ex-','quebra de sigilo',
  'preso por','preso em','flagrante','atlas da violência','violência no brasil',
  'criminoso','traficante','milícia',
  // Bancos / Master / Nubank
  'banco master','vorcaro','brb ','master banco','ex-presidente do brb','banco brb',
  'nubank','nubank na','nubank chega',
  // Saúde / Farma
  'anvisa','vacina','vacinas','eli lilly','pfizer','astrazeneca','novavax','moderna',
  'emagrecedor','ozempic','mounjaro','wegovy','farma','covid','dengue','febre amarela',
  'transplante','câncer','tumor','quimioterapia',
  // Fait divers
  'barbearia','salão de beleza','beleza','perfume','perfumes','cosmético','cosméticos',
  'gastronomia','restaurante','chef ','moda ','desfile','fashion week',
  'capital cultural','desigualdade cultural','horóscopo','signo ',
  // Esporte / celebridades
  'flamengo','palmeiras','corinthians','fluminense','são paulo fc','vasco da gama','botafogo',
  'futebol','libertadores','copa do brasil','copa do mundo','fifa','seleção brasileira',
  'seleção argentina','ranking da fifa','jogador','treinador',
  'big brother','bbb ','novela ','reality show',
  'famosa','famoso','maldição',
  // Tech consumo / IA
  'iphone','apple watch','airpods','instagram','tiktok','whatsapp','chatgpt','gpt-5',
  'anthropic','openai','inteligência artificial','descontrole da ia','botão de pausa',
  'spacex',
  // Commodities macro
  'petróleo brent','petróleo wti','ouro fecha','preço do petróleo','barril do petróleo',
  'terras raras','recursos naturais','royalties','royalties de petróleo','royalties do petróleo',
  'carvão','poderes de emergência','choque de energia',
  // Macro econômico / Fed / Bancos centrais
  'fed ','fomc','hassett','jerome powell','taxa selic',
  'cortar juros','elevar juros','payroll','pec da autonomia',
  'banco central da','pib da','pib do',
  // Resumos diários de bolsa / câmbio
  'ibovespa recua','ibovespa sobe','ibovespa abre','ibovespa fecha','ibovespa cai',
  'dólar abre','dólar fecha','dólar à vista','dólar recua','dólar sobe',
  'destaques desta','destaques da semana',
  // Bancos de investimento / research macro
  'ubs aponta','ubs rebaixa','rebaixar bolsa','rebaixou a bolsa','canário da mina',
  'bofa aponta','citi aponta','morgan stanley aponta',
  // Clima / ESG (não nosso setor direto)
  'mercado de carbono','mercado regulado de carbono','desastres climáticos',
  'mudanças climáticas','el niño',
  // IPO / M&A genérico (não focado em setor)
  'recuperação extrajudicial','recuperação judicial','chapter 11 ',
  // Geopolítica adicional
  'facções','cubano','presidente cubano','sanções','tesouro dos eua',
  // Consultoria / relatórios genéricos
  'mckinsey','mckinsey alerta','bcg ','deloitte alerta',
];

const SECTORS = [
  {
    id: 'rental', name: 'Rental & Automotivo', emoji: '🚗', color: '#e74c3c',
    keywords: [
      'localiza','movida','unidas','vamos ','vamo3','rent3','movi3','armac',
      'tegma','tgma3','locadora','renovar frota','frota de veíc','gtf ','rac ',
      'motos','motocicleta','motocicletas','bicicleta elétrica','crédito para motos',
      'mercado de motos','vendas de motos','financiamento de motos',
      'volkswagen','vw ','byd','stellantis','tesla','bmw','fiat','peugeot',
      'ford ','toyota','general motors',' gm ','chevrolet','hyundai','kia ',
      'renault','nissan','honda','gwm','gac motors','gac ','xiaomi',
      'nio ','vinfast','montadora','anfavea','tavares','chery',
      'fenabrave','emplacamento','fipe','idat','seminovos',
      'carro usado','veículo usado','usados ',
      'financiamento de veículo','financiamento automotivo','crédito automotivo',
      'vendas de veículos','produção de veículos','exportação de veículos',
      'ipva','dpvat','imposto seletivo veíc','imposto seletivo automotiv',
      'carro elétrico','veículo elétrico','eletrificado','plug-in',
      'híbrido flex','elétrico chinês','frota elétrica','e-veículo',
      'automob','setor automotivo','indústria automotiva','autopeç',
      'tarifas trump','guerra comercial automotiv','ev brasil',
    ],
  },
  {
    id: 'concessions', name: 'Concessões & Logística', emoji: '🛣️', color: '#2980b9',
    keywords: [
      'ccr ','ccro3','motiva ','motv3','mover ','mover-','ecorodovias','ecor3','ecoporto','epr ','rota da celulose',
      'rota verde','sorocabana','nova raposo','rodovias do tietê',
      'repactuação de rodov','br-163','artesp','dersa',
      'rumo ','rumo logística','rail3','ferrovia','leilão de ferrov',
      'estrada de ferro','malha norte','malha sul','fs infraestrutura',
      'locomotiva','vagão','frete ferroviário','vale ferrov','acordo ferrov',
      'hidrovias do brasil','hbsa','hbsa3','hidrovia','cabotagem',
      'santos brasil','stbp3','porto de santos','terminal portuário',
      'itaguaí','leilão portuário','túnel santos','porto ','wilson sons',
      'jsl ','jslg3','simpar','simh3','tegma','tgma3',
      'transporte de veículos','logística rodoviária',
      'aena ','galeão','santos dumont','viracopos','congonhas',
      'leilão de aeroporto','rio galeão','floripa airport',
      'rodovia','concessão rodoviária','leilão de rodov','leilão rodoviário',
      'ministério dos transportes','antt ','antaq ','agência nacional de transportes',
      'pedágio eletrônico','ponte jk','infraestrutura de transport',
      'concessão de transport','leilão de transport',
      'frete de grãos','exportação de grãos','safra ','soja ','milho ',
      'agronegócio','volumes rumo','esmagamento de soja','algodão',
      'porto de paranaguá','exportação agro',
    ],
  },
  {
    id: 'airlines', name: 'Airlines', emoji: '✈️', color: '#16a085',
    keywords: [
      'gol linhas','gol aérea','gol reestrutur','gol anuncia','goll4','gol3',
      'azul linhas','azul aérea','azul reestrutur','azul4','azul3',
      'latam airlines','latam ','latam3',
      'avianca','air france','klm','tap ','jetblue','sky airlines',
      'lufthansa','united airlines','american airlines',
      'aerolíneas argentinas','iberia ','emirates','qatar airways',
      'embraer','embr3','eve ','evtol','evtol embraer','carro voador',
      'kc-390','super tucano','e195','e175','e2 ','e1 ',
      'boeing','airbus','a220','a320','a321','a330','a340','a350','787','777','737',
      'companhia aérea','companhias aéreas','aviação civil','anac ','aeronave','aérea',
      'passagem aérea','atraso de voo','setor aéreo',
      'combustível de aviação','qav ','querosene de aviação','saf ',' saf','combustível sustentável','sustainable aviation fuel','uso na aviação','setor de aviação',
      'reestruturação aérea','dívida aérea','chapter 11',
      'voa brasil','iata ','passageiro aéreo','load factor','yield',
      'congonhas','guarulhos','galeão','viracopos','santos dumont',
    ],
  },
  {
    id: 'capgoods', name: 'Capital Goods', emoji: '🏭', color: '#8e44ad',
    keywords: [
      'weg ','wege3','marcopolo','pomo3','tupy ','tupy3',
      'gps participaç','ggps3','grsa ',
      'randon','rapt4','rapt3','fras-le','frasle','fras le',
      'iochpe','maxion','mypk3',
      'mahle ','priner','prnr3',
      'aeris ','aeri3',
      'implementos rodoviários','ônibus elétrico','caminhão elétrico',
      'ônibus a biometano','veículos pesados','máquinas agrícolas',
      'bens de capital','abimaq','fornecedor automotiv',
      'peças automotivas','autopeças','autopeça',
      'energia eólica','eólica offshore','energia solar','solar flutuante',
      'biometano','hidrogênio verde','bess ','t&d ',
      'turbina eólica','parque eólico','parque solar',
      'armazenamento de energia','fundo clima','leilão de energia',
      'hidrelétrica','energia renovável','geração distribuída',
      'produção industrial','indústria de transformação',
      'importação de máquinas','descarbonização industrial',
      'pmi industrial','atividade industrial','capacidade instalada',
      'data center','transformadores elétricos','motores elétricos',
      'manufatura','indústria pesada','semicondutor',
      // Fotovoltaica / solar
      'usina fotovoltaica','usinas fotovoltaicas','fotovoltaica','fotovoltaico',
      'fotovoltaicas','usina solar','usinas solares','planta solar','plantas solares',
      // Baterias e armazenamento
      'bateria de lítio','baterias de lítio','bateria automotiva','baterias automotivas',
      'gigafactory','armazenamento por bateria','baterias estacionárias',
      'uso de baterias','mercado de baterias','indústria de baterias',
      'fabricante de baterias','planta de baterias',
      // Tarifas / tarifaço (relevante para importação de bens de capital)
      'tarifaço','tarifa de aço','tarifa de alumínio','tarifa industrial',
      'tarifas dos eua','tarifas dos estados unidos','sobretaxa industrial',
      'reciprocidade tarifária','acordo tarifário','tarifa sobre importação',
    ],
  },
];

// INCLUDE_OVERRIDE: títulos que casarem com qualquer um destes NÃO são excluídos
// pelo blacklist, mesmo que mencionem Lula/Trump/etc. Para notícias macro relevantes
// para os setores cobertos (tarifas que afetam capital goods, etc).
const INCLUDE_OVERRIDE = [
  'tarifaço','tarifa de aço','tarifa de alumínio','tarifa industrial',
  'sobretaxa industrial','acordo tarifário','reciprocidade tarifária',
  'tarifa sobre aço','tarifa sobre alumínio',
];

function matchesKeyword(text, kw) {
  const kwTrim = String(kw).trim();
  if (!kwTrim) return false;
  const lower = text.toLowerCase();
  const kwLower = kwTrim.toLowerCase();
  // Tickers e códigos curtos: word boundary
  if (kwTrim.length <= 5 && /^[a-z0-9À-ſ&-]+$/i.test(kwTrim)) {
    const escaped = kwLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(?:^|[^a-z0-9À-ſ])${escaped}(?:$|[^a-z0-9À-ſ])`, 'i');
    return re.test(text);
  }
  // Frases mais longas: substring direto (mais rápido)
  return lower.includes(kwLower);
}

function isExcluded(text) {
  // Override: se o título tem termo relevante para nossos setores, NÃO exclui
  // mesmo que mencione Lula/Trump/etc. Resolve casos tipo "tarifaço Lula Trump".
  if (typeof INCLUDE_OVERRIDE !== 'undefined') {
    for (const kw of INCLUDE_OVERRIDE) if (matchesKeyword(text, kw)) return false;
  }
  for (const kw of EXCLUDE_KEYWORDS) if (matchesKeyword(text, kw)) return true;
  return false;
}

function classifySectors(text) {
  if (isExcluded(text)) return [];
  const matched = [];
  for (const s of SECTORS) {
    for (const kw of s.keywords) {
      if (matchesKeyword(text, kw)) { matched.push(s.id); break; }
    }
  }
  return matched;
}

