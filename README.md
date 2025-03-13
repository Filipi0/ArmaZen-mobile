ArmaZen - Documentação do Projeto

Resumo

O ArmaZen é uma aplicação móvel desenvolvida para otimizar o gerenciamento de estoques de pequenas e médias empresas. Ele permite que administradores registrem, monitorem e gerenciem produtos de forma simples e intuitiva, garantindo controle eficiente sobre os itens armazenados. O aplicativo oferece funcionalidades como autenticação segura, cadastro de produtos, listagem de estoques e remoção de itens, garantindo acessibilidade e segurança dos dados.
O desenvolvimento utilizou React Native com Expo para a interface móvel e Node.js com Prisma para o back-end, hospedado no Render. O banco de dados é gerenciado pelo Neon (PostgreSQL online). Os resultados obtidos incluem uma interface intuitiva, uma API segura e uma experiência fluida para os usuários.

Introdução

Contextualização do Problema --

Empresas de pequeno e médio porte enfrentam dificuldades no controle de estoques, o que pode levar ao desperdício de produtos, erros na contagem de itens e dificuldades na reposição. Muitos empreendedores utilizam métodos manuais, como planilhas ou anotações, tornando o processo suscetível a falhas.
Justificativa--

O ArmaZen busca solucionar esse problema fornecendo uma ferramenta intuitiva e acessível para gerenciamento de estoques. Com uma interface simples e de fácil uso, o sistema permite que empresas organizem seus produtos de forma eficiente, reduzindo erros e melhorando a gestão.

Objetivos do Projeto--

Criar uma solução prática para o gerenciamento de estoques.
Permitir cadastro, edição e exclusão de produtos.
Oferecer autenticação segura para administradores e usuários.
Garantir fácil acesso via aplicação móvel.

Público-Alvo--
Pequenos e médios empresários.
Lojas e comércios que precisam controlar seus estoques.
Empreendedores individuais que buscam organização nos produtos armazenados.

Requisitos--
Requisitos Funcionais
Login e autenticação de usuários.
Cadastro de produtos no estoque.
Listagem e consulta de produtos armazenados.
Exclusão de itens cadastrados.


Requisitos Não Funcionais--
Interface intuitiva e responsiva.
Segurança na autenticação e armazenamento de dados.
Baixa latência nas operações CRUD.
Requisitos de Hardware e Software
Front-end: Expo (React Native)
Back-end: Node.js + Express + Prisma ORM
Banco de Dados: Neon (PostgreSQL online)
Hospedagem: Render
Dispositivos: Smartphones Android

Design--
Arquitetura do Sistema
O sistema segue a arquitetura cliente-servidor, onde:
O front-end (React Native) se comunica com a API (Node.js) via requisições HTTP.
O back-end (Node.js) processa as requisições e acessa o banco de dados PostgreSQL (Neon).
A API utiliza JWT para autenticação e controle de acesso.
Interface Gráfica
Tela de Login: Formulário de autenticação.
Tela Home: Exibe opções para gerenciar produtos e usuários.
Tela de Cadastro de Produto: Formulário para adicionar um item ao estoque.
Tela de Listagem: Exibe os produtos cadastrados e opções de exclusão.

Implementação

Tecnologias Utilizadas--
Linguagem de Programação: JavaScript
Frameworks e Bibliotecas:
Front-end: React Native (Expo), React Navigation
Back-end: Express.js, Prisma ORM
Banco de Dados: PostgreSQL (Neon)
Segurança: JSON Web Token (JWT) para autenticação
Testes Realizados
Testes manuais na interface do aplicativo.
Testes de API utilizando HTTPie para validar endpoints.
Testes de autenticação JWT.
Testes de desempenho e tempo de resposta da API.

Resultados e Considerações Finais

Resultados Alcançados--
Aplicativo funcional com interface responsiva e intuitiva.
API segura e eficiente para o gerenciamento de estoques.
Redução de erros no controle de produtos para os usuários.

Análise dos Resultados--
Os objetivos do projeto foram alcançados com sucesso, proporcionando aos usuários uma ferramenta simples e eficaz para organizar seus estoques. O uso de tecnologias modernas garantiu uma experiência fluida e segura.
Sugestões para Trabalhos Futuros
Implementação de gráficos para análise de estoque.
Funcionalidade para notificar usuários sobre produtos com estoque baixo.
Suporte a múltiplos administradores para uma mesma empresa.

Referências--

Documentação oficial do React Native: https://reactnative.dev/docs/getting-started
Documentação do Prisma ORM: https://www.prisma.io/docs/
