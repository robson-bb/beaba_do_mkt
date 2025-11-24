Beabá do Marketing: Descomplicando Termos e Estratégias

Sobre o Projeto

O "Beabá do Marketing" é uma Base de Conhecimento interativa desenvolvida para desmistificar os termos complexos e as estratégias essenciais do mundo do Marketing Digital. O projeto fornece definições claras, analogias memoráveis e exemplos práticos para cada termo, facilitando o aprendizado para iniciantes e profissionais.

A Escala Inteligente: Frontend vs. Backend

O projeto final que o usuário interage (Frontend: HTML, CSS, JS) é sustentado por um poderoso sistema de Backend de Conteúdo (Node.js) que foi integralmente utilizado para gerar e estruturar o conteúdo do `data.json`. Isso demonstra a capacidade de integrar a lógica de programação Node.js com serviços de IA para criar soluções escaláveis.

Contexto de Desenvolvimento

Este projeto foi totalmente desenvolvido por Robson Borges Barbosa durante a Imersão Dev com Alura e Google 2025, aplicando os conceitos de desenvolvimento web e a integração de ferramentas avançadas de Inteligência Artificial para a criação e curadoria de conteúdo.

Tecnologias Utilizadas

Categoria

Tecnologia

Finalidade

Front-end

HTML5 / CSS3

Estrutura semântica e estilização dos cards e da barra de busca.

Lógica (Front)

JavaScript (ES6+)

Implementação da busca dinâmica e filtragem em tempo real.

Backend de Conteúdo

Node.js

Orquestrou e executou a rotina de chamada da API Gemini e a inclusão dos dados no JSON.

Geração de Conteúdo

Gemini API

Criação de definições, analogias e exemplos práticos, em formato JSON, ampliando a base de dados em escala.

Conteúdo

JSON

Armazenamento estruturado e consumível da base de conhecimento de marketing.

Destaque EXCLUSIVO: O Uso COMPROVADO da Gemini API para Expansão da Base

Para a construção da base de conhecimento atual do "Beabá do Marketing", FOI DESENVOLVIDO e EXECUTADO um sistema de ingestão de conteúdo. Este sistema utilizou uma aplicação Node.js para interagir com a API do Google Gemini, ampliando a base de conhecimento de forma eficiente e estruturada.

Detalhe da Implementação (Funcionalidade Concluída):

Orquestração com Node.js: O script de automação em Node.js (`addTerm.js`) foi o responsável por disparar a requisição à API, controlando o fluxo e o volume de termos a serem criados.

Geração Estruturada: O Node.js fez a chamada à API Gemini com um prompt de sistema detalhado e, crucialmente, utilizou o `responseSchema` (JSON Schema). Isso garantiu que a IA gerasse o conteúdo com a estrutura JSON exata (campos como `termo`, `analogia`, `explicacao`, `exemplo_pratico`, etc.).

Resultado Comprovado: O conteúdo JSON gerado pelo Gemini foi validado, processado e adicionado ao `data.json`, sendo este arquivo a base completa de dados que é carregada no frontend da aplicação.

Essa integração é a prova de que o projeto utiliza a aplicação Node.js e a API Gemini como uma ferramenta essencial para a ampliação e enriquecimento da sua base de conhecimento.

Funcionalidades da Aplicação

Interface Otimizada: Design responsivo e intuitivo para consulta rápida em qualquer dispositivo.

Busca Inteligente em Tempo Real: Filtra os termos dinamicamente por nome (`termo`) e por descrição (`explicacao`), usando apenas JavaScript puro no frontend.

Cards Informativos Detalhados: Apresenta o conteúdo com Analogia, Exemplo Prático e Erro Comum, todos gerados de forma inteligente pela rotina de Node.js + Gemini.

Estrutura do Conteúdo Gerado

O formato do `data.json` é um requisito da chamada à Gemini API para garantir a estrutura ideal para a aplicação:

```json
{
"id": 51,
"termo": "LTV (Lifetime Value)",
"analogia": "O quanto um cliente vale para a sua empresa durante todo o tempo em que ele compra de você.",
"explicacao": "Métrica que calcula a receita total que uma empresa pode esperar de um único cliente ao longo do relacionamento.",
"exemplo_pratico": "Um cliente que gasta R$ 100 por mês e fica por 2 anos tem um LTV de R$ 2.400.",
"erro_comum": "Não calcular o LTV, impossibilitando saber quanto se pode gastar para adquirir um cliente (CAC).",
"nivel": "intermediário",
"categoria": "Métricas",
"tags": ["receita","retenção","métrica"]
}
```

Execução Local

Clone o repositório:
```bash
git clone https://www.google.com/search?q=https://github.com/robson-bb/beaba_do_mkt.git
```

Acesse o diretório do projeto:
```bash
cd beaba_do_mkt
```

Abra o arquivo `index.html` no seu navegador ou utilize o plugin "Live Server" para rodar localmente.

Acesso ao Deploy (Visualização Pública)

O projeto finalizado está disponível para visualização imediata no link:

https://robson-bb.github.io/beaba_do_mkt/

Link do Repositório GitHub: https://github.com/robson-bb/beaba_do_mkt

Desenvolvido por: Robson Borges Barbosa
Contexto: Imersão Dev com Alura e Google 2025
