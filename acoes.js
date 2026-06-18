// Fundamentos das companhias (Comps Table 08/06/2026). Valores em R$ milhões; ações em milhões.
// O preço vem ao vivo (precos.js / Yahoo). Multiplos calculados no hub:
//   Market Cap   = preco * acoes
//   P/E (ano)    = Market Cap / lucro_liquido (ano)
//   EV           = Market Cap + Div.Liquida 2026 + Minoritarios   (EV usa SEMPRE a div.liq. de 2026)
//   EV/EBITDA(ano) = EV / EBITDA (ano)
// preco_ref = preço da tabela (fallback se o feed de preço falhar). moeda p/ exibicao.
window.ACOES = {
  meta: { atualizado: "2026-06-08", obs: "R$ mm; ações mm; EV usa Dív.Líq. 2026 + minoritários" },
  setores: ["Rental", "Logística", "Aviação", "Auto Parts", "Capital Goods", "Serviços"],
  empresas: [
    // --- Rental ---
    { ticker:"RENT3", nome:"Localiza", setor:"Rental", yahoo:"RENT3.SA", moeda:"BRL", acoes:1136, preco_ref:40.17, ll26:4438, ll27:5016, ebitda26:15588, ebitda27:16187, divliq26:32538, divliq27:31963, minor:0 },
    { ticker:"MOVI3", nome:"Movida", setor:"Rental", yahoo:"MOVI3.SA", moeda:"BRL", acoes:340, preco_ref:9.20, ll26:470, ll27:711, ebitda26:6238, ebitda27:6453, divliq26:15182, divliq27:14408, minor:0 },
    { ticker:"VAMO3", nome:"Vamos", setor:"Rental", yahoo:"VAMO3.SA", moeda:"BRL", acoes:1066, preco_ref:2.92, ll26:400, ll27:704, ebitda26:3843, ebitda27:4163, divliq26:12140, divliq27:12085, minor:0 },
    { ticker:"ARML3", nome:"Armac", setor:"Rental", yahoo:"ARML3.SA", moeda:"BRL", acoes:346, preco_ref:3.23, ll26:179, ll27:273, ebitda26:880, ebitda27:964, divliq26:2220, divliq27:1838, minor:0 },
    // --- Logística ---
    { ticker:"RAIL3", nome:"Rumo", setor:"Logística", yahoo:"RAIL3.SA", moeda:"BRL", acoes:1850, preco_ref:13.52, ll26:2093, ll27:1793, ebitda26:8150, ebitda27:8844, divliq26:17744, divliq27:28365, minor:0 },
    { ticker:"HBSA3", nome:"Hidrovias do Brasil", setor:"Logística", yahoo:"HBSA3.SA", moeda:"BRL", acoes:1360, preco_ref:2.98, ll26:360, ll27:560, ebitda26:1142, ebitda27:1418, divliq26:1622, divliq27:1049, minor:0 },
    { ticker:"ECOR3", nome:"Ecorodovias", setor:"Logística", yahoo:"ECOR3.SA", moeda:"BRL", acoes:696, preco_ref:7.19, ll26:516, ll27:464, ebitda26:5577, ebitda27:5945, divliq26:24174, divliq27:27172, minor:0 },
    { ticker:"JSLG3", nome:"JSL", setor:"Logística", yahoo:"JSLG3.SA", moeda:"BRL", acoes:284, preco_ref:5.74, ll26:195, ll27:315, ebitda26:2175, ebitda27:2407, divliq26:8190, divliq27:8229, minor:0 },
    { ticker:"TGMA3", nome:"Tegma", setor:"Logística", yahoo:"TGMA3.SA", moeda:"BRL", acoes:66, preco_ref:30.65, ll26:267, ll27:280, ebitda26:419, ebitda27:436, divliq26:-133, divliq27:-161, minor:0 },
    // --- Aviação ---
    { ticker:"LTM", nome:"Latam Airlines", setor:"Aviação", yahoo:"LTM", moeda:"USD", acoes:287, preco_ref:47.02, ll26:1834, ll27:1800, ebitda26:4728, ebitda27:4903, divliq26:5199, divliq27:4384, minor:0 },
    { ticker:"EMBJ", nome:"Embraer", setor:"Aviação", yahoo:"EMBJ", moeda:"USD", acoes:181, preco_ref:56.54, ll26:543, ll27:696, ebitda26:1078, ebitda27:1249, divliq26:-670, divliq27:-805, minor:0 },
    // --- Auto Parts ---
    { ticker:"LEVE3", nome:"Mahle Metal Leve", setor:"Auto Parts", yahoo:"LEVE3.SA", moeda:"BRL", acoes:136, preco_ref:32.14, ll26:624, ll27:696, ebitda26:1148, ebitda27:1211, divliq26:428, divliq27:431, minor:0 },
    { ticker:"MYPK3", nome:"Iochpe-Maxion", setor:"Auto Parts", yahoo:"MYPK3.SA", moeda:"BRL", acoes:154, preco_ref:8.94, ll26:269, ll27:332, ebitda26:1688, ebitda27:1820, divliq26:3521, divliq27:3634, minor:1973 },
    { ticker:"TUPY3", nome:"Tupy", setor:"Auto Parts", yahoo:"TUPY3.SA", moeda:"BRL", acoes:135, preco_ref:13.10, ll26:339, ll27:455, ebitda26:1158, ebitda27:1323, divliq26:2374, divliq27:2228, minor:0 },
    { ticker:"RAPT4", nome:"Randon", setor:"Auto Parts", yahoo:"RAPT4.SA", moeda:"BRL", acoes:349, preco_ref:4.92, ll26:104, ll27:357, ebitda26:1754, ebitda27:2084, divliq26:4160, divliq27:4354, minor:3437 },
    { ticker:"POMO4", nome:"Marcopolo", setor:"Auto Parts", yahoo:"POMO4.SA", moeda:"BRL", acoes:1241, preco_ref:5.71, ll26:1269, ll27:1391, ebitda26:1711, ebitda27:1976, divliq26:1491, divliq27:1334, minor:0 },
    { ticker:"FRAS3", nome:"Fras-le", setor:"Auto Parts", yahoo:"FRAS3.SA", moeda:"BRL", acoes:267, preco_ref:21.79, ll26:368, ll27:483, ebitda26:1059, ebitda27:1175, divliq26:1684, divliq27:1666, minor:0 },
    // --- Capital Goods ---
    { ticker:"WEGE3", nome:"WEG", setor:"Capital Goods", yahoo:"WEGE3.SA", moeda:"BRL", acoes:4196, preco_ref:44.00, ll26:6013, ll27:6901, ebitda26:8845, ebitda27:9938, divliq26:-4139, divliq27:-6585, minor:0 },
    // --- Serviços ---
    { ticker:"GGPS3", nome:"GPS", setor:"Serviços", yahoo:"GGPS3.SA", moeda:"BRL", acoes:752, preco_ref:11.75, ll26:886, ll27:1105, ebitda26:2081, ebitda27:2414, divliq26:2377, divliq27:2083, minor:0 },
    { ticker:"PRNR3", nome:"Priner", setor:"Serviços", yahoo:"PRNR3.SA", moeda:"BRL", acoes:57, preco_ref:17.77, ll26:80, ll27:135, ebitda26:370, ebitda27:446, divliq26:640, divliq27:648, minor:0 },
  ],
};
